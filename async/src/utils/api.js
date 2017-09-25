const BASE_URL = process.env.REACT_APP_BACKEND;

export default function fetchCategories() {
  const url = `${BASE_URL}/categories`;
  console.log('fetching from url', url);
  return fetch(url, {
    headers: { 'Authorization': 'Kenji' },
  }).then((res) => {
    return (res.text());
  });
}