import { notFound } from "next/navigation";
import StructuredData from "@/app/Component/StructuredData";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { absoluteUrl, articleStructuredData, PERSON_NAME } from "@/lib/seo.mjs";
import BlogPostContent from "./BlogPostContent";

export function generateStaticParams() {
  return getAllPosts().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  const url = `/blog/${post.slug}`;
  const image = `${url}/opengraph-image`;
  return {
    title: post.title,
    description: post.excerpt,
    authors: [{ name: PERSON_NAME, url: absoluteUrl("/") }],
    creator: PERSON_NAME,
    keywords: post.tags,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.excerpt,
      publishedTime: new Date(post.date).toISOString(),
      modifiedTime: new Date(post.date).toISOString(),
      authors: [absoluteUrl("/")],
      tags: post.tags,
      images: [{ url: image, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      creator: "@kevthefoo",
      images: [image],
    },
  };
}

export default async function BlogPost({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();
  return (
    <div className="journal-shell">
      <StructuredData data={articleStructuredData(post)} />
      <BlogPostContent post={post} />
    </div>
  );
}
