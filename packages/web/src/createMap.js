const fs = require("fs");
const routes = [
  "/",
  "/account-settings",
  "/account-settings/personal-info",
  "/account-settings/security",
  "/support",
  "/support/confirmation",
  "/explore",
  "/search",
  "/results",
  "/recommendations",
  "/verify-email",
  "/reset-password",
  "/forgot-password",
  "/my-locations",
  "/login",
  "/register",
  "/signed-out",
  "/privacy-policy",
  "/terms-of-service",
  "/data-sources",
];

const generateSitemap = (domain) => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `
    <url>
        <loc>${domain}${route}</loc>
        <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.5</priority>
    </url>`
  )
  .join("")}
</urlset>`;

  fs.writeFileSync("../public/sitemap.xml", sitemap);
  console.log("Sitemap generated successfully!");
};

generateSitemap("https://www.homeknown.app");
