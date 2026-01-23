"use client";

import dynamic from "next/dynamic";
import { ListProjectViewSkeleton } from "@/components/skeletons/ListProjectViewSkeleton";

const ListProjectsView = dynamic(
  () =>
    import("./ListProjectsView").then((mod) => ({
      default: mod.ListProjectsView,
    })),
  {
    ssr: false,
    loading: () => <ListProjectViewSkeleton />,
  },
);

export const ListProjectsViewWrapper = () => {
  return <ListProjectsView />;
};
