import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
export const metadata = {
  title: "Kevin Foo — A conversational portfolio",
  description:
    "Get to know Kevin Foo. Explore his work, skills and story through a conversation.",
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
