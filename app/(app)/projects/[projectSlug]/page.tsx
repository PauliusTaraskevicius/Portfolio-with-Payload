import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ProjectView } from "./components/ProjectView";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ProjectViewSkeleton } from "@/components/skeletons/ProjectViewSkeleton";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { createTRPCContext } from "@/trpc/init";
import { appRouter } from "@/trpc/routers/_app";
import { Media } from "@/payload-types";
import { QueryHydrationWrapper } from "@/components/QueryHydrationWrapper";

interface PageProps {
  params: Promise<{ projectSlug: string }>;
}

function getOgImage(image: (string | null) | Media | undefined) {
  if (!image) return undefined;

  // If it's a Media object with a url
  if (typeof image === "object" && image.url) {
    return [
      {
        url: image.url,
        width: image.width ?? undefined,
        height: image.height ?? undefined,
        alt: image.alt,
      },
    ];
  }

  // If it's a string (URL)
  if (typeof image === "string") {
    return [{ url: image }];
  }

  return undefined;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { projectSlug } = await params;

  const ctx = await createTRPCContext();
  const caller = appRouter.createCaller(ctx);

  try {
    const project = await caller.projects.getOne({ slug: projectSlug });

    const title = project.title ?? "Project";

    return {
      title: `${title} | PaulyDev - Project Case Study`,
      description:
        project.description ||
        `Explore ${title}, a web development project built with modern technologies. View the case study, tech stack, and development process.`,
      keywords: [
        title,
        "Web Development Project",
        "Case Study",
        "Next.js Project",
        "React Application",
        "Full-Stack Development",
      ],
      openGraph: {
        title: `${title} | PaulyDev - Project Case Study`,
        description:
          project.description ||
          `Case study of ${title} - a web development project by PaulyDev.`,
        url: `https://paulydev.com/projects/${project.slug}`,
        siteName: "PaulyDev",
        images: getOgImage(project.image),
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: `${title} | PaulyDev - Project Case Study`,
        description:
          project.description ||
          `Case study of ${title} – a web development project by PaulyDev.`,
      },
    };
  } catch {
    return {
      title: "Project Not Found | PaulyDev",
      description: "The requested project could not be found.",
      alternates: {
        canonical: `https://paulydev.com/projects/${projectSlug}`,
      },
    };
  }
}

const Page = async ({ params }: PageProps) => {
  const { projectSlug } = await params;

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.projects.getOne.queryOptions({ slug: projectSlug }),
  );

  if (!projectSlug) {
    return notFound();
  }

  return (
    <QueryHydrationWrapper state={dehydrate(queryClient)}>
      <Suspense fallback={<ProjectViewSkeleton />}>
        <ErrorBoundary fallback={<div>Failed to load project.</div>} />
        <ProjectView projectSlug={projectSlug} />
      </Suspense>
    </QueryHydrationWrapper>
  );
};

export default Page;
