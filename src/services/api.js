import axios from 'axios';

const KEY = '29675773-14c39cfbd09e94e65f3c5c74b';

const fetchImages = async (query, page) => {
  try {
    const response = await axios.get(
      `https://pixabay.com/api/?q=${query}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
    );

    return response.data;
  } catch (error) {}
};

export default fetchImages;
