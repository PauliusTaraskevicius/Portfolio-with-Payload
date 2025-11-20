import { baseProcedure, createTRPCRouter } from "@/trpc/init";

import { Project } from "@/payload-types";

export const projectsRouter = createTRPCRouter({
  getMany: baseProcedure.query(async ({ ctx }) => {
    const data = await ctx.db.find({
      collection: "projects",
      where: {},
      sort: "-createdAt",
    });

    const formattedData = data.docs.map((doc) => ({
      ...doc,
    }));
    return formattedData as Project[];
  }),
});
