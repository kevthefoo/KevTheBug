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
    <html lang="en">
      <body className={inter.variable}>
        <main id="main-content">{children}</main>
      </body>
    </html>
  );
}
