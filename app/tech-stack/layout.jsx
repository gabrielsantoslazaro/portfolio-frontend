export const metadata = {
  title: "Tech Stack",
  description:
    "Comprehensive tech stack, frameworks, libraries, cloud tools, and programming languages mastered by Gabriel Lazaro.",
  alternates: {
    canonical: "https://gabriellazaro.site/tech-stack",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://gabriellazaro.site/tech-stack",
    siteName: "Gabriel Lazaro Portfolio",
    title: "Tech Stack — Gabriel Lazaro",
    description:
      "Comprehensive tech stack, frameworks, libraries, cloud tools, and programming languages mastered by Gabriel Lazaro.",
    images: [
      {
        url: "/Images/dark.png",
        width: 1200,
        height: 630,
        alt: "Gabriel Lazaro Tech Stack",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tech Stack — Gabriel Lazaro",
    description:
      "Comprehensive tech stack, frameworks, libraries, cloud tools, and programming languages mastered by Gabriel Lazaro.",
    images: ["/Images/dark.png"],
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://gabriellazaro.site"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Tech Stack",
      "item": "https://gabriellazaro.site/tech-stack"
    }
  ]
};

export default function TechStackLayout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {children}
    </>
  );
}
