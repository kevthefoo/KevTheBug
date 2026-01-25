import Carousel from "@/app/Component/Carousel/Carousel";

export default function Showcase() {
  return (
    <section
      id="showcase"
      className="relative flex-col justify-start overflow-hidden pb-16 pt-16 dark:bg-neutral-800"
    >
      {/* Subtle background gradient accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/30 to-transparent dark:via-blue-900/10"></div>

      <div className="relative z-10">
        <h1>Showcase</h1>
        <span className="mb-12 text-xl text-gray-500">My Highlight Projects</span>
      </div>

      <div className="relative z-10 w-full">
        <Carousel />
      </div>
    </section>
  );
}
