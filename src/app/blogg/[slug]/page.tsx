import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { publicBlogPosts, getPublicBlogPostBySlug } from "@/lib/public-blog-posts";
import BlogPostClient from "./BlogPostClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return publicBlogPosts.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPublicBlogPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} | kollektivavtal.ai`,
    description: post.metaDescription,
    alternates: { canonical: `https://kollektivavtal.ai/blogg/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      url: `https://kollektivavtal.ai/blogg/${post.slug}`,
      type: "article",
      publishedTime: post.publishDate,
      modifiedTime: post.updatedDate,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPublicBlogPostBySlug(slug);
  if (!post) notFound();

  const postIndex = publicBlogPosts.findIndex((p) => p.slug === post.slug);
  const prevPost = postIndex < publicBlogPosts.length - 1 ? publicBlogPosts[postIndex + 1] : null;
  const nextPost = postIndex > 0 ? publicBlogPosts[postIndex - 1] : null;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    datePublished: post.publishDate,
    dateModified: post.updatedDate,
    author: { "@type": "Organization", name: "kollektivavtal.ai / Etablera Mera AB" },
    publisher: { "@type": "Organization", name: "kollektivavtal.ai", url: "https://kollektivavtal.ai" },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faq.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <BlogPostClient
        post={post}
        prevPost={prevPost ? { slug: prevPost.slug, title: prevPost.title } : null}
        nextPost={nextPost ? { slug: nextPost.slug, title: nextPost.title } : null}
      />
    </>
  );
}
