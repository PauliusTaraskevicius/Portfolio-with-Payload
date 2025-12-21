import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { z } from "zod";
import { Project } from "@/payload-types";

export const projectsRouter = createTRPCRouter({
  getMany: baseProcedure.query(async ({ ctx }) => {
    const data = await ctx.db.find({
      collection: "projects",
      where: {},
      sort: "-createdAt",
      depth: 2,
    });

    const formattedData = data.docs.map((doc) => ({
      ...doc,
    }));
    return formattedData as Project[];
  }),
  getOne: baseProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      const data = await ctx.db.find({
        collection: "projects",
        where: { slug: { equals: input.slug } },
      });

      if (!data.docs.length) {
        throw new Error("Not Found");
      }

      return data.docs[0] as Project;
    }),
});
