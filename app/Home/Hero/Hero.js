import Image from "next/image";
import pfp_bright from "@/asset/materials/pfp/pfp_bright.png";
import pfp_dark from "@/asset/materials/pfp/pfp_dark.png";
import MonkeyIcon from "./MonkeyIcon";
import "./hero.css";
import Link from "next/link";
import Reveal from "@/app/Component/Reveal/Reveal";
import { FaArrowDown } from "react-icons/fa";

export default function Hero() {
  return (
    <section className="min-h-screen items-center justify-evenly pt-20 max-md:flex-col max-md:justify-start max-md:gap-8 max-md:pt-[30%] max-md:text-center">
      <div className="php_image_container relative h-[500px] w-[300px] max-[992px]:h-[400px] max-[992px]:w-[250px] max-md:h-[300px] max-md:w-[300px] max-md:rounded-full max-[496px]:h-[200px] max-[496px]:w-[200px]">
        {/* Glow effect behind image */}
        <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-2xl max-md:rounded-full"></div>
        <Image
          priority={true}
          loading="eager"
          placeholder="empty"
          src={pfp_bright}
          alt="Kevin Foo"
          className="pfp_image_light absolute h-full w-full rounded-3xl object-cover shadow-2xl ring-4 ring-white/50 max-md:rounded-full dark:ring-gray-800/50"
        />
        <Image
          priority={true}
          loading="eager"
          placeholder="empty"
          src={pfp_dark}
          alt="Kevin Foo"
          className="pfp_image_dark invisible absolute h-full w-full rounded-3xl object-cover opacity-0 shadow-2xl ring-4 ring-white/50 max-md:rounded-full dark:ring-gray-800/50"
        />
      </div>

      <div className="flex w-1/2 flex-col max-[992px]:text-[14px] max-md:h-auto max-md:w-full max-md:items-center">
        <Reveal className="border-2 border-blue-300">
          <h1 className="mb-4 flex items-center gap-x-3.5 text-4xl font-bold max-[992px]:text-2xl max-md:justify-center">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400">
              Kevin Foo
            </span>
            <MonkeyIcon />
          </h1>
        </Reveal>

        <Reveal delayTime={0.75}>
          <h3 className="mb-4 text-lg text-gray-600 dark:text-gray-300">
            <i>A Programming Enthusiasm</i>
          </h3>
        </Reveal>

        <Reveal delayTime={1}>
          <p className="mb-16 text-gray-700 max-[992px]:mb-10 max-[992px]:text-[14px] max-md:mb-4 max-md:leading-6 dark:text-gray-300">
            I found that programming is my destiny when I was 27 then I devoted
            in it with all my heart. Sometimes I wish I could learn programming
            earlier in my life, the industry and its communities are just so
            attractive to me. Life is like a box of chocolate, isn&#39;t it?
          </p>
        </Reveal>

        <Reveal delayTime={1.25}>
          <Link
            href="/#about"
            className="group z-10 flex items-center gap-2 self-center rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 font-bold text-white shadow-lg transition-all duration-300 max-[992px]:rounded-xl max-[992px]:px-6 max-[992px]:py-3 max-[992px]:text-[14px] dark:from-blue-500 dark:to-purple-500"
          >
            Learn More
            <FaArrowDown className="transition-transform duration-300 group-hover:translate-y-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
