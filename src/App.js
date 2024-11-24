import { useState } from 'react';
import Select from 'react-select';
import { Configuration, OpenAIApi } from 'openai';
import { OPTIONS } from './constants';
import "./App.css";

function App() {
  const [prompt, setPrompt] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState("3D design of a living room interior");
  const [size, setSize] = useState("256x256");
  const [n, setN] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const configuration = new Configuration({
    apiKey: process.env.ARCHGEN_OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  const generateImages = async () => {
    setPlaceholder(`"${prompt}"..`);
    setLoading(true);
    const res = await openai.createImage({
      prompt: prompt,
      n: n,
      size: size,
    });
    setLoading(false);
    setResults(res.data.data.map((item) => item.url));
  };

  const handleOptionChange = (options) => {
    setSelectedOptions(options);
    setPrompt(options.map((option) => option.label).join(', '));
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">ArchGen</h1>
      </header>
      <div className="app-main">
        <div className="app-section">
          <h2 className="app-section-title">Generate Images</h2>
          <div className="app-dropdown-section-container">
            <div className="app-dropdown-section">
              <label htmlFor="size-dropdown" className="app-dropdown-label">Size:</label>
              <select id="size-dropdown" className="app-dropdown" value={size} onChange={(e) => setSize(e.target.value)}>
                <option value="256x256">256x256</option>
                <option value="512x512">512x512</option>
                <option value="1024x1024">1024x1024</option>
              </select>
            </div>
            <div className="app-dropdown-section">
              <label htmlFor="n-dropdown" className="app-dropdown-label">No of Variations:</label>
              <select id="n-dropdown" className="app-dropdown" value={n} onChange={(e) => setN(parseInt(e.target.value))}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>
          </div>
          <Select
            options={OPTIONS}
            isMulti
            className="app-autocomplete"
            onChange={handleOptionChange}
            placeholder="Pick keywords"
          />
          {/* <input
            type="text"
            id="prompt-input"
            className="app-input"
            placeholder={placeholder}
            onChange={(e) => setPrompt(e.target.value)}
          /> */}
          <button className="app-button" onClick={generateImages}>Generate Images</button>
          <div className="result-section">
            {loading ? (
              <div className="spinner-overlay">
                <div className="image-spinner">
                  <div className="image-spinner-dot"></div>
                  <div className="image-spinner-dot"></div>
                  <div className="image-spinner-dot"></div>
                </div>
              </div>
            ) : (
              results.map((result, index) => (
                <img
                  key={index}
                  className="app-result-image"
                  src={result}
                  alt={`result-${index}`}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
