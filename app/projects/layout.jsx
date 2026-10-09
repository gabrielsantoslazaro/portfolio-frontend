export const metadata = {
  title: "Projects",
  description:
    "Featured products, platforms, and full-stack web applications designed, engineered, and shipped by Gabriel Lazaro.",
  alternates: {
    canonical: "https://gabriellazaro.site/projects",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://gabriellazaro.site/projects",
    siteName: "Gabriel Lazaro Portfolio",
    title: "Projects — Gabriel Lazaro",
    description:
      "Featured products, platforms, and full-stack web applications designed, engineered, and shipped by Gabriel Lazaro.",
    images: [
      {
        url: "/Images/light.png",
        width: 1200,
        height: 630,
        alt: "Gabriel Lazaro Projects",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects — Gabriel Lazaro",
    description:
      "Featured products, platforms, and full-stack web applications designed, engineered, and shipped by Gabriel Lazaro.",
    images: ["/Images/light.png"],
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
      "name": "Projects",
      "item": "https://gabriellazaro.site/projects"
    }
  ]
};

export default function ProjectsLayout({ children }) {
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
