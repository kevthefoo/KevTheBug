// Public, reviewed material used to ground AI answers. Keep secrets and private CV
// details out of this file. The browser cannot provide or replace this context.
export const qaData = [
  {
    id: "qa-about",
    title: "About me",
    questions: [
      "Who are you?",
      "Tell me about yourself",
      "What do you do?",
      "Where are you from?",
      "How would you introduce yourself?",
    ],
    answer:
      "I'm Kevin Foo, a software developer from Taiwan. I build web products and explore blockchain and AI. I use kevthefoo as my online handle.",
    keywords:
      "who about introduce yourself kevin developer taiwan 介紹 自我介紹",
    sourceId: "about",
  },
  {
    id: "qa-career",
    title: "Career journey",
    questions: [
      "How did you start programming?",
      "How did you begin your career?",
      "What is your career journey?",
    ],
    answer:
      "My interest in programming began during the NFT boom in 2021. I started with Solidity, then learned HTML, CSS and JavaScript so I could connect websites to smart contracts. I later joined a web development outsourcing company and worked there for nearly two years before moving to Australia for further study.",
    keywords:
      "career experience journey start started programming first language nft solidity work 職涯 經歷 程式",
    sourceId: "career",
  },
  {
    id: "qa-education",
    title: "Education",
    questions: [
      "What did you study?",
      "Did you graduate?",
      "When did you graduate?",
    ],
    answer:
      "I pursued a Master of Information Technology in Australia and graduated in August 2026.",
    keywords:
      "education study studied university master information technology australia graduate graduated degree 學歷 畢業 澳洲 碩士",
    sourceId: "career",
  },
  {
    id: "qa-skills",
    title: "Technical skills",
    questions: [
      "What are your skills?",
      "What is your tech stack?",
      "Which frontend technologies do you use?",
      "Which backend technologies do you use?",
      "Do you have blockchain development experience?",
      "What AI tools do you use?",
    ],
    answer:
      "My toolkit spans JavaScript, React, Next.js, Tailwind CSS, HeroUI, shadcn/ui and Figma on the frontend; Python, Node.js, Express.js, MongoDB, PostgreSQL, AWS, Docker and Supabase on the backend; and Solidity, Truffle, Web3.js, Ethers.js and Foundry for blockchain development. I also explore n8n, RAG, MCP, Codex and Claude.",
    keywords:
      "skill skills tech stack frontend backend blockchain ai react next node python 技能 技術 前端 後端",
    sourceId: "frontend",
  },
  {
    id: "qa-projects",
    title: "Projects",
    questions: [
      "What have you built?",
      "Tell me about your projects",
      "Can I see your work?",
      "Which projects are in your portfolio?",
    ],
    answer:
      "My portfolio includes Meet Johnny, AWS Playboard, IT Job Radar, Wacky Wizard Uni, Ferrolink, Cut That Crap, Vocablake and Yamata Lab. The project section contains a website preview and introduction for each published project. I have not published detailed metrics, team roles or a per-project technology stack.",
    keywords:
      "project projects work built build portfolio meet johnny playboard radar wizard ferrolink vocablake yamata 專案 作品",
    sourceId: "projects",
  },
  {
    id: "qa-interests",
    title: "Interests",
    questions: ["What are your interests?", "What do you do for fun?"],
    answer:
      "Away from programming, I enjoy basketball, piano, sushi and movies. I follow the Boston Celtics, love Christopher Nolan's Interstellar, and would like to play Hans Zimmer's music on piano. I also love Disney and dogs, especially Dalmatians and German Shepherds.",
    keywords:
      "interest interests hobby hobbies fun basketball piano sushi movie disney dog 興趣 愛好 籃球 鋼琴",
    sourceId: "interests",
  },
  {
    id: "qa-contact",
    title: "Contact",
    questions: ["How can I contact you?", "Where can I find you online?"],
    answer:
      "You can email me at kevthefoo@gmail.com. My GitHub, LinkedIn and X handle is kevthefoo. Contact me directly for collaboration, availability or a detailed résumé.",
    keywords:
      "contact email reach find online github linkedin twitter x hire collaborate 聯絡 合作 信箱",
    sourceId: "contact",
  },
  {
    id: "qa-work-style",
    title: "How I work",
    questions: [
      "How do you approach a new project?",
      "What is your development process?",
      "How do you solve technical problems?",
      "How do you balance speed and code quality?",
    ],
    answer:
      "I usually don't make an overly detailed plan before I start. That has never really been my style, and in most cases I don't think it is possible to plan everything perfectly in advance. If you can, the app might be fairly simple—maybe a to-do list. I'm kidding, but you get the idea. I normally sketch out a rough plan, start building, and let the plan evolve with the product. I add things, remove things, and adjust direction as I learn more. I can't say this is the perfect approach, but it is the development style that feels most natural to me.",
    keywords:
      "approach process workflow solve problem quality development work style 開發流程 工作方式 解決問題",
  },
  {
    id: "qa-favorite-project",
    title: "Favorite project",
    questions: [
      "What is your favorite project?",
      "Which project are you most proud of?",
      "What was your most challenging project?",
      "What did you learn from that project?",
    ],
    answer:
      "That's a difficult question because I treat every project like my own little baby, so choosing a favorite is nearly impossible. One thing they all have in common is that I build them to solve problems I actually have. Even if a project never attracts a single customer, it can still be useful to me, and that makes it worthwhile. Recently, I built a quantitative sports betting system focused mainly on basketball. It is a pipeline made up of several apps covering data collection, strategy research, real-time monitoring and alerts, bet execution, and result tracking. In the past, this would have been a massive project for one engineer to complete alone. With AI assistance, I built the whole system in a week while writing almost no code by hand. The project also exposed AI's limitations: it could implement almost every part of the pipeline, but it could not come up with the strategy itself. That part still depended on me. AI really isn't very creative yet, which is probably good news—it means humans like me still have a few useful years left.",
    keywords:
      "favorite favourite proud challenging challenge project achievement learned 最喜歡 專案 挑戰 成就",
  },
  {
    id: "qa-ai-interest",
    title: "AI interests",
    questions: [
      "Why are you interested in AI?",
      "How do you use AI in your work?",
      "What do you think about AI-assisted development?",
      "What are you currently exploring in AI?",
    ],
    answer: "",
    keywords:
      "ai artificial intelligence llm agent rag mcp assisted development 人工智慧 AI工具",
  },
  {
    id: "qa-blockchain-interest",
    title: "Blockchain interests",
    questions: [
      "Why do you like blockchain development?",
      "How did you learn Solidity?",
      "What have you built with smart contracts?",
      "Are you still interested in Web3?",
    ],
    answer:
      "Solidity was the first programming language I learned. Pretty cool, right? There probably aren't many software engineers who can say the same. Blockchain was booming during the COVID-19 pandemic, and I wrote a smart contract to launch my own NFT project. The project failed, but the experience made me fall in love with programming. These days, I am less interested in Web3 and cryptocurrency. Bitcoin feels more like an asset than a currency to me, which seems far removed from Satoshi Nakamoto's original vision of money outside central government control. After all these years, using Bitcoin for everyday purchases still usually means converting it through stablecoins, centralized exchanges, fiat currency, and a bank—all within regulated systems. Regardless of how high its price may rise, I don't think it has fulfilled its original purpose. Bitcoin mining also consumes enormous amounts of electricity and water, which conflicts with the energy-saving and carbon-reduction goals pursued by many developed countries. I no longer follow cryptocurrency closely, although I still find the underlying technology, especially decentralized validation across independent nodes, genuinely interesting.",
    keywords:
      "blockchain web3 solidity smart contract ethereum crypto 區塊鏈 智能合約",
  },
  {
    id: "qa-learning",
    title: "Learning and growth",
    questions: [
      "How do you learn new technologies?",
      "What are you learning right now?",
      "How do you keep your skills current?",
      "What would you like to learn next?",
    ],
    answer:
      "I usually learn new technologies through YouTube and Udemy. Since the AI boom, I have also used AI as a learning partner. It has accelerated the process and helps me understand unfamiliar ideas in much less time. My curiosity extends well beyond computer science—I am also interested in anatomy, biology, astronomy, and plenty of other subjects. You could say that makes me a master of none, and to some extent you would be right. But exploring different subjects is how I have fun and spend my free time. Reading and learning simply make me happy.",
    keywords:
      "learn learning study studying current next improve growth technology 學習 成長 新技術",
  },
  {
    id: "qa-teamwork",
    title: "Teamwork",
    questions: [
      "How do you work with a team?",
      "What role do you usually take on a team?",
      "How do you communicate with designers and developers?",
      "How do you handle technical disagreements?",
    ],
    answer:
      "The way I work with teams has continued to evolve. I used to be quite passive: I would follow instructions and do whatever people asked of me. As I have grown, I have realized that this is not always the best approach. I now share my perspective and take part in the discussion. I also used to fear conflict and avoid it whenever possible, but I no longer believe conflict is necessarily a bad thing. It can be a sign that everyone is engaged and genuinely wants the work to succeed. When disagreement happens, the worst response is to focus on proving that I am right. The best response is to listen first and remain as objective and calm as possible, even when I strongly disagree with the other person's opinion.",
    keywords:
      "team teamwork collaborate collaboration communicate designer developer disagreement 團隊 合作 溝通",
  },
  {
    id: "qa-design",
    title: "Product and design thinking",
    questions: [
      "What makes a good user experience?",
      "How do you approach UI design?",
      "How do you make websites accessible?",
      "How do you make a website responsive?",
    ],
    answer:
      "I believe good UI and UX design is about much more than visual appeal. Users should not have to spend much time learning how an app works, figuring out what each button does, or searching for the page they need. Performance matters too—the experience should feel fast and responsive. To me, clarity, ease of navigation, and loading speed are even more important than appearance.",
    keywords:
      "design ui ux user experience accessible accessibility responsive product 設計 使用者體驗 無障礙 響應式",
  },
  {
    id: "qa-career-goals",
    title: "Career goals",
    questions: [
      "What are your career goals?",
      "What kind of role are you looking for?",
      "Where do you see yourself in the future?",
      "What kind of products do you want to build?",
    ],
    answer:
      "One day, I want to run my own software company. Technically, I already do—it just happens to be a one-person company right now. My goal is to build an outstanding product or service. I have always been passionate about entrepreneurship; running a company is exhausting, but it is also a lot of fun, and that is exactly what I enjoy about it. At this stage, however, I want to join a software company as an engineer, keep learning, and grow through working with an experienced team. I am currently exploring roles such as software engineer, frontend engineer, backend engineer, full-stack engineer, cloud engineer, and DevOps engineer.",
    keywords:
      "career goal goals future role products looking opportunity 職涯 目標 未來 職位",
  },
  {
    id: "qa-australia",
    title: "Life and study in Australia",
    questions: [
      "Why did you choose to study in Australia?",
      "What did you learn from living in Australia?",
      "How did studying abroad change you?",
      "What was your experience in Australia like?",
    ],
    answer:
      "I chose to study in Australia because I love its natural environment, especially Queensland's warm climate. During my time there, I grew in many ways. I became more independent and discovered Stoicism, which helped me become calmer and understand more clearly what I want from life.",
    keywords:
      "australia study abroad living experience master university 澳洲 留學 海外 經驗",
  },
  {
    id: "qa-writing",
    title: "Writing and sharing",
    questions: [
      "Why do you write blog posts?",
      "What topics do you write about?",
      "Where can I read your articles?",
      "What is your favorite article?",
    ],
    answer: "",
    keywords:
      "write writing blog article journal share topic posts 寫作 部落格 文章 分享",
    sourceId: "journal",
  },
];
