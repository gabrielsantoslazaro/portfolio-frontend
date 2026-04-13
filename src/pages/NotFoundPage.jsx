import Seo from "../components/Seo";

export default function NotFoundPage() {
  return (
    <>
      <Seo
        title="404: Looks like you're lost"
        description="The page you are looking for could not be found on Gabriel Lazaro's portfolio website."
        path="/404"
      />
      <div
        style={{
          position: "fixed",
          inset: 0,
          display: "grid",
          placeItems: "center",
          padding: "20px",
          overflow: "hidden"
        }}
      >
        <div
          style={{
            width: "min(520px, 100%)",
            border: "1px solid #e5e5e5",
            background: "#fff",
            padding: "32px 28px",
            color: "#111",
            boxSizing: "border-box",
            textAlign: "center"
          }}
        >
          <p style={{ margin: "0 0 10px", fontSize: "14px", fontWeight: 700, letterSpacing: "0.08em" }}>404</p>
          <h1 style={{ margin: "0 0 12px", fontSize: "32px", lineHeight: 1.1 }}>Page not found</h1>
          <p style={{ margin: 0, fontSize: "15px", lineHeight: 1.7 }}>
            404: Looks like you're lost.
          </p>
        </div>
      </div>
    </>
  );
}
