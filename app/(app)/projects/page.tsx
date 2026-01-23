import { Metadata } from "next";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ProjectsHoverList } from "./components/ProjectsHoverList";
import { ProjectsHoverListSkeleton } from "@/components/skeletons/ProjectsHoverListSkeleton";
import { QueryHydrationWrapper } from "@/components/QueryHydrationWrapper";

export const metadata: Metadata = {
  title: "Projects | PaulyDev – Web Development Portfolio & Case Studies",
  description:
    "Explore my web development projects featuring Next.js, React, and TypeScript applications. View case studies of high-performance websites, SaaS platforms, and custom web solutions I've built for startups and businesses.",
  keywords: [
    "Web Development Projects",
    "Next.js Portfolio",
    "React Case Studies",
    "TypeScript Projects",
    "Full-Stack Development Examples",
    "SaaS Development Portfolio",
    "Custom Web Applications",
    "Frontend Development Work",
    "Backend Development Projects",
    "Web Developer Portfolio",
  ],
  openGraph: {
    title: "Projects | PaulyDev – Web Development Portfolio & Case Studies",
    description:
      "Explore my web development projects featuring Next.js, React, and TypeScript applications. View case studies of websites and SaaS platforms built for startups and businesses.",
    url: "https://paulydev.com",
    siteName: "PaulyDev",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "",
        width: "",
        height: "",
        alt: "PaulyDev Projects Portfolio",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | PaulyDev – Web Development Portfolio & Case Studies",
    description:
      "Explore my web development projects featuring Next.js, React, and TypeScript applications. View case studies of websites and SaaS platforms.",
    images: [""],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "https://paulydev.com/projects",
  },
};

const Page = async () => {
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(trpc.projects.getMany.queryOptions());

  return (
    <QueryHydrationWrapper state={dehydrate(queryClient)}>
      <Suspense fallback={<ProjectsHoverListSkeleton />}>
        <ErrorBoundary fallback={<div>Error loading projects.</div>}>
          <ProjectsHoverList />
        </ErrorBoundary>
      </Suspense>
    </QueryHydrationWrapper>
  );
};

export default Page;
