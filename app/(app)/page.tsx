import { Metadata } from "next";
import dynamic from "next/dynamic";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate } from "@tanstack/react-query";
import { QueryHydrationWrapper } from "@/components/QueryHydrationWrapper";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { HomePageSkeleton } from "@/components/skeletons/HomePageSkeleton";
import { ListProjectViewSkeleton } from "@/components/skeletons/ListProjectViewSkeleton";
import { getPayload } from "payload";
import config from "@payload-config";
import { ImagePreloadProvider } from "@/components/ImagePreloadProvider";

// Dynamic imports for non-critical components (reduces initial JS bundle)
const Homepage = dynamic(() =>
  import("@/components/Homepage").then((mod) => ({ default: mod.Homepage })),
);
const Projects = dynamic(() =>
  import("./projects/components/Projects").then((mod) => ({
    default: mod.Projects,
  })),
);
const Introduction = dynamic(() =>
  import("@/components/Introduction").then((mod) => ({
    default: mod.Introduction,
  })),
);
const About = dynamic(() =>
  import("@/components/About").then((mod) => ({ default: mod.About })),
);
const ListProjectsViewWrapper = dynamic(() =>
  import("./projects/components/ListProjectsViewWrapper").then((mod) => ({
    default: mod.ListProjectsViewWrapper,
  })),
);

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

  // Fetch first project image for LCP preload
  const payload = await getPayload({ config });
  const projects = await payload.find({
    collection: "projects",
    limit: 1,
    sort: "-createdAt",
  });

  const firstProjectImage = projects.docs[0]?.image;
  const lcpImageUrl =
    typeof firstProjectImage !== "string" ? firstProjectImage?.url : null;

  return (
    <>
      {/* Preload LCP image for faster discovery */}
      {lcpImageUrl && (
        <link
          rel="preload"
          as="image"
          href={lcpImageUrl}
          fetchPriority="high"
        />
      )}
      <ImagePreloadProvider minLoadTime={1600} maxWaitTime={8000}>
        <Homepage />
        <QueryHydrationWrapper state={dehydrate(queryClient)}>
          <Suspense fallback={<HomePageSkeleton />}>
            <ErrorBoundary fallback={<p>Error loading projects.</p>}>
              <Projects />
            </ErrorBoundary>
          </Suspense>
          <Introduction />
          <About />
          <Suspense fallback={<ListProjectViewSkeleton />}>
            <ErrorBoundary fallback={<p>Error loading projects.</p>}>
              <ListProjectsViewWrapper />
            </ErrorBoundary>
          </Suspense>
        </QueryHydrationWrapper>
      </ImagePreloadProvider>
    </>
  );
}
