import { getPostBySlug } from "@/lib/blog";
import { apiResponse, notFound, optionsResponse } from "@/lib/public-api.mjs";

export async function GET(_request, { params }) {
  const { slug } = await params;
  const article = getPostBySlug(slug);
  return article ? apiResponse(article) : notFound("Article");
}

export const OPTIONS = optionsResponse;
