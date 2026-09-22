import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/seo.mjs";

export default function manifest() {
  return {
    name: "Kevin Foo — Software Developer Portfolio",
    short_name: SITE_NAME,
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#141615",
    theme_color: "#141615",
    lang: "en",
    categories: ["portfolio", "technology", "developer"],
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
