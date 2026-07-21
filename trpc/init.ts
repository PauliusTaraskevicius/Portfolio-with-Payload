import { initTRPC } from "@trpc/server";
import { getPayload } from "payload";
import config from "@payload-config";
import { cache } from "react";

type PayloadInstance = Awaited<ReturnType<typeof getPayload>>;

// Use globalThis so the Payload instance (and its DB connection) is reused
// across requests, hot reloads, and warm serverless invocations.
const globalForPayload = globalThis as unknown as { payload?: PayloadInstance };

export const getPayloadInstance = async (): Promise<PayloadInstance> => {
  if (!globalForPayload.payload) {
    globalForPayload.payload = await getPayload({ config });
  }
  return globalForPayload.payload;
};

export const createTRPCContext = cache(async () => {
  /**
   * @see: https://trpc.io/docs/server/context
   */
  return { userId: "user_123" };
});

// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.create({
  /**
   * @see https://trpc.io/docs/server/data-transformers
   */
  // transformer: superjson,
});

// Base router and procedure helpers
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure.use(async ({ next }) => {
  const payload = await getPayloadInstance();
  return next({ ctx: { db: payload } });
});
