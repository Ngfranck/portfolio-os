import { ImageResponse } from "next/og";

export const alt = "Folio Franck - UX/UI, Web and Brand Designer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          display: "flex",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          backgroundColor: "#0e0e0e",
          color: "#ffffff",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            display: "flex",
            top: -45,
            right: -85,
            width: 500,
            height: 500,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 35,
              width: 360,
              height: 360,
              backgroundColor: "#ffffff",
              borderTopLeftRadius: "100% 100%",
              borderTopRightRadius: 0,
              borderBottomRightRadius: "100% 65%",
              borderBottomLeftRadius: "100% 35%",
              transform: "rotate(12deg)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 95,
              right: -20,
              width: 250,
              height: 190,
              backgroundColor: "#0e0e0e",
              borderBottomLeftRadius: "100%",
              borderBottomRightRadius: "100%",
            }}
          />
        </div>

        <div
          style={{
            position: "absolute",
            display: "flex",
            right: -55,
            bottom: -180,
            width: 430,
            height: 430,
            border: "95px solid #ffffff",
            borderRadius: "50%",
          }}
        />
        <div
          style={{
            position: "absolute",
            display: "flex",
            right: 215,
            bottom: -105,
            width: 110,
            height: 300,
            backgroundColor: "#ffffff",
            borderTopLeftRadius: 90,
            borderTopRightRadius: 90,
          }}
        />

        <div
          style={{
            position: "absolute",
            left: 105,
            bottom: 105,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              fontSize: 62,
              lineHeight: 1,
              fontWeight: 600,
              letterSpacing: -4,
            }}
          >
            <span>Folio Franck</span>
            <span
              style={{
                marginLeft: 3,
                color: "#e30613",
                fontSize: 65,
              }}
            >
              .
            </span>
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 18,
              color: "#f5f5f5",
              fontSize: 30,
              lineHeight: 1.1,
              fontWeight: 300,
              letterSpacing: -1.2,
            }}
          >
            UX/UI, Web &amp; Brand Designer
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}