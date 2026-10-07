export const metadata = {
  title: "Experience",
  description:
    "Professional work experience, software engineering roles, and technical milestones of Gabriel Lazaro.",
  alternates: {
    canonical: "https://gabriellazaro.site/experience",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://gabriellazaro.site/experience",
    siteName: "Gabriel Lazaro Portfolio",
    title: "Experience — Gabriel Lazaro",
    description:
      "Professional work experience, software engineering roles, and technical milestones of Gabriel Lazaro.",
    images: [
      {
        url: "/Images/dark.png",
        width: 1200,
        height: 630,
        alt: "Gabriel Lazaro Experience",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Experience — Gabriel Lazaro",
    description:
      "Professional work experience, software engineering roles, and technical milestones of Gabriel Lazaro.",
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
      "name": "Experience",
      "item": "https://gabriellazaro.site/experience"
    }
  ]
};

export default function ExperienceLayout({ children }) {
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
