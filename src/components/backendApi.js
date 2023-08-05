import axios from 'axios';

const API_KEY = '38391360-90abe6777395014beef704742';

axios.defaults.baseURL = 'https://pixabay.com/api/';
axios.defaults.params = {
  per_page: 12,
  image_type: 'photo',
  key: API_KEY,
  lang: 'en',
  safesearch: true,
  orientation: 'horizontal',
};

export const fetchImage = async (query, page) => {
  const { data } = await axios.get(`?q=${query}&page=${page}`);
  return data;
};