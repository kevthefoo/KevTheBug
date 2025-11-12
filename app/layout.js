import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import Header from "./Component/Header/Header";
import Footer from "./Component/Footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Kevin Foo",
  description: "Kevin Foo's portfolio website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="transition duration-700 ease-linear dark:bg-neutral-900 dark:text-white">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
