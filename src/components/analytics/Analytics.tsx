import Script from "next/script";

const analyticsDomain = process.env.NEXT_PUBLIC_ANALYTICS_DOMAIN;

export function Analytics() {
  if (!analyticsDomain) return null;

  return (
    <Script
      src="https://plausible.io/js/script.js"
      data-domain={analyticsDomain}
      strategy="lazyOnload"
    />
  );
}
