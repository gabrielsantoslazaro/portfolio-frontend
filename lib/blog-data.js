export const BLOG_POSTS = [
  {
    id: "pos-system-dual-screen",
    slug: "building-dual-screen-pos-system-scratch",
    category: "The Full-Stack Dev Diary",
    tag: "Architecture",
    title: "Dual-Screen POS System from Scratch",
    date: "Oct 2026",
    readTime: "4 min",
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
    readTime: "5 min",
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
    readTime: "6 min",
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
    readTime: "3 min",
    coverImage: "", // Placeholder - ready for user image
    excerpt:
      "Finding flow state with indie rock playlists, dark UI themes, and late-night coffee.",
    paragraphs: [
      "There’s a specific kind of magic that happens when you’re coding at 2 AM. The world is quiet, your IDE is open, and your favorite playlist is on loop.",
      "While I was designing the UI/UX and custom dark mode themes for the Piggi - Your Ipon Buddy app, I realized how much of an impact music has on my flow state. I was using the Inter font for a clean, modern look on our ledger analytics, and while I was tweaking the vector avatar assets for Coach Piggi, \"No. 1 Party Anthem\" by Arctic Monkeys and \"About You\" by The 1975 were playing in the background.",
      "There’s a certain melancholic yet driving vibe in alternative rock and indie pop that perfectly matches the process of solving logic problems and polishing interfaces. I believe coding isn’t just pure logic; it’s a creative process too. The mood, the music, the coffee—it all contributes to the final output of the app. How about you guys, what’s your ultimate late-night coding anthem?",
      "Just let me know which one you want to expand first! You can definitely post these across different categories on your portfolio website."
    ]
  }
];
