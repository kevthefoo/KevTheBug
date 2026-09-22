import { getAllPosts } from "@/lib/blog";
import {
  apiResponse,
  optionsResponse,
  publicProfile,
} from "@/lib/public-api.mjs";

export function GET() {
  return apiResponse(publicProfile(getAllPosts()));
}

export const OPTIONS = optionsResponse;
