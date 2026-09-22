import { apiIndex, apiResponse, optionsResponse } from "@/lib/public-api.mjs";

export function GET(request) {
  return apiResponse(apiIndex(new URL(request.url).origin));
}

export const OPTIONS = optionsResponse;
