import type { BlogPost } from "@/data/blog-posts";

// Articles remain local until every factual claim has a direct, reviewable source.
export const publicBlogPosts: BlogPost[] = [];

export function getPublicBlogPostBySlug(slug: string) {
  return publicBlogPosts.find((post) => post.slug === slug);
}
