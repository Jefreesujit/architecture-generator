import { generateImages } from "dalle2";

async function getGeneratedImages(prompt, options = {}) {
  const { numImages = 1, size = 512, topK = 0, temperature = 0.8 } = options;
  const result = await generateImages(prompt, { numImages, size, topK, temperature });
  return result;
}

export { getGeneratedImages };