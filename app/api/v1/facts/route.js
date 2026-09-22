import {
  apiResponse,
  optionsResponse,
  publicFacts,
} from "@/lib/public-api.mjs";

export function GET(request) {
  const group = new URL(request.url).searchParams.get("group");
  const facts = group
    ? publicFacts.filter(
        ({ group: value }) => value.toLowerCase() === group.toLowerCase(),
      )
    : publicFacts;
  return apiResponse(facts);
}

export const OPTIONS = optionsResponse;
