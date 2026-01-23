"use client";

import {
  HydrationBoundary,
  HydrationBoundaryProps,
} from "@tanstack/react-query";

export function QueryHydrationWrapper(props: HydrationBoundaryProps) {
  return <HydrationBoundary {...props} />;
}
