export default function manifest() {
  return {
    name: "Gabriel Lazaro — Software Developer",
    short_name: "Gabriel Lazaro",
    description: "Software Developer & AI Integrator based in Metro Manila, Philippines.",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    icons: [
      {
        src: "/Images/favicon.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/Images/favicon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
