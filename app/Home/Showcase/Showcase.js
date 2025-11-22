import Carousel from "@/app/Component/Carousel/Carousel";

export default function Showcase() {
  return (
    <section
      id="showcase"
      className="flex-col justify-start pb-16 pt-16 dark:bg-neutral-800"
    >
      <h1>Showcase</h1>
      <span className="mb-12 text-xl text-gray-500">My Highlight Projects</span>
      <Carousel />
    </section>
  );
}
