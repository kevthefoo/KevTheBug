import Hero from "@/app/Home/Hero/Hero";
import About from "@/app/Home/About/About";
import Contact from "@/app/Home/Contact/Contact";
import Showcase from "@/app/Home/Showcase/Showcase";
import Skills from "@/app/Home/Skills/Skills";
import Blog from "@/app/Home/Blog/Blog";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Showcase />
      <Blog />
      <Contact />
    </>
  );
}
