import "./skills.css";
import { HiAcademicCap } from "react-icons/hi2";

import Reveal from "@/app/Component/Reveal/Reveal";

export default function Skills() {
  return (
    <section
      id="skills"
      className="min-h-screen flex-col justify-start pt-16 dark:bg-neutral-800"
    >
      <h1>Skills</h1>
      <span className="mb-12 text-xl text-gray-500">What I got in my bag</span>
      <Reveal yTranslate={300} delayTime={0.15}>
        <div className="mx-auto grid h-full w-4/5 grid-cols-2 justify-center gap-8 max-[992px]:w-full max-[992px]:text-[14px] max-md:grid-cols-1">
          {/* Frontend Card */}
          <div className="card-hover category-frontend flex flex-col rounded-xl border-2 bg-gradient-to-br from-slate-50 to-blue-50 p-6 shadow-md dark:from-slate-800 dark:to-slate-900">
            <h3 className="category-title mb-4 self-center text-xl font-semibold">
              Frontend
            </h3>
            <div className="h-1 w-16 self-center rounded-full bg-gradient-to-r from-blue-400 to-blue-600 mb-4"></div>
            <div>
              <ul className="grid grid-flow-col grid-cols-2 grid-rows-4 items-center justify-center gap-4">
                <li className="skill-item flex items-center justify-start gap-2">
                  <HiAcademicCap className="text-blue-500" />
                  JavaScript
                </li>
                <li className="skill-item flex items-center justify-start gap-2">
                  <HiAcademicCap className="text-blue-500" />
                  React
                </li>
                <li className="skill-item flex items-center justify-start gap-2">
                  <HiAcademicCap className="text-blue-500" />
                  Next.js
                </li>
                <li className="skill-item flex items-center justify-start gap-2">
                  <HiAcademicCap className="text-blue-500" />
                  HeroUI
                </li>
                <li className="skill-item flex items-center justify-start gap-2">
                  <HiAcademicCap className="text-blue-500" />
                  Tailwindcss
                </li>
                <li className="skill-item flex items-center justify-start gap-2">
                  <HiAcademicCap className="text-blue-500" />
                  Shadcn/ui
                </li>
                <li className="skill-item flex items-center justify-start gap-2">
                  <HiAcademicCap className="text-blue-500" />
                  Figma
                </li>
              </ul>
            </div>
          </div>

          {/* Backend Card */}
          <div className="card-hover category-backend flex flex-col rounded-xl border-2 bg-gradient-to-br from-slate-50 to-green-50 p-6 shadow-md dark:from-slate-800 dark:to-slate-900">
            <h3 className="category-title mb-4 self-center text-xl font-semibold">
              Backend
            </h3>
            <div className="h-1 w-16 self-center rounded-full bg-gradient-to-r from-green-400 to-green-600 mb-4"></div>
            <div>
              <ul className="grid grid-flow-col grid-cols-2 grid-rows-4 items-center justify-center gap-4">
                <li className="skill-item flex items-center justify-start gap-2">
                  <HiAcademicCap className="text-green-500" />
                  Python
                </li>
                <li className="skill-item flex items-center justify-start gap-2">
                  <HiAcademicCap className="text-green-500" />
                  Node.js
                </li>
                <li className="skill-item flex items-center justify-start gap-2">
                  <HiAcademicCap className="text-green-500" />
                  Express.js
                </li>
                <li className="skill-item flex items-center justify-start gap-2">
                  <HiAcademicCap className="text-green-500" />
                  Mongodb
                </li>
                <li className="skill-item flex items-center justify-start gap-2">
                  <HiAcademicCap className="text-green-500" />
                  PostgreSQL
                </li>
                <li className="skill-item flex items-center justify-start gap-2">
                  <HiAcademicCap className="text-green-500" />
                  AWS
                </li>
                <li className="skill-item flex items-center justify-start gap-2">
                  <HiAcademicCap className="text-green-500" />
                  Docker
                </li>
                <li className="skill-item flex items-center justify-start gap-2">
                  <HiAcademicCap className="text-green-500" />
                  Supabase
                </li>
              </ul>
            </div>
          </div>

          {/* Blockchain Card */}
          <div className="card-hover category-blockchain flex flex-col rounded-xl border-2 bg-gradient-to-br from-slate-50 to-purple-50 p-6 shadow-md dark:from-slate-800 dark:to-slate-900">
            <h3 className="category-title mb-4 self-center text-xl font-semibold">
              Blockchain
            </h3>
            <div className="h-1 w-16 self-center rounded-full bg-gradient-to-r from-purple-400 to-purple-600 mb-4"></div>
            <div>
              <ul className="grid grid-flow-col grid-cols-2 grid-rows-4 items-center justify-center gap-4">
                <li className="skill-item flex items-center justify-start gap-2">
                  <HiAcademicCap className="text-purple-500" />
                  Solidity
                </li>
                <li className="skill-item flex items-center justify-start gap-2">
                  <HiAcademicCap className="text-purple-500" />
                  Truffle
                </li>
                <li className="skill-item flex items-center justify-start gap-2">
                  <HiAcademicCap className="text-purple-500" />
                  Web3.js
                </li>
                <li className="skill-item flex items-center justify-start gap-2">
                  <HiAcademicCap className="text-purple-500" />
                  Ether.js
                </li>
                <li className="skill-item flex items-center justify-start gap-2">
                  <HiAcademicCap className="text-purple-500" />
                  Foundry
                </li>
              </ul>
            </div>
          </div>

          {/* AI Card */}
          <div className="card-hover category-ai flex flex-col rounded-xl border-2 bg-gradient-to-br from-slate-50 to-orange-50 p-6 shadow-md dark:from-slate-800 dark:to-slate-900">
            <h3 className="category-title mb-4 self-center text-xl font-semibold">
              AI
            </h3>
            <div className="h-1 w-16 self-center rounded-full bg-gradient-to-r from-orange-400 to-orange-600 mb-4"></div>
            <div>
              <ul className="grid grid-flow-col grid-cols-2 grid-rows-4 items-center justify-center gap-4">
                <li className="skill-item flex items-center justify-start gap-2">
                  <HiAcademicCap className="text-orange-500" />
                  N8N
                </li>
                <li className="skill-item flex items-center justify-start gap-2">
                  <HiAcademicCap className="text-orange-500" />
                  RAG
                </li>
                <li className="skill-item flex items-center justify-start gap-2">
                  <HiAcademicCap className="text-orange-500" />
                  MCP
                </li>
                <li className="skill-item flex items-center justify-start gap-2">
                  <HiAcademicCap className="text-orange-500" />
                  Claude
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
