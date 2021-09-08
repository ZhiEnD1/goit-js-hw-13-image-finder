import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api/?image_type=photo&orientation=horizontal';

export async function fetchImg(query, page) {
  const {
    data: { hits },
  } = await axios.get(
    `&q=${query}&page=${page}&per_page=12&key=23296398-0247e55c374e57d8d5373c484`,
  );
  return hits;
}
