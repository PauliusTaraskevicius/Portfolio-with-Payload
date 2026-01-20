import { Metadata } from "next";

import { Homepage } from "@/components/Homepage";
import { getQueryClient, trpc } from "@/trpc/server";
import { Projects } from "./projects/components/Projects";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Introduction } from "@/components/Introduction";
import { About } from "@/components/About";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ListProjectsViewWrapper } from "./projects/components/ListProjectsViewWrapper";
import { HomePageSkeleton } from "@/components/skeletons/HomePageSkeleton";
import { ListProjectViewSkeleton } from "@/components/skeletons/ListProjectViewSkeleton";

export const metadata: Metadata = {
  title:
    "PaulyDev – Full-Stack Web Developer | Next.js, React, Web Applications",
  description:
    "PaulyDev is a full-stack web development portfolio focused on building high-performance, SEO-optimized websites and web applications. I specialize in Next.js, React, TypeScript, and modern backend technologies to create scalable, secure, and conversion-driven digital products.From business websites and landing pages to custom SaaS platforms, I help startups and entrepreneurs turn ideas into production-ready applications that load fast, rank well on Google, and grow with your business.",
  keywords: [
    "Full-Stack Web Developer",
    "Next.js Developer",
    "React Developer",
    "High Performance Websites",
    "SEO Optimized Web Applications",
    "TypeScript Developer",
    "Fast Loading Websites",
    "Scalable Web Solutions",
    "Secure Web Applications",
  ],
  openGraph: {
    title:
      "PaulyDev – Full-Stack Web Developer | Next.js, React, Web Applications",
    description:
      "Full-stack web developer specializing in Next.js, React, and modern web applications. I build fast, SEO-optimized, scalable websites and SaaS products for startups and businesses.",
    url: "https://paulydev.com",
    siteName: "PaulyDev",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "",
        width: "",
        height: "",
        alt: "PaulyDev Open Graph Image",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "PaulyDev – Full-Stack Web Developer | Next.js, React, Web Applications",
    description:
      "Full-stack web developer specializing in Next.js, React, and modern web applications. I build fast, SEO-optimized, scalable websites and SaaS products for startups and businesses.",
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
};

export default async function Home() {
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(trpc.projects.getMany.queryOptions());

  return (
    <>
      <Homepage />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<HomePageSkeleton />}>
          <ErrorBoundary fallback={<p>Error loading projects.</p>} />
          <Projects />
        </Suspense>
      </HydrationBoundary>
      <Introduction />
      <About />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<ListProjectViewSkeleton />}>
          <ErrorBoundary fallback={<p>Error loading projects.</p>} />
          <ListProjectsViewWrapper />
        </Suspense>
      </HydrationBoundary>
    </>
  );
}
