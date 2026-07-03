import { initTRPC } from "@trpc/server";
import { getPayload } from "payload";
import config from "@payload-config";
import { cache } from "react";

let payloadInstance: Awaited<ReturnType<typeof getPayload>> | null = null;

export const getPayloadInstance = cache(async () => {
  if (!payloadInstance) {
    payloadInstance = await getPayload({ config });
  }
  return payloadInstance;
});

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
