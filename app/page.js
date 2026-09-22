import PortfolioChat from "./Component/Chat/PortfolioChat";
import StructuredData from "./Component/StructuredData";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { publicProjects } from "@/data/public-projects.mjs";
import { homeStructuredData } from "@/lib/seo.mjs";

export default function Home() {
  const posts = getAllPosts();
  return (
    <>
      <StructuredData data={homeStructuredData(posts, publicProjects)} />
      <PortfolioChat posts={posts.map((post) => getPostBySlug(post.slug))} />
    </>
  );
}
