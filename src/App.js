import React, { useState } from "react";
import "./App.css";
import { getGeneratedImages } from "./dalle2Service";

function App() {
  const [prompt, setPrompt] = useState("");
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const options = {
      numImages: 3,
      size: 1024,
      topK: 20,
      temperature: 0.5,
    };

    const result = await getGeneratedImages(prompt, options);

    setImages(result);
    setLoading(false);
  };

  const handleRegenerate = async (index) => {
    const options = {
      numImages: 1,
      size: 1024,
      topK: 20,
      temperature: 0.5,
    };

    const result = await getGeneratedImages(prompt, options);
    const newImages = [...images];
    newImages[index] = result[0];
    setImages(newImages);
  };

  const handleEnhance = async (index) => {
    setLoading(true);

    const options = {
      size: 1024,
      factor: 2,
    };

    const result = await upscaleEnhance(images[index], options);
    const newImages = [...images];
    newImages[index] = result;
    setImages(newImages);

    setLoading(false);
  };

  const handleImageClick = (index) => {
    setSelectedImage(index);
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label>
          Enter prompt:
          <input type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? "Generating..." : "Generate Images"}
        </button>
      </form>

      <div className="images-container">
        {images.map((image, index) => (
          <div
            key={index}
            className={`image-item ${index === selectedImage ? "selected" : ""}`}
            onClick={() => handleImageClick(index)}
          >
            <img src={`data:image/jpeg;base64,${image}`} alt={`Generated image ${index}`} />
            <div className="actions">
              <button onClick={() => handleRegenerate(index)}>Regenerate</button>
              <button onClick={() => handleEnhance(index)}>Enhance</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
