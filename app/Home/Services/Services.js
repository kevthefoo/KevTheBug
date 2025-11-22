import Image from "next/image";
import {
  FaSignal,
  FaFigma,
  FaReact,
  FaShopify,
  FaDiscord,
  FaEthereum,
} from "react-icons/fa";

import Reveal from "@/app/Component/Reveal/Reveal";

export default function Services() {
  return (
    <section
      id="services"
      className="min-f-screen flex-col dark:bg-neutral-800 justify-start pb-16 pt-16"
    >
      <h1>Services</h1>
      <span className="mb-12 text-xl text-gray-500">What I can provide</span>
      <Reveal xTranslate={-300} yTranslate={0}>
        <div className="grid mx-auto h-full grid-cols-3 gap-10 text-center max-[992px]:gap-10 max-md:grid-cols-2">
          <div className="flex aspect-square flex-col items-center justify-center rounded-3xl border-2 border-gray-400 bg-slate-200 p-2 dark:border-white dark:bg-black">
            <FaReact className="mb-4 text-5xl" />
            <h3>Website Development</h3>
          </div>

          <div className="flex aspect-square flex-col items-center justify-center rounded-3xl border-2 border-gray-400 bg-slate-200 p-2 dark:border-white dark:bg-black">
            <FaFigma className="mb-4 text-5xl" />
            <h3>UI/UX Design</h3>
          </div>

          <div className="flex aspect-square flex-col items-center justify-center rounded-3xl border-2 border-gray-400 bg-slate-200 p-2 dark:border-white dark:bg-black">
            <FaShopify className="mb-4 text-5xl" />
            <h3>E-commerce Development</h3>
          </div>

          <div className="flex aspect-square flex-col items-center justify-center rounded-3xl border-2 border-gray-400 bg-slate-200 p-2 dark:border-white dark:bg-black">
            <FaSignal className="mb-4 text-5xl" />
            <h3>SEO</h3>
          </div>

          <div className="flex aspect-square flex-col items-center justify-center rounded-3xl border-2 border-gray-400 bg-slate-200 p-2 dark:border-white dark:bg-black">
            <FaDiscord className="mb-4 text-5xl" />
            <h3>Custom Discord Bot</h3>
          </div>

          <div className="flex aspect-square flex-col items-center justify-center rounded-3xl border-2 border-gray-400 bg-slate-200 p-2 dark:border-white dark:bg-black">
            <FaEthereum className="mb-4 text-5xl" />
            <h3>Smart Contract Development</h3>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
