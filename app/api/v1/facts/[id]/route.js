import {
  apiResponse,
  notFound,
  optionsResponse,
  publicFacts,
} from "@/lib/public-api.mjs";

export async function GET(_request, { params }) {
  const { id } = await params;
  const fact = publicFacts.find((item) => item.id === id);
  return fact ? apiResponse(fact) : notFound("Fact");
}

export const OPTIONS = optionsResponse;
