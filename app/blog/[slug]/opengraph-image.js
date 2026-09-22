import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/lib/blog";

export const alt = "Kevin Foo journal article";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function ArticleOpenGraphImage({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "68px 76px",
        color: "#eef3ef",
        background: "#141615",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <div
          style={{
            width: 58,
            height: 58,
            borderRadius: 12,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#eef3ef",
            color: "#141615",
            fontSize: 30,
            fontWeight: 700,
          }}
        >
          K
        </div>
        <div style={{ fontSize: 30, fontWeight: 600 }}>KevTheFoo Journal</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        <div style={{ color: "#afd9bd", fontSize: 20, letterSpacing: 3 }}>
          {post?.tags?.slice(0, 3).join(" · ") || "SOFTWARE DEVELOPMENT"}
        </div>
        <div style={{ fontSize: 64, lineHeight: 1.1, fontWeight: 600 }}>
          {post?.title || "Kevin Foo's Journal"}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            color: "#aeb7b1",
            fontSize: 23,
          }}
        >
          <span>By Kevin Foo</span>
          <span>·</span>
          <span>{post?.readTime || "Journal"}</span>
        </div>
      </div>
    </div>,
    size,
  );
}
