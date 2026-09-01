import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/programs", "/community", "/services", "/about", "/blog", "/contact"],
        disallow: ["/dashboard", "/api", "/checkout"],
      },
    ],
    sitemap: "https://mojetech.com/sitemap.xml",
  }
}
