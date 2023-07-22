import axios from 'axios';

const apiKey = '38391360-90abe6777395014beef704742';
const baseURL = 'https://pixabay.com/api/';

export const fetchImages = async (query, page) => {
  try {
    const response = await axios.get(baseURL, {
      params: {
        key: apiKey,
        q: query,
        image_type: 'photo',
        per_page: 10,
        page,
      },
    });

    return response.data.hits;
  } catch (error) {
    throw new Error('Помилка при отриманні зображень');
  }
};
