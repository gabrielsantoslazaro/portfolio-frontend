import { BLOG_POSTS } from "@/lib/blog-data";

export async function generateMetadata({ params }) {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug || p.id === params.slug);

  if (!post) {
    return {
      title: "Post Not Found — Gabriel Lazaro",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `https://gabriellazaro.site/blog/${post.slug}`,
    },
    openGraph: {
      type: "article",
      locale: "en_US",
      url: `https://gabriellazaro.site/blog/${post.slug}`,
      siteName: "Gabriel Lazaro Portfolio",
      title: `${post.title} — Gabriel Lazaro`,
      description: post.excerpt,
      images: [
        {
          url: "/Images/light.png",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} — Gabriel Lazaro`,
      description: post.excerpt,
      images: ["/Images/light.png"],
    },
  };
}

export default function BlogPostLayout({ children, params }) {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug || p.id === params.slug);

  const articleJsonLd = post
    ? {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.excerpt,
        datePublished: "2026-10-09T00:00:00+00:00",
        author: {
          "@type": "Person",
          name: "Gabriel Lazaro",
          url: "https://gabriellazaro.site",
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `https://gabriellazaro.site/blog/${post.slug}`,
        },
      }
    : null;

  return (
    <>
      {articleJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />
      )}
      {children}
    </>
  );
}
