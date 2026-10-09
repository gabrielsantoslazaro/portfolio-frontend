/**
 * Calculates reading time accurately based on 200 words per minute (industry standard average).
 * @param {string[]|string} content 
 * @param {number} wordsPerMinute 
 * @returns {string} e.g. "1 min" or "3 min"
 */
export function calculateReadTime(content, wordsPerMinute = 200) {
  const text = Array.isArray(content) ? content.join(" ") : String(content || "");
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  if (words === 0) return "1 min";
  const minutes = Math.max(1, Math.ceil(words / wordsPerMinute));
  return `${minutes} min`;
}

const RAW_BLOG_POSTS = [
  {
    id: "pos-system-dual-screen",
    slug: "building-dual-screen-pos-system-scratch",
    category: "The Full-Stack Dev Diary",
    tag: "Architecture",
    title: "Dual-Screen POS System from Scratch",
    date: "Oct 2026",
    coverImage: "", // Placeholder - ready for user image
    excerpt:
      "Full-stack POS architecture with offline sync, thermal printer integration, and recipe costing.",
    paragraphs: [
      "If you've been looking for a sign to start that complex full-stack project, this is it. Over the past few months, I built Klentro POS Hub—a complete Point of Sale and inventory management system. It’s not just a simple CRUD app; it has to handle offline synchronization, thermal printer integration, and complex recipe costing engines.",
      "My playground for this was an iMin D4 dual-screen terminal. For the front-end cashier app, I used React and Electron, while Next.js powered the admin dashboard. The real heavy lifting happens in the backend using NestJS, with Supabase and PostgreSQL handling the database and Row Level Security.",
      "One of the most challenging parts was the hardware integration—getting the thermal printers to fire off receipts flawlessly while ensuring the database syncs up the moment the connection is restored. In upcoming posts, I’ll break down our architecture and share snippets of how I set up the backend services. Stay tuned."
    ]
  },
  {
    id: "capstone-to-startup",
    slug: "from-capstone-to-startup-system-architecture-dti",
    category: "The Student-to-Founder Hustle",
    tag: "Startup",
    title: "From Capstone to Tech Startup",
    date: "Aug 2026",
    coverImage: "", // Placeholder - ready for user image
    excerpt:
      "Balancing microservices, REST APIs, and official DTI business registration in Manila.",
    paragraphs: [
      "Being an IT student while trying to launch a startup is a chaotic mix of syntax errors and paperwork. One day, you’re designing microservices, REST APIs, and configuring RabbitMQ and Docker containers for an RFID-based library management capstone project. The next day, you’re on the DTI portal verifying a business name to register your own sole proprietorship in Manila.",
      "The transition from doing coursework for ITE 317 System Integration Architecture 2 to actually drafting formal business registration documents for Klentro taught me a massive lesson: tech skills are only half the battle. The other half is understanding the business side of things.",
      "If you’re a student dreaming of building your own tech business, don't just treat what you do as a \"school project.\" Treat your capstones like real-world MVPs (Minimum Viable Products). That event-driven architecture you learned in class? That’s exactly what you’ll use when your startup scales."
    ]
  },
  {
    id: "hardware-fps-tuning",
    slug: "squeezing-every-drop-of-fps-ryzen-5700g-gtx-1660-super",
    category: "Hardware Tuning & Tactical Gaming",
    tag: "Hardware",
    title: "Squeezing Every Drop of FPS",
    date: "Aug 2026",
    coverImage: "", // Placeholder - ready for user image
    excerpt:
      "XMP memory tuning, thermal repasting, and latency tweaks for competitive shooter games.",
    paragraphs: [
      "In tactical shooters like Valorant and Crossfire, every frame and millisecond counts. If you're running an AMD Ryzen 7 5700G paired with an NVIDIA GeForce GTX 1660 Super on an MSI B450M motherboard, you already have a very capable rig. But if you’re just running stock settings, you're leaving a lot of performance on the table.",
      "First off, BIOS XMP memory tuning. If you have 16GB of DDR4 RAM capable of 3200 MHz, make sure it’s actually running at that speed! Many gamers don't notice that their RAM defaults to 2133 MHz.",
      "Next is thermal maintenance. Have you noticed your frame rates dropping after 2 hours of grinding in League of Legends? It might be thermal throttling. A quick re-paste using Arctic MX-4 thermal paste can drop your temps significantly, keeping your Corsair CX750 power supply and the rest of your system running stable. Combine this optimized setup with the crisp wireless audio cues from a HyperX Cloud III, and clutching those high-pressure situations becomes a whole lot easier."
    ]
  },
  {
    id: "midnight-coding-darkmode",
    slug: "midnight-coding-dark-mode-uis-arctic-monkeys",
    category: "Code & Chords / Lifestyle",
    tag: "Lifestyle",
    title: "Midnight Coding & Arctic Monkeys",
    date: "Jul 2026",
    coverImage: "", // Placeholder - ready for user image
    excerpt:
      "Finding flow state with indie rock playlists, dark UI themes, and late-night coffee.",
    paragraphs: [
      "There’s a specific kind of magic that happens when you’re coding at 2 AM. The world is quiet, your IDE is open, and your favorite playlist is on loop.",
      "While I was designing the UI/UX and custom dark mode themes for the Piggi - Your Ipon Buddy app, I realized how much of an impact music has on my flow state. I was using the Inter font for a clean, modern look on our ledger analytics, and while I was tweaking the vector avatar assets for Coach Piggi, \"No. 1 Party Anthem\" by Arctic Monkeys and \"About You\" by The 1975 were playing in the background.",
      "There’s a certain melancholic yet driving vibe in alternative rock and indie pop that perfectly matches the process of solving logic problems and polishing interfaces. I believe coding isn’t just pure logic; it’s a creative process too. The mood, the music, the coffee—it all contributes to the final output of the app. How about you guys, what’s your ultimate late-night coding anthem?"
    ]
  },
  {
    id: "responsive-web-design",
    slug: "why-responsive-web-design-matters",
    category: "Frontend & UI/UX / Engineering",
    tag: "Frontend",
    title: "Why Responsive Web Design Matters",
    date: "Jun 2026",
    coverImage: "", // Placeholder - vector illustration
    excerpt:
      "Why fluid layouts, thoughtful typography, and cross-device testing are essential for modern web development.",
    paragraphs: [
      "A good website should not only look attractive on a desktop computer. It should also work properly on tablets and smartphones. This is why responsive web design is an important part of modern web development.",
      "Responsive design allows a website's layout, images, text, and other elements to adjust to different screen sizes. It helps users navigate a website without needing to zoom in, scroll unnecessarily, or struggle with buttons that are too small.",
      "While improving my own portfolio, I realized that maintaining a consistent design across different devices requires careful planning and testing. A layout that looks perfect on a computer may not work well on a smaller screen. Developers need to consider spacing, font sizes, navigation, and content placement.",
      "Responsive design also supports accessibility and improves the overall user experience. Visitors should be able to access important information regardless of the device they use.",
      "For me, responsive design is not just about making a website fit the screen. It is about making the website easy to use, visually consistent, and functional for everyone."
    ]
  },
  {
    id: "beyond-the-code-hobbies",
    slug: "beyond-the-code-my-hobbies-and-interests",
    category: "Lifestyle & Personal Growth",
    tag: "Lifestyle",
    title: "Beyond the Code: My Hobbies and Interests",
    date: "Dec 2025",
    coverImage: "", // Placeholder - vector illustration
    excerpt:
      "Balancing software engineering with guitar sessions, tactical PC gaming, indie side projects, and quiet coffee breaks.",
    paragraphs: [
      "When I’m not coding or working on software projects, I enjoy spending time on things that help me relax and recharge. I like having hobbies outside of technology because they give me a chance to take a break from schoolwork, explore new interests, and enjoy life beyond my responsibilities. For me, it’s important to find a balance between learning, working on projects, and making time for myself.",
      "One thing I enjoy is building small projects and trying out new ideas. I like figuring out how things work and seeing if I can turn a simple idea into something useful. Working on personal projects also gives me the freedom to experiment, learn new techniques, and explore technologies that I might not always encounter in school. Even if a project starts out small, seeing it come together is a rewarding experience. It reminds me that there is always something new to learn and that improving my skills takes time and practice.",
      "I’m also into PC and mobile gaming. Aside from being a fun way to spend my free time, gaming helps me unwind after a long day of classes or working on projects. I enjoy the different challenges that games offer, especially those that require strategy, quick decisions, and problem-solving. I’m also interested in how games are designed, from their interfaces to the features that make them engaging. Since I’m passionate about technology, I sometimes find myself wondering how certain game mechanics work and how developers bring their ideas to life.",
      "Another hobby I enjoy is playing the guitar. Music gives me a way to relax and express myself, especially when I need a break from staring at a screen. I enjoy practicing songs and gradually getting better at playing them. It may take time to learn something new, but that’s part of what makes it enjoyable. Playing the guitar has also taught me to be patient and consistent, which are qualities I find useful in programming as well. Whether I’m learning a new song or figuring out a difficult piece of code, I know that improvement comes with practice.",
      "And of course, there’s coffee. I enjoy having a cup while taking a break, listening to music, or thinking about ideas for my next project. Sometimes, I simply like sitting down with my coffee and taking a moment to clear my mind. It’s a small part of my routine, but it helps me slow down and step away from the pressure of school and development work. I also enjoy the atmosphere that comes with a good cup of coffee, especially when I want some quiet time to think or plan what to do next.",
      "These hobbies may seem unrelated, but each one gives me something different. Building projects keeps me curious, gaming helps me relax, playing the guitar lets me enjoy music, and coffee gives me a reason to slow down and appreciate the little things. Together, they make my time outside of school and coding more enjoyable.",
      "I’ve come to realize that learning and personal growth don’t happen only in classrooms or through programming. Sometimes, they come from trying something new, practicing a skill, or simply taking a break when things get overwhelming. Having interests outside of technology helps me stay motivated and return to my work with a clearer mind. As I continue working toward my goal of becoming a software and AI engineer, I want to keep learning, building projects, and improving my skills without losing sight of the hobbies that make me who I am."
    ]
  }
];

export const BLOG_POSTS = RAW_BLOG_POSTS.map((post) => ({
  ...post,
  readTime: calculateReadTime(post.paragraphs)
}));
