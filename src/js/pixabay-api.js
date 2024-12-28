export async function fetchImages(query) {
  const API_KEY = "47906037-2c0a065ebc1b1a12e8c8fed40";
  const BASE_URL = "https://pixabay.com/api/";

  const response = await fetch(
    `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch images.");
  }

  return response.json();
}