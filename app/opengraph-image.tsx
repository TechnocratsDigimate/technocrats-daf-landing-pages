import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Technocrats Digimate — Performance Marketing & Lead Generation";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          padding: "60px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "24px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              background: "linear-gradient(90deg, #f97316, #fb923c)",
              color: "white",
              padding: "8px 20px",
              borderRadius: "999px",
              fontSize: "18px",
              fontWeight: 700,
              letterSpacing: "2px",
              textTransform: "uppercase",
            }}
          >
            Performance Marketing Agency
          </div>
          <div
            style={{
              color: "white",
              fontSize: "64px",
              fontWeight: 800,
              lineHeight: 1.1,
              maxWidth: "900px",
            }}
          >
            Technocrats Digimate
          </div>
          <div
            style={{
              color: "#94a3b8",
              fontSize: "28px",
              fontWeight: 400,
              maxWidth: "800px",
            }}
          >
            Predictable leads for Real Estate & Study Abroad businesses
          </div>
          <div
            style={{
              display: "flex",
              gap: "16px",
              marginTop: "8px",
            }}
          >
            {["Meta Ads", "Google Ads", "Lead Generation", "CRM"].map((tag) => (
              <div
                key={tag}
                style={{
                  background: "rgba(249,115,22,0.15)",
                  border: "1px solid rgba(249,115,22,0.4)",
                  color: "#fb923c",
                  padding: "6px 16px",
                  borderRadius: "6px",
                  fontSize: "18px",
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            color: "#475569",
            fontSize: "18px",
          }}
        >
          technocratsdigimate.com
        </div>
      </div>
    ),
    { ...size }
  );
}
