import "./globals.css";
import Script from "next/script";
import Sidebar from "@/components/common/Sidebar";
import TypingTestModal from "@/components/typing/TypingTestModal";
import AskAnythingModal from "@/components/chatbot/AskAnythingModal";
import EmailModal from "@/components/contact/EmailModal";

export const metadata = {
  title: "Gabriel Lazaro — Software Developer",
  description:
    "I'm Gabriel Lazaro — a software developer in Metro Manila. I build modern web apps, mobile apps, and full-stack systems. Explore projects, certifications, tech stack, and contact information.",
  authors: [{ name: "Gabriel Lazaro" }],
  keywords: [
    "Gabriel Lazaro",
    "Bryl Lim style portfolio",
    "Software Developer",
    "Full-Stack Developer",
    "Web Developer",
    "React",
    "Next.js",
    "Tailwind CSS",
    "Metro Manila",
    "Philippines"
  ],
  metadataBase: new URL("https://gabriellazaro.site"),
  alternates: {
    canonical: "https://gabriellazaro.site",
  },
  openGraph: {
    type: "website",
    url: "https://gabriellazaro.site",
    siteName: "Gabriel Lazaro",
    title: "Gabriel Lazaro — Software Developer",
    description:
      "I'm Gabriel Lazaro — a software developer in Metro Manila. I build modern web apps, mobile apps, and full-stack systems.",
    images: [
      {
        url: "/Images/dark.png",
        width: 1200,
        height: 630,
        alt: "Gabriel Lazaro — Software Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gabriel Lazaro — Software Developer",
    description:
      "I'm Gabriel Lazaro — a software developer in Metro Manila. I build modern web apps, mobile apps, and full-stack systems.",
    images: ["/Images/dark.png"],
  },
  icons: {
    icon: [
      { url: "/Images/favicon.png", type: "image/png" },
      { url: "/favicon.ico" }
    ],
    apple: "/Images/favicon.png",
    shortcut: "/favicon.ico",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://gabriellazaro.site/#website",
      "url": "https://gabriellazaro.site",
      "name": "Gabriel Lazaro",
      "alternateName": [
        "Gabriel Santos Lazaro",
        "Gabriel Lazaro Portfolio",
        "gabriellazaro.site"
      ],
      "publisher": {
        "@id": "https://gabriellazaro.site/#person"
      }
    },
    {
      "@type": "Person",
      "@id": "https://gabriellazaro.site/#person",
      "name": "Gabriel Lazaro",
      "url": "https://gabriellazaro.site",
      "jobTitle": "Software Developer",
      "image": "https://gabriellazaro.site/Images/dark.png",
      "description": "Software Developer and AI Integrator based in Metro Manila, Philippines.",
      "sameAs": [
        "https://github.com/gabrielsantoslazaro",
        "https://www.linkedin.com/in/gabrielsantoslazaro"
      ]
    }
  ]
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/Images/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/Images/favicon.png" />
        <link rel="stylesheet" href="/css/style.css" />
        <link rel="stylesheet" href="/css/responsive.css" />
        <link rel="stylesheet" href="/css/darkmode.css" />
        <link rel="stylesheet" href="/css/certificates.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=Geist+Mono:wght@300..600&family=Source+Serif+4:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Script
          src="https://www.google.com/recaptcha/api.js?render=explicit"
          strategy="afterInteractive"
        />
      </head>
      <body>
        {/* Subtle retro dot pattern background (Edge gutters only, never overlapping content) */}
        <div className="bryl-bg-dots-top" aria-hidden="true" />
        <div className="bryl-bg-dots-bottom" aria-hidden="true" />
        <Sidebar />
        <TypingTestModal />
        <AskAnythingModal />
        <EmailModal />
        <div id="root">
          {children}
        </div>
      </body>
    </html>
  );
}
