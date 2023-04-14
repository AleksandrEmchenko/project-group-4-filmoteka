import filmApiService from "./js/requests";
import axios from "axios";

const a = new filmApiService();

const refs = {
  btnSubmit: document.querySelector('#search-form'),
  inputSearch: document.querySelector('input'),
}

refs.btnSubmit.addEventListener('submit', hendleSubmit);

page = 1;
query = '';
total_results = null;
total_pages = null;

function hendleSubmit(event) {
  event.preventDefault();
  page = 1;
  query = refs.inputSearch.value.trim();
  
  a.getSearchKeyword(page, query, total_results, total_pages)
    .then((film) => {
      console.log(film)
    });
};