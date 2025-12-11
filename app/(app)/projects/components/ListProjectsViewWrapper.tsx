"use client";

import dynamic from "next/dynamic";

const ListProjectsView = dynamic(
  () => import("./ListProjectsView").then((mod) => ({ default: mod.ListProjectsView })),
  { ssr: false }
);

export const ListProjectsViewWrapper = () => {
  return <ListProjectsView />;
};