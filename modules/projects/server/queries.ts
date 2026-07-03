import { cache } from "react";
import { getPayloadInstance } from "@/trpc/init";

export const getProjectsCached = cache(async () => {
  const payload = await getPayloadInstance();
  return payload.find({
    collection: "projects",
    where: {},
    sort: "-createdAt",
    depth: 2,
  });
});

export const getProjectBySlugCached = cache(async (slug: string) => {
  const payload = await getPayloadInstance();
  return payload.find({
    collection: "projects",
    where: { slug: { equals: slug } },
  });
});

export const getProjectSlugsCached = cache(async () => {
  const payload = await getPayloadInstance();
  return payload.find({
    collection: "projects",
    limit: 1000,
    depth: 0,
    sort: "-createdAt",
  });
});

export const getFirstProjectForLcpCached = cache(async () => {
  const payload = await getPayloadInstance();
  const data = await payload.find({
    collection: "projects",
    limit: 1,
    depth: 0,
    sort: "-createdAt",
  });
  return data.docs[0] ?? null;
});
