import { getAllPosts } from "@/lib/blog";
import { apiResponse, optionsResponse } from "@/lib/public-api.mjs";

export function GET() {
  return apiResponse(getAllPosts());
}

export const OPTIONS = optionsResponse;
