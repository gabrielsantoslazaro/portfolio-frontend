export const metadata = {
  title: "Blog",
  description:
    "Thoughts, tutorials, and notes on software engineering, dual-screen POS systems, system architecture, hardware optimization, and tech lifestyle by Gabriel Lazaro.",
  alternates: {
    canonical: "https://gabriellazaro.site/blog",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://gabriellazaro.site/blog",
    siteName: "Gabriel Lazaro Portfolio",
    title: "Blog — Gabriel Lazaro",
    description:
      "Thoughts, tutorials, and notes on software engineering, dual-screen POS systems, system architecture, hardware optimization, and tech lifestyle by Gabriel Lazaro.",
    images: [
      {
        url: "/Images/light.png",
        width: 1200,
        height: 630,
        alt: "Gabriel Lazaro Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog — Gabriel Lazaro",
    description:
      "Thoughts, tutorials, and notes on software engineering, dual-screen POS systems, system architecture, hardware optimization, and tech lifestyle by Gabriel Lazaro.",
    images: ["/Images/light.png"],
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://gabriellazaro.site",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Blog",
      item: "https://gabriellazaro.site/blog",
    },
  ],
};

export default function BlogLayout({ children }) {
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
