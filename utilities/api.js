import axios from 'axios';

const API_KEY = 'O7gGsXkWC45redFL7BIsrk5iLrCEqqHw';

export const fetchArticles = async (period) => {
  try {
    const response = await axios.get(`https://api.nytimes.com/svc/mostpopular/v2/viewed/${period}.json?api-key=${API_KEY}`);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
};