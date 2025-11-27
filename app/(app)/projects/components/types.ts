import { inferRouterOutputs } from "@trpc/server";

import { AppRouter } from "@/trpc/routers/_app";

export type ProjectsGetOneOutput =
  inferRouterOutputs<AppRouter>["projects"]["getOne"];

export type ProjectsGetManyOutput =
  inferRouterOutputs<AppRouter>["projects"]["getMany"];