import PortfolioChat from "./Component/Chat/PortfolioChat";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
export const dynamic = "force-dynamic";
export default function Home() {
  return (
    <PortfolioChat
      posts={getAllPosts().map((post) => getPostBySlug(post.slug))}
    />
  );
}
