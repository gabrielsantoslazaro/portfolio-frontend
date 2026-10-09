export const metadata = {
  title: "Certifications",
  description:
    "Verified industry certifications, badges, and credentials earned by Gabriel Lazaro from Google, AWS, IBM, and Cisco.",
  alternates: {
    canonical: "https://gabriellazaro.site/certifications",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://gabriellazaro.site/certifications",
    siteName: "Gabriel Lazaro Portfolio",
    title: "Certifications — Gabriel Lazaro",
    description:
      "Verified industry certifications, badges, and credentials earned by Gabriel Lazaro from Google, AWS, IBM, and Cisco.",
    images: [
      {
        url: "/Images/light.png",
        width: 1200,
        height: 630,
        alt: "Gabriel Lazaro Certifications",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Certifications — Gabriel Lazaro",
    description:
      "Verified industry certifications, badges, and credentials earned by Gabriel Lazaro from Google, AWS, IBM, and Cisco.",
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
      "name": "Certifications",
      "item": "https://gabriellazaro.site/certifications"
    }
  ]
};

export default function CertificationsLayout({ children }) {
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
