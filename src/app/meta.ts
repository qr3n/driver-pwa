import type { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Test',
    description: 'Test',
    generator: "Next.js",
    manifest: "/manifest.json",
    keywords: ["nextjs", "nextjs14", "next14", "pwa", "next-pwa"],
    themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#fff" }],
    authors: [
        { name: "Alldo Faiz Ramadhani" },
        {
            name: "Alldo Faiz Ramadhani",
            url: "https://www.linkedin.com/in/alldofaiz/",
        },
    ],
    viewport:
        "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
    icons: [
        { rel: "apple-touch-icon", url: "icons/icon-128x128.png" },
        { rel: "icon", url: "icons/icon-128x128.png" },
    ],
};

