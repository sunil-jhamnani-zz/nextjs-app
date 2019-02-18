import { API_KEY, IMAGE_API_URL } from '../constants';
const getPixabayApiUrl = () => {
  const parameters = {
    key: API_KEY,
    image_type: 'photo',
    min_height: "250",
    per_page: 200,
    page: 1
  }

  let contructImageUrl = IMAGE_API_URL;
  Object.keys(parameters).forEach(key => {
    contructImageUrl += key + '=' + parameters[key] + '&';
  });

  return contructImageUrl;
};

export default getPixabayApiUrl;