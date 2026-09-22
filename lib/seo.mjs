export const SITE_URL = "https://www.kevthefoo.com";
export const SITE_NAME = "KevTheFoo";
export const PERSON_NAME = "Kevin Foo";
export const SITE_DESCRIPTION =
  "Meet Kevin Foo, a software developer from Taiwan building thoughtful web products and exploring blockchain, cloud engineering and AI.";

export const socialProfiles = [
  "https://github.com/kevthefoo",
  "https://www.linkedin.com/in/kevthefoo/",
  "https://x.com/kevthefoo",
];

export function absoluteUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}

export function homeStructuredData(posts = [], projects = []) {
  const personId = absoluteUrl("/#kevin-foo");
  const websiteId = absoluteUrl("/#website");

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: SITE_URL,
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        inLanguage: "en",
        publisher: { "@id": personId },
      },
      {
        "@type": "ProfilePage",
        "@id": absoluteUrl("/#profile"),
        url: SITE_URL,
        name: `${PERSON_NAME} — Software Developer Portfolio`,
        description: SITE_DESCRIPTION,
        dateModified: "2026-09-22",
        inLanguage: "en",
        isPartOf: { "@id": websiteId },
        mainEntity: { "@id": personId },
        hasPart: posts.map((post) => ({
          "@type": "BlogPosting",
          headline: post.title,
          url: absoluteUrl(`/blog/${post.slug}`),
          datePublished: post.date,
          author: { "@id": personId },
        })),
      },
      {
        "@type": "Person",
        "@id": personId,
        name: PERSON_NAME,
        alternateName: "kevthefoo",
        url: SITE_URL,
        email: "mailto:kevthefoo@gmail.com",
        description: SITE_DESCRIPTION,
        homeLocation: { "@type": "Country", name: "Taiwan" },
        jobTitle: "Software Developer",
        knowsAbout: [
          "Web development",
          "Frontend development",
          "Backend development",
          "Cloud engineering",
          "Blockchain development",
          "Artificial intelligence",
        ],
        sameAs: socialProfiles,
        subjectOf: projects.map((project) => ({
          "@type": "CreativeWork",
          name: project.name,
          url: project.url,
          description: project.description,
        })),
      },
    ],
  };
}

export function blogStructuredData(posts = []) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": absoluteUrl("/blog#blog"),
    url: absoluteUrl("/blog"),
    name: `${PERSON_NAME}'s Journal`,
    description:
      "Notes from Kevin Foo about software engineering, blockchain and AI tools.",
    inLanguage: "en",
    author: { "@id": absoluteUrl("/#kevin-foo") },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      datePublished: post.date,
      url: absoluteUrl(`/blog/${post.slug}`),
    })),
  };
}

export function articleStructuredData(post) {
  const url = absoluteUrl(`/blog/${post.slug}`);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        isPartOf: { "@id": absoluteUrl("/blog#blog") },
        headline: post.title,
        description: post.excerpt,
        datePublished: post.date,
        dateModified: post.date,
        inLanguage: "en",
        author: {
          "@type": "Person",
          "@id": absoluteUrl("/#kevin-foo"),
          name: PERSON_NAME,
          url: SITE_URL,
        },
        publisher: {
          "@type": "Person",
          "@id": absoluteUrl("/#kevin-foo"),
          name: PERSON_NAME,
          url: SITE_URL,
        },
        articleSection: post.tags,
        keywords: post.tags.join(", "),
        url,
        image: absoluteUrl(`/blog/${post.slug}/opengraph-image`),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: absoluteUrl("/"),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Journal",
            item: absoluteUrl("/blog"),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: post.title,
            item: url,
          },
        ],
      },
    ],
  };
}
