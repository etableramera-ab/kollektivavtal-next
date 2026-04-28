import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const audit = JSON.parse(
  readFileSync(join(__dirname, "src/data/agreement-audit.json"), "utf8")
);

const removedSlugs = audit.probablyFake.map((f) => f.slug);

const slugRedirects = removedSlugs.flatMap((slug) => [
  { source: `/avtal/${slug}`, destination: "/avtal", permanent: true },
  { source: `/:locale(en|ar|so|fa|es|pl)/avtal/${slug}`, destination: "/:locale/avtal", permanent: true },
]);

/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  async redirects() {
    return [
      { source: "/avtal/bokforingsbyr%C3%A5-avtal", destination: "/avtal/bokforingsbyra-avtal", permanent: true },
      { source: "/avtal/cirkul%C3%A4rtekniker", destination: "/avtal/cirkulartekniker", permanent: true },
      ...slugRedirects,
    ];
  },
};

export default nextConfig;
