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
  const services = [
    {
      icon: FaReact,
      title: "Website Development",
      gradient: "from-cyan-500 to-blue-500",
      shadowColor: "rgba(6, 182, 212, 0.4)",
    },
    {
      icon: FaFigma,
      title: "UI/UX Design",
      gradient: "from-pink-500 to-rose-500",
      shadowColor: "rgba(236, 72, 153, 0.4)",
    },
    {
      icon: FaShopify,
      title: "E-commerce Development",
      gradient: "from-green-500 to-emerald-500",
      shadowColor: "rgba(34, 197, 94, 0.4)",
    },
    {
      icon: FaSignal,
      title: "SEO",
      gradient: "from-amber-500 to-orange-500",
      shadowColor: "rgba(245, 158, 11, 0.4)",
    },
    {
      icon: FaDiscord,
      title: "Custom Discord Bot",
      gradient: "from-indigo-500 to-purple-500",
      shadowColor: "rgba(99, 102, 241, 0.4)",
    },
    {
      icon: FaEthereum,
      title: "Smart Contract Development",
      gradient: "from-violet-500 to-purple-600",
      shadowColor: "rgba(139, 92, 246, 0.4)",
    },
  ];

  return (
    <section
      id="services"
      className="min-f-screen flex-col justify-start pb-16 pt-16"
    >
      <h1>Services</h1>
      <span className="mb-12 text-xl text-gray-500">What I can provide</span>
      <Reveal xTranslate={-300} yTranslate={0}>
        <div className="mx-auto grid h-full grid-cols-3 gap-10 text-center max-[992px]:gap-6 max-md:grid-cols-2">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={index}
                className="group flex aspect-square flex-col items-center justify-center rounded-3xl border border-gray-200 bg-white p-4 shadow-lg transition-all duration-300 hover:shadow-xl dark:border-gray-700 dark:bg-slate-900"
                style={{
                  "--hover-shadow": service.shadowColor,
                }}
              >
                {/* Icon with gradient background */}
                <div
                  className={`mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${service.gradient} shadow-lg transition-all duration-300 group-hover:shadow-xl`}
                  style={{
                    boxShadow: `0 10px 30px ${service.shadowColor}`,
                  }}
                >
                  <IconComponent className="text-4xl text-white" />
                </div>
                <h3 className="font-semibold text-gray-800 transition-colors dark:text-white">
                  {service.title}
                </h3>
              </div>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}
