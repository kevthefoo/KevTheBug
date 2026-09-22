import {
  apiResponse,
  optionsResponse,
  publishedQuestions,
} from "@/lib/public-api.mjs";

export function GET() {
  return apiResponse(publishedQuestions);
}

export const OPTIONS = optionsResponse;
