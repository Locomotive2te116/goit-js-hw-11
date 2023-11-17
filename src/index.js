import { createGalleryCards } from "./gallery-cards.js";
import { getPhotos} from "./data-methods.js";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.search-form');
const galleryBox = document.querySelector('.gallery');
const input = document.querySelector('input');
const loadMoreButton = document.querySelector('.load-more');
let page = 1;

async function getData(userInput, page) {
         try {              
             const arrOfPhotos = await getPhotos(userInput, page);
        if (arrOfPhotos.length === 0) {
     Notify.failure(`❌ Oops! take it easy on turns, the entered value is not a valid`);
      return;
    }     
    galleryBox.insertAdjacentHTML('beforeend', createGalleryCards(arrOfPhotos));
  } catch (error) {
      console.log(error);
      Notify.failure(`❌ Oops! ${error}`);
  }
}
   

form.addEventListener('submit', (event) => {
    event.preventDefault();
    page = 1;
    galleryBox.innerHTML = '';
    userInput = input.value;
    getData(userInput, page)
   
});
  
loadMoreButton.addEventListener('click', async () => {
    page += 1;
    getData(userInput, page)
    
});
