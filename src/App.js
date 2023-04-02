import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import "./App.css";

function App() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState("Wall with a photo frame");
  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  const generateImage = async () => {
    setPlaceholder(`Search ${prompt}..`);
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
    <div className="app-main">
      {loading ? (
        <div className="app-loading">
          <div className="app-loading-spinner"></div>
        </div>
      ) : (
        <>
          <h2 className="app-heading">Generate an Image using OpenAI API</h2>
          <textarea
            className="app-input"
            placeholder={placeholder}
            onChange={(e) => setPrompt(e.target.value)}
            rows="10"
            cols="40"
          />
          <button className="app-button" onClick={generateImage}>
            Generate an Image
          </button>
          {result.length > 0 ? (
            <img className="app-result-image" src={result} alt="result" />
          ) : (
            <></>
          )}
        </>
      )}
    </div>
  );
}

export default App;
