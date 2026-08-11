import { ImageResponse } from "next/og";
import { caseStudies } from "@/lib/data";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Visrax case study";

type PageProps = { params: Promise<{ slug: string }> };

export default async function Image({ params }: PageProps) {
  const { slug } = await params;
  const article = caseStudies.find((item) => item.slug === slug);

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #0a0a0f 0%, #141421 100%)",
          color: "#fff",
          padding: 80,
          justifyContent: "space-between"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 999,
              background: "#214cff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontWeight: 700,
              fontSize: 24
            }}
          >
            V
          </div>
          <div style={{ fontSize: 28, opacity: 0.6 }}>Visrax Case Study</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 28, opacity: 0.6, marginBottom: 16, textTransform: "uppercase", letterSpacing: 2 }}>
            {article?.category ?? "Case Study"}
          </div>
          <div style={{ fontSize: 60, fontWeight: 700, lineHeight: 1.1, maxWidth: 950 }}>
            {article?.title ?? "Visrax Case Study"}
          </div>
          <div style={{ fontSize: 26, opacity: 0.8, marginTop: 20, maxWidth: 900 }}>
            {article?.description ?? "How Visrax monitoring is evaluated in real operational environments."}
          </div>
        </div>
      </div>
    ),
    size
  );
}
