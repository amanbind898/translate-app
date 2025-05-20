const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;
const API_HOST = import.meta.env.VITE_API_HOST;

export async function translateText(text, source, target) {
  const url = `${API_URL}?from=${source}&to=${target}&query=${encodeURIComponent(text)}`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-rapidapi-host': API_HOST,
      'x-rapidapi-key': API_KEY,
    },
    body: JSON.stringify({ translate: 'rapidapi' }),
  });

  if (!response.ok) {
    throw new Error('API Error');
  }
  const data = await response.json();
  console.log(data.translation);
  return data.translation;
}
