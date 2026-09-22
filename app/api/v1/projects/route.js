import { publicProjects } from "@/data/public-projects.mjs";
import { apiResponse, optionsResponse } from "@/lib/public-api.mjs";

export function GET() {
  return apiResponse(publicProjects);
}

export const OPTIONS = optionsResponse;
