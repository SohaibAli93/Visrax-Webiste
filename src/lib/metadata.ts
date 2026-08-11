import type { Metadata } from "next";
import { absoluteUrl, brandAssets, siteConfig } from "@/lib/site";

type MetadataInput = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  titlePattern?: string;
};

export function createMetadata({
  title,
  description,
  path,
  type = "website",
  publishedTime,
  modifiedTime,
  titlePattern
}: MetadataInput): Metadata {
  const url = absoluteUrl(path);
  const fullTitle = titlePattern ? titlePattern.replace("{title}", title) : title.includes("Visrax") ? title : `${title} | Visrax`;

  return {
    title: fullTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.name,
      type,
      images: [{ url: absoluteUrl(brandAssets.og), width: 2508, height: 627, alt: "Visrax computer vision monitoring brand visual" }],
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {})
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [absoluteUrl(brandAssets.og)]
    }
  };
}
