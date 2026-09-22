import { Inter } from "next/font/google";
import "./globals.css";
import {
  PERSON_NAME,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "@/lib/seo.mjs";
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${PERSON_NAME} — Software Developer Portfolio`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: PERSON_NAME, url: SITE_URL }],
  creator: PERSON_NAME,
  publisher: PERSON_NAME,
  category: "technology",
  keywords: [
    "Kevin Foo",
    "kevthefoo",
    "software developer",
    "web developer",
    "frontend engineer",
    "full-stack engineer",
    "Next.js developer",
    "blockchain developer",
    "AI developer",
    "Taiwan software developer",
  ],
  alternates: {
    canonical: "/",
    languages: { "en-US": "/" },
    types: { "application/llms.txt": "/llms.txt" },
  },
  openGraph: {
    type: "profile",
    url: "/",
    title: `${PERSON_NAME} — Software Developer Portfolio`,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
    locale: "en_US",
    firstName: "Kevin",
    lastName: "Foo",
    username: "kevthefoo",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${PERSON_NAME} — Software Developer Portfolio`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${PERSON_NAME} — Software Developer Portfolio`,
    description: SITE_DESCRIPTION,
    creator: "@kevthefoo",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: "/favicon.ico",
  },
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: SITE_NAME,
    statusBarStyle: "black-translucent",
  },
  verification: {
    google: "baTjMVsN_Gg8wzKrCK7g4A2NB9Y78K0zTImPn8PvDnI",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f6f4" },
    { media: "(prefers-color-scheme: dark)", color: "#141615" },
  ],
};
export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{const saved=localStorage.getItem("kevthefoo-theme");const theme=saved==="light"||saved==="dark"?saved:window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";document.documentElement.dataset.theme=theme}catch{document.documentElement.dataset.theme="dark"}`,
          }}
        />
      </head>
      <body className={inter.variable}>
        <main id="main-content">{children}</main>
      </body>
    </html>
  );
}
