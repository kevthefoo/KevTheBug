import PortfolioChat from "./Component/Chat/PortfolioChat";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { liveConfigured } from "@/lib/chat-budget.mjs";
export const dynamic = "force-dynamic";
export default function Home() {
  return (
    <PortfolioChat
      posts={getAllPosts().map((post) => getPostBySlug(post.slug))}
      live={liveConfigured()}
    />
  );
}
