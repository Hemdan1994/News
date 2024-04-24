import axios from 'axios';

const API_KEY = 'O7gGsXkWC45redFL7BIsrk5iLrCEqqHw';
const BASE_URL = 'https://api.nytimes.com/svc/mostpopular/v2/emailed/7.json?api-key=';

export const fetchArticlesData = async (term,period) => {
  try {
      const response = await axios.get(
          `https://api.nytimes.com/svc/mostpopular/v2/${term}/${period}.json?api-key=${API_KEY}`
      );
      //console.log(response)
      return response?.data?.results
  } catch (error) {
      return error
  }
};