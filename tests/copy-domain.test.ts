import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

const layout = readFileSync("app/layout.tsx", "utf8");
const sitemap = readFileSync("app/sitemap.ts", "utf8");
const robots = readFileSync("app/robots.ts", "utf8");
const home = readFileSync("app/(portal)/page.tsx", "utf8");
const membership = readFileSync("app/membership/page.tsx", "utf8");
const workflow = readFileSync(".github/workflows/deploy-pages.yml", "utf8");

describe("independent obrien-ac.com copy", () => {
  it("uses the copied domain for canonical metadata", () => {
    expect(layout).toContain("https://obrien-ac.com");
    expect(sitemap).toContain("https://obrien-ac.com");
    expect(robots).toContain("https://obrien-ac.com");
    expect(layout).not.toContain("https://obrienac.com");
  });

  it("keeps Customer Login inside the copied deployment", () => {
    expect(home).toContain('const portalDemoUrl = "/portal-demo/#/login"');
    expect(membership).toContain('const portalDemoUrl = "/portal-demo/#/login"');
  });

  it("deploys only to GitHub Pages", () => {
    expect(workflow).toContain("actions/deploy-pages@v4");
    expect(workflow).not.toContain("cloudflare");
    expect(workflow).not.toContain("vercel");
  });
});
