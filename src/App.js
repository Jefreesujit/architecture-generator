import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import "./App.css";

function App() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState("Wall with a photo frame");
  const configuration = new Configuration({
    apiKey: process.env.ARCHGEN_OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  const generateImage = async () => {
    setPlaceholder(`Search "${prompt}"..`);
    setLoading(true);
    const res = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "512x512",
    });
    setLoading(false);
    setResult(res.data.data[0].url);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">ArchGen</h1>
      </header>
      <div className="app-main">
        <div className="app-section">
          <h2 className="app-section-title">Generate an Image using OpenAI API</h2>
          <input
            type="text"
            id="prompt-input"
            className="app-input"
            placeholder={placeholder}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button className="app-button" onClick={generateImage}>Generate an Image</button>
          <div class="result-section">
            {loading && (
              <div className="loader">
              </div>
            )}
            {result.length > 0 ? (
              <img className="app-result-image" src={result} alt="result" />
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
