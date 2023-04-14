import axios from 'axios';
export default class filmApiService {
  #BASE_URL = 'https://api.themoviedb.org/3';
  #API_KEY = '351363cde76d5d5ccd40418b50fed610';

              
  async getTrendingMovie(page = 1, timeWindow = 'week') {
   
    const trendUrl = `${this.#BASE_URL}/trending/movie/${timeWindow}?api_key=${this.#API_KEY}&page=${page}`;
    const response = await axios.get(trendUrl);
    
    return response.data;
  }
  

  async getSearchKeyword(language, query, page, include_adult, region, year, primary_release_year) {
  
    try {
      const searchUrl = `${this.#BASE_URL}/search/movie?api_key=${this.#API_KEY}&language=en-US&query=${query}&page=1&include_adult=false}`;
      const response = await axios.get(searchUrl);
      
      return await response.data;
    } 
    catch (err) {
        throw new Error(err.message);
    };  
  };
};



  async getTrendingMovie(page=1, timeWindow='week') {
    const trendUrl = `${this.#BASE_URL}/trending/movie/${timeWindow}?api_key=${this.#API_KEY}&page=${page}`;
    const response = await axios.get(trendUrl);
    return response.data;
  }
}

