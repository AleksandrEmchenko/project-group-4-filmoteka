import filmApiService from "./js/requests";
import axios from "axios";

const a = new filmApiService();

const refs = {
  btnSubmit: document.querySelector('#search-form'),
}

refs.btnSubmit.addEventListener('submit', hendleSubmit);

function hendleSubmit(event) {
event.preventDefault();
  
    
  a.getTrendingMovie()
    .then((film) => {
      console.log(film)
    })
  
  console.log(response.data);
}