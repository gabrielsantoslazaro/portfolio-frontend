export const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "https://portfolio-backend-1-aupt.onrender.com";

export const PROFILE = {
  name: "Gabriel Lazaro",
  role: "Software Developer",
  location: "Manila, Philippines",
  email: "gabriellazaro0808@gmail.com",
  bio: "Passionate about creating clean web applications, intuitive user interfaces, and reliable full-stack software solutions.",
  avatarLight: "/Images/light.png",
  avatarDark: "/Images/dark.png",
  chatAvatar: "/Images/dark.png",
  studentIdImage: "/Images/Student_ID.jpg",
  resumeUrl: "/Files/Gabriel-Lazaro-CV.pdf",
};

export const QUICK_ACTIONS = [
  {
    id: "schedule",
    label: "Schedule a Call",
    icon: "PhoneCall",
    href: "https://calendly.com/gabriellazaro0808/30min",
    isExternal: true,
  },
  {
    id: "email",
    label: "Send an Email",
    icon: "Mail",
    action: "openEmailModal",
  },
  {
    id: "download",
    label: "Download CV",
    icon: "Download",
    href: "/Files/Gabriel-Lazaro-CV.pdf",
    download: true,
  },
];

export const TAGLINES = [
  "Building one project at a time.",
  "Code. Learn. Repeat.",
  "Turning ideas into software.",
  "Writing code, solving problems.",
  "Turning logic into experience.",
  "Where ideas meet execution.",
  "Functional. Simple. Effective.",
];

export const HOME_CERTIFICATIONS = [
  {
    title: "Google AI",
    issuer: "Google",
    href: "https://coursera.org/share/13c5176e7970fa45a13dfb04e0c50289",
    image: "/Images/AIforBrainstormingandPlanning.jpg",
  },
  {
    title: "AWS Generative AI for Developers",
    issuer: "AWS",
    href: "https://coursera.org/share/6844d065e3aa0d7bbaa2cebda69e3452",
  },
  {
    title: "Artificial Intelligence Fundamentals",
    issuer: "IBM SkillsBuild",
    href: "https://www.credly.com/badges/55165467-e3c9-4b0e-bb41-fa735fad21eb/public_url",
  },
  {
    title: "Ethical Hacking & Responsible Disclosure",
    issuer: "West Visayas State University",
    image: "/Images/ethical-hacking.jfif",
  },
];

export const ALL_CERTIFICATIONS = [
  ...HOME_CERTIFICATIONS,
  { title: "AI for Brainstorming and Planning", issuer: "Google", image: "/Images/AIforBrainstormingandPlanning.jpg" },
  { title: "AI for Writing and Communicating", issuer: "Google", image: "/Images/AIforWritingandCommunicating.jpg" },
  { title: "AI for Research and Insights", issuer: "Google", href: "https://coursera.org/share/b0df79d57e1997e582408d7bcaed26d4" },
  { title: "AI for Content Creation", issuer: "Google", href: "https://coursera.org/share/55707127797278cc0bb1ed09713d64c6" },
  { title: "AI for Data Analysis", issuer: "Google", href: "https://coursera.org/share/77ef7bce26b7d72ce751034b6bc45707" },
  { title: "Google AI", issuer: "Google", href: "https://coursera.org/share/13c5176e7970fa45a13dfb04e0c50289" },
  { title: "AWS Generative AI for Developers", issuer: "AWS", href: "https://coursera.org/share/6844d065e3aa0d7bbaa2cebda69e3452" },
  {
    title: "Artificial Intelligence Fundamentals",
    issuer: "IBM SkillsBuild",
    href: "https://www.credly.com/badges/55165467-e3c9-4b0e-bb41-fa735fad21eb/public_url",
  },
  { title: "CSS Essentials", issuer: "Cisco", href: "https://www.credly.com/badges/bc20cc54-d79c-4979-ada1-74a209daee47/public_url" },
  {
    title: "IT Customer Support Basics",
    issuer: "Cisco",
    href: "https://www.credly.com/badges/4381c9d8-d337-47f8-991c-c6537b7633fd/public_url",
  },
  { title: "JavaScript Essentials 1", issuer: "Cisco", href: "https://www.credly.com/badges/23dadaf7-e18a-45cd-b472-73738fa6f81e/public_url" },
  { title: "JavaScript Essentials 2", issuer: "Cisco", href: "https://www.credly.com/badges/7709e733-dac0-4775-81a4-e3cbb41e3217/public_url" },
];

export const CATEGORIZED_CERTIFICATIONS = [
  {
    category: "AI",
    items: [
      { title: "Google AI", issuer: "Google", icon: "Sparkles", href: "https://coursera.org/share/13c5176e7970fa45a13dfb04e0c50289" },
      { title: "AWS Generative AI for Developers", issuer: "AWS", icon: "Cloud", href: "https://coursera.org/share/6844d065e3aa0d7bbaa2cebda69e3452" },
      { title: "Artificial Intelligence Fundamentals", issuer: "IBM SkillsBuild", icon: "Brain", href: "https://www.credly.com/badges/55165467-e3c9-4b0e-bb41-fa735fad21eb/public_url" },
      { title: "AI for Brainstorming and Planning", issuer: "Google", icon: "Lightbulb", image: "/Images/AIforBrainstormingandPlanning.jpg" },
      { title: "AI for Writing and Communicating", issuer: "Google", icon: "PenTool", image: "/Images/AIforWritingandCommunicating.jpg" },
      { title: "AI for Research and Insights", issuer: "Google", icon: "Search", href: "https://coursera.org/share/b0df79d57e1997e582408d7bcaed26d4" },
      { title: "AI for Content Creation", issuer: "Google", icon: "Sparkles", href: "https://coursera.org/share/55707127797278cc0bb1ed09713d64c6" },
      { title: "AI for Data Analysis", issuer: "Google", icon: "Database", href: "https://coursera.org/share/77ef7bce26b7d72ce751034b6bc45707" },
      { title: "AI for Oceans Hour of Code", issuer: "Code.org", icon: "Waves", image: "/Images/Oceans.jfif" },
      { title: "AI Ready ASEAN Session", issuer: "AI Ready ASEAN", icon: "Globe", image: "/Images/Hour-of-code.jfif" },
    ]
  },
  {
    category: "ENGINEERING",
    items: [
      { title: "APIs & Fetch Real Data", issuer: "Computer Programming", icon: "FileCode", image: "/Images/API.jpg" },
      { title: "JavaScript Essentials 1", issuer: "Cisco", icon: "Code2", href: "https://www.credly.com/badges/23dadaf7-e18a-45cd-b472-73738fa6f81e/public_url" },
      { title: "JavaScript Essentials 2", issuer: "Cisco", icon: "Code2", href: "https://www.credly.com/badges/7709e733-dac0-4775-81a4-e3cbb41e3217/public_url" },
      { title: "CSS Essentials", issuer: "Cisco", icon: "Layout", href: "https://www.credly.com/badges/bc20cc54-d79c-4979-ada1-74a209daee47/public_url" },
      { title: "IT Customer Support Basics", issuer: "Cisco", icon: "Headphones", href: "https://www.credly.com/badges/4381c9d8-d337-47f8-991c-c6537b7633fd/public_url" },
    ]
  },
  {
    category: "SECURITY",
    items: [
      { title: "Ethical Hacking & Responsible Disclosure", issuer: "West Visayas State University", icon: "ShieldCheck", image: "/Images/ethical-hacking.jfif" },
    ]
  }
];

export const ALL_PROJECTS = [
  {
    title: "Klentro POS",
    category: "FULL-STACK · POINT OF SALE",
    badge: "#1 FULL-STACK POS",
    description: "A full-stack Point of Sale (POS) and Backoffice management system built with Next.js & TypeScript on the web, Node.js backend, and a mobile POS app built using Android Studio.",
    domain: "klentro-pos.vercel.app",
    href: "https://klentro-pos.vercel.app/login",
    tags: ["Next.js", "TypeScript", "Node.js", "Android Studio", "Full-Stack"],
    icon: "Store",
  },
  {
    title: "KlatchCafe",
    category: "COFFEE SHOP · LANDING PAGE",
    badge: "CAFE LANDING PAGE",
    description: "A modern, aesthetic coffee shop landing page built with Next.js, featuring interactive cafe menus, brand storytelling, and responsive UI design.",
    domain: "klatchcafe.com",
    href: "https://klatchcafe.com",
    tags: ["Next.js", "Tailwind CSS", "UI/UX", "Responsive Design"],
    icon: "Coffee",
  },
  {
    title: "SchedulePro",
    category: "PRODUCTIVITY · WEB APP",
    badge: "PRODUCTIVITY",
    description: "A streamlined productivity and scheduling web application for task tracking, daily routines, and local storage management.",
    domain: "schedulepro.github.io",
    href: "https://schedulepro.github.io/SCHEDULEPR0/index.html",
    tags: ["JavaScript", "HTML5", "CSS3", "Productivity"],
    icon: "Calendar",
  },
  {
    title: "StudyMate AI",
    category: "GENERATIVE AI · EDTECH",
    badge: "AI EDTECH",
    description: "An AI-powered study assistant tool helping students condense lecture notes, synthesize concepts, and generate instant practice quizzes.",
    domain: "github.io/StudyMate-AI",
    href: "https://gabrielsantoslazaro.github.io/StudyMate-AI/",
    tags: ["React", "AI Integration", "API", "EdTech"],
    icon: "Sparkles",
  },
  {
    title: "Nocturne",
    category: "WELLNESS · UI/UX",
    badge: "WELLNESS STUDIO",
    description: "An interactive web application crafted for daily mindfulness, ambient relaxation, and guided breathing exercises.",
    domain: "nocturnewellnessstudio-create.github.io",
    href: "https://nocturnewellnessstudio-create.github.io/Studio/about.html",
    tags: ["Responsive Design", "UI/UX", "JavaScript"],
    icon: "HeartHandshake",
  },
];

export const FEATURED_PROJECTS = ALL_PROJECTS.filter((p) =>
  ["Klentro POS", "KlatchCafe", "StudyMate AI"].includes(p.title)
);

export const PROJECTS = FEATURED_PROJECTS;

export const TECH_STACKS = [
  {
    category: "FRONTEND & MOBILE",
    items: ["JavaScript", "TypeScript", "React", "Next.js", "Flutter", "Dart", "Tailwind CSS", "HTML5", "CSS3", "Vite", "Webpack", "Responsive UI"],
  },
  {
    category: "BACKEND & APIS",
    items: ["Node.js", "Express.js", "NestJS", "GraphQL", "gRPC", "REST APIs", "PostgreSQL", "Supabase", "Firebase", "MySQL", "PHP", "Python", "CRUD Processing"],
  },
  {
    category: "SECURITY & AUTHENTICATION",
    items: ["OAuth", "JWT", "AES", "RSA", "SHA", "Data Encryption", "Hashing", "RBAC", "HTTPS / SSL"],
  },
  {
    category: "DEVELOPER TOOLS & CODE QUALITY",
    items: ["Webpack", "ESLint", "Prettier", "Git", "GitHub", "Docker", "Vercel", "npm", "VS Code", "Postman"],
  },
  {
    category: "AI & MACHINE LEARNING",
    items: ["PyTorch", "Hugging Face", "Google GenAI", "OpenAI API", "Prompt Engineering", "LLM Pipelines", "Chatbots"],
  },
  {
    category: "MOBILE DEVELOPMENT",
    items: ["Flutter", "Dart", "Android Studio", "Cross-Platform UI", "Mobile App Architecture", "State Management"],
  },
  {
    category: "COMMUNICATION & COLLABORATION",
    items: ["Discord", "Teams", "GitHub Projects", "Agile / Scrum", "Technical Documentation"],
  },
  {
    category: "PROGRAMMING LANGUAGES",
    items: ["JavaScript", "TypeScript", "Python", "Dart", "SQL", "PostgreSQL", "Java", "C#", "C++", "PHP"],
  },
];

export const GALLERY_IMAGES = [
  { src: "/Images/1.jfif", alt: "Gabriel Lazaro Photo 1" },
  { src: "/Images/2.jfif", alt: "Gabriel Lazaro Photo 2" },
  { src: "/Images/3.jpg", alt: "Gabriel Lazaro Photo 3" },
  { src: "/Images/4.jfif", alt: "Gabriel Lazaro Photo 4" },
  { src: "/Images/5.jfif", alt: "Gabriel Lazaro Photo 5" },
  { src: "/Images/6.jfif", alt: "Gabriel Lazaro Photo 6" },
  { src: "/Images/7.jfif", alt: "Gabriel Lazaro Photo 7" },
  { src: "/Images/8.jfif", alt: "Gabriel Lazaro Photo 8" },
  { src: "/Images/9.jfif", alt: "Gabriel Lazaro Photo 9" },
  { src: "/Images/10.jfif", alt: "Gabriel Lazaro Photo 10" },
];

export const SOCIAL_LINKS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/gabrielsantoslazaro/",
    icon: "Linkedin",
  },
  {
    label: "GitHub",
    href: "https://github.com/gabrielsantoslazaro",
    icon: "Github",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/xtm.gabriel09",
    icon: "Facebook",
  },
];

export const TIMELINE = [
  {
    title: "BS Information Technology",
    date: "Present",
    description: "PHINMA Saint Jude College - Manila",
    active: true,
    icon: "GraduationCap",
  },
  {
    title: "Web Development Projects",
    date: "2026",
    description: "Built responsive websites and portfolio projects using modern web technologies and frameworks.",
    icon: "Laptop",
  },
  {
    title: "AI Chatbot Integration",
    date: "2026",
    description: "Developed and integrated a custom AI chatbot using Node.js, Express.js, and Google GenAI.",
    icon: "Bot",
  },
  {
    title: "Xurpas Enterprise Inc.",
    date: "2025",
    description: "Front-End Developer intern with hands-on experience building and improving web UI components.",
    icon: "Briefcase",
  },
  {
    title: "Academic System Projects",
    date: "2023",
    description: "Worked on school-related systems and programming projects involving web development and relational databases.",
    icon: "FolderGit2",
  },
];

export const FULL_EXPERIENCES = [
  {
    monogram: "SJ",
    company: "PHINMA Saint Jude College - Manila",
    employmentType: "Higher Education · 3 yrs",
    location: "Manila, National Capital Region, Philippines · On-site",
    role: "BS Information Technology",
    period: "AUG 2023 - PRESENT · 3 YRS",
    year: "2023",
    active: true,
    paragraphs: [
      "Pursuing a Bachelor of Science in Information Technology with specialized coursework in software engineering, database systems, web development, algorithms, and cloud integration.",
      "Leading academic project initiatives and system architectures, developing relational database schemas and full-stack solutions to solve university workflow challenges."
    ],
    skills: ["Information Technology", "Web Development", "Database Architecture", "React.js", "Java", "C#", "MySQL", "+4 skills"],
  },
  {
    monogram: "XE",
    company: "Xurpas Enterprise Inc.",
    employmentType: "Internship · 4 mos",
    location: "Makati, National Capital Region, Philippines · Hybrid",
    role: "Front-End Developer Intern",
    period: "FEB 2025 - MAY 2025 · 4 MOS",
    year: "2025",
    active: false,
    paragraphs: [
      "Contributed to enterprise web application front-end development, building reusable UI components, optimizing cross-browser compatibility, and enhancing overall application responsiveness.",
      "Collaborated directly with senior engineers and UI/UX designers, adhering to modern JavaScript standards, conducting pull request code reviews, and enforcing accessible web practices."
    ],
    skills: ["Front-End Development", "JavaScript (ES6+)", "HTML5 / CSS3", "Responsive Layouts", "UI/UX", "Git", "+3 skills"],
  },
  {
    monogram: "AI",
    company: "AI Engineering & Independent Projects",
    employmentType: "Self-Employed · 1 yr 6 mos",
    location: "Metro Manila, Philippines · Remote",
    role: "Full-Stack Developer & AI Integrator",
    period: "AUG 2024 - PRESENT · 1 YR 6 MOS",
    year: "2024",
    active: true,
    paragraphs: [
      "Architected and deployed production web applications featuring intelligent AI integrations, including an interactive AI chatbot powered by Node.js, Express, and Google GenAI API.",
      "Engineered multiple end-to-end applications including SchedulePro (productivity tracker), StudyMate AI (summarizer and quiz generator), and Nocturne Wellness Studio with custom UI/UX design and fast performance."
    ],
    skills: ["Artificial Intelligence (AI)", "Generative AI", "Google GenAI API", "Node.js", "Express.js", "React.js", "Next.js", "Tailwind CSS", "+3 skills"],
  },
  {
    monogram: "AC",
    company: "Academic Systems & Database Development",
    employmentType: "Project-based · 10 mos",
    location: "Manila, Philippines",
    role: "Web Systems & Database Developer",
    period: "AUG 2023 - MAY 2024 · 10 MOS",
    year: "2023",
    active: false,
    paragraphs: [
      "Designed and implemented relational database-driven web applications for academic management and information systems.",
      "Architected structured MySQL database schemas, implemented secure CRUD operations using PHP and Node.js, and maintained data consistency across multi-user environments."
    ],
    skills: ["Database Design", "MySQL", "PHP", "CRUD Processing", "XAMPP", "Data Modeling", "+2 skills"],
  },
];

export const CHAT_SUGGESTIONS = [
  "What is Gabriel's tech stack?",
  "Tell me about his recent projects",
  "Where is Gabriel studying?",
  "How can I contact Gabriel?",
];
