import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "AerScheduler - flight school management software";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #10233F 0%, #1a3763 48%, #1967D2 100%)",
          padding: "64px 72px",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            color: "white",
            fontSize: 36,
            fontWeight: 700,
            letterSpacing: "-0.02em",
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "rgba(255,255,255,0.18)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            A
          </div>
          AerScheduler
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              color: "white",
              fontSize: 64,
              fontWeight: 650,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              maxWidth: 920,
            }}
          >
            Flight school management software
          </div>
          <div
            style={{
              color: "rgba(255,255,255,0.78)",
              fontSize: 28,
              lineHeight: 1.35,
              maxWidth: 820,
            }}
          >
            Schedule, bill, maintain, and run your school on web and native iOS
            & Android. From $20/mo per aircraft.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            color: "rgba(255,255,255,0.65)",
            fontSize: 22,
            fontWeight: 500,
          }}
        >
          aerscheduler.com
        </div>
      </div>
    ),
    { ...size }
  );
}
