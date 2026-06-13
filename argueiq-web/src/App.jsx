import { useState } from "react";
import axios from "axios";

function App() {
  const [argument, setArgument] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeArgument = async () => {
    if (!argument.trim()) return;
    setLoading(true);
    setResponse(null);
    try {
      const res = await axios.post("https://argueiq-backend.onrender.com/analyze", {
        argument: argument,
      });
      setResponse(res.data.result);
    } catch (error) {
      setResponse("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  const parseResponse = (text) => {
    if (!text) return null;
    const sections = [
      { key: "LOGICAL WEAKNESS", emoji: "⚡", color: "#ff4444" },
      { key: "STRONGEST COUNTER", emoji: "🛡️", color: "#4488ff" },
      { key: "BEST COMEBACK", emoji: "🔥", color: "#ff8800" },
      { key: "PSYCHOLOGICAL STRATEGY", emoji: "🧠", color: "#aa44ff" },
      { key: "CONFIDENCE SCORE", emoji: "💯", color: "#00cc88" },
    ];

    return sections.map((section) => {
      const regex = new RegExp(`${section.key}:?([\\s\\S]*?)(?=${sections.map(s => s.key).join("|")}|$)`);
      const match = text.match(regex);
      const content = match ? match[1].trim() : "";
      return { ...section, content };
    });
  };

  const parsed = parseResponse(response);

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0a0a0a 0%, #1a0505 50%, #0a0a1a 100%)",
      color: "white",
      fontFamily: "'Segoe UI', sans-serif",
      padding: "20px"
    }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", padding: "50px 0 40px" }}>
          <div style={{ fontSize: "3rem", marginBottom: "10px" }}>⚔️</div>
          <h1 style={{
            fontSize: "3.5rem",
            fontWeight: "900",
            background: "linear-gradient(90deg, #ff4444, #ffaa00, #ff4444)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            margin: "0",
            letterSpacing: "-1px"
          }}>ArgueIQ</h1>
          <p style={{ color: "#aaa", fontSize: "1.2rem", marginTop: "8px", fontStyle: "italic" }}>
            Never Lose An Argument Again
          </p>
          <div style={{ marginTop: "12px", display: "flex", justifyContent: "center", gap: "8px", flexWrap: "wrap" }}>
            {["English", "Hindi", "Telugu", "Tamil", "Kannada", "Malayalam"].map(lang => (
              <span key={lang} style={{
                background: "#1a1a1a",
                border: "1px solid #333",
                borderRadius: "20px",
                padding: "4px 12px",
                fontSize: "0.75rem",
                color: "#888"
              }}>{lang}</span>
            ))}
          </div>
        </div>

        {/* Input */}
        <div style={{
          background: "#111",
          border: "2px solid #222",
          borderRadius: "16px",
          padding: "20px",
          marginBottom: "16px"
        }}>
          <p style={{ color: "#666", fontSize: "0.85rem", marginBottom: "10px", margin: "0 0 10px" }}>
            👤 What did your opponent say?
          </p>
          <textarea
            value={argument}
            onChange={(e) => setArgument(e.target.value)}
            placeholder="Type in any language — English, Hindi, Telugu, Tamil, Kannada, Malayalam..."
            style={{
              width: "100%",
              minHeight: "100px",
              background: "transparent",
              border: "none",
              color: "white",
              fontSize: "1rem",
              resize: "vertical",
              outline: "none",
              boxSizing: "border-box",
              fontFamily: "inherit"
            }}
          />
        </div>

        {/* Button */}
        <button
          onClick={analyzeArgument}
          disabled={loading}
          style={{
            width: "100%",
            padding: "18px",
            background: loading
              ? "#222"
              : "linear-gradient(90deg, #ff4444, #ff8800, #ffaa00)",
            border: "none",
            borderRadius: "12px",
            color: "white",
            fontSize: "1.1rem",
            fontWeight: "800",
            cursor: loading ? "not-allowed" : "pointer",
            marginBottom: "30px",
            letterSpacing: "1px",
            transition: "all 0.3s ease"
          }}
        >
          {loading ? "⚔️ Analyzing your argument..." : "⚔️ DESTROY THIS ARGUMENT"}
        </button>

        {/* Results */}
        {parsed && (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {parsed.map((section, i) => (
              section.content && (
                <div key={i} style={{
                  background: "#111",
                  border: `1px solid ${section.color}33`,
                  borderLeft: `4px solid ${section.color}`,
                  borderRadius: "12px",
                  padding: "20px",
                  animation: "fadeIn 0.5s ease"
                }}>
                  <div style={{
                    color: section.color,
                    fontWeight: "700",
                    fontSize: "0.85rem",
                    letterSpacing: "1px",
                    marginBottom: "8px"
                  }}>
                    {section.emoji} {section.key}
                  </div>
                  <div style={{ color: "#ddd", lineHeight: "1.7", fontSize: "0.95rem" }}>
                    {section.content}
                  </div>
                </div>
              )
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default App;