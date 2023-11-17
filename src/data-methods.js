import axios from "axios";


const BASE_URL = 'https://pixabay.com/api/';
const KEY = '40731401-6e5252c436b733e661401c46c';


export async function getPhotos(userInput, page) {
    const params = new URLSearchParams({
        key: KEY,
        q: userInput,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 3,
        page,
      });
  const response = await axios.get(`${BASE_URL}?${params}`);

  return response.data.hits
};
