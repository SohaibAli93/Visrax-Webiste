export const siteConfig = {
  name: "Visrax",
  tagline: "Vision. Intelligence. Impact.",
  defaultUrl: "https://visrax.com",
  description:
    "Visrax transforms existing cameras into intelligent monitoring systems for real-time detection, tracking, alerts, analytics, and multi-site operational visibility."
};

export function getSiteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL || siteConfig.defaultUrl).replace(/\/$/, "");
}

export function absoluteUrl(path = "/") {
  return `${getSiteUrl()}${path.startsWith("/") ? path : `/${path}`}`;
}

export const brandAssets = {
  logo: "/brand/visrax_logo_web_transparent.png",
  wordmark: "/brand/visrax-wordmark-clean.png",
  mark: "/brand/visrax-mark-clean.png",
  tagline: "/brand/visrax-tagline-clean.png",
  showcaseDetection: "/brand/showcase-detection.png",
  showcaseZones: "/brand/showcase-zones.png",
  showcaseTracking: "/brand/showcase-tracking.png",
  banner: "/brand/banner.png",
  icon: "/brand/icon.png",
  appLogo: "/brand/app logo.png",
  og: "/brand/banner.png"
};
