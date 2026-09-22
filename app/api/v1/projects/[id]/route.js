import { publicProjects } from "@/data/public-projects.mjs";
import { apiResponse, notFound, optionsResponse } from "@/lib/public-api.mjs";

export async function GET(_request, { params }) {
  const { id } = await params;
  const project = publicProjects.find((item) => item.id === id);
  return project ? apiResponse(project) : notFound("Project");
}

export const OPTIONS = optionsResponse;
