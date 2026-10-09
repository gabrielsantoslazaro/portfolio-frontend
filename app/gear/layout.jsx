export const metadata = {
  title: "Gear — Gabriel Lazaro",
  description:
    "The hardware, tools, and setup I use to code, build full-stack systems, and stay productive — my daily desk setup and everyday carry.",
  alternates: {
    canonical: "https://gabriellazaro.site/gear",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://gabriellazaro.site/gear",
    siteName: "Gabriel Lazaro Portfolio",
    title: "Gear — Gabriel Lazaro",
    description:
      "The hardware, tools, and setup I use to code, build full-stack systems, and stay productive — my daily desk setup and everyday carry.",
    images: [
      {
        url: "/Images/light.png",
        width: 1200,
        height: 630,
        alt: "Gabriel Lazaro — Gear & Setup",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gear — Gabriel Lazaro",
    description:
      "The hardware, tools, and setup I use to code, build full-stack systems, and stay productive — my daily desk setup and everyday carry.",
    images: ["/Images/light.png"],
  },
};

export default function GearLayout({ children }) {
  return <>{children}</>;
}
