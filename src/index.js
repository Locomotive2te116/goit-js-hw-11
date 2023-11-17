import { createGalleryCards } from "./js/gallery-cards.js";
import { getPhotos} from "./js/data-methods.js";
import Notiflix from 'notiflix';

const form = document.querySelector('.search-form');
const galleryBox = document.querySelector('.gallery');
const input = document.querySelector('input');
const loadMoreButton = document.querySelector('.load-more');
let userInput;
let page = 1;
let totalAmountOfPhoto = 0;
let arrOfPhotos = [];

async function getData(userInput, page) {
         try {              
             const response = await getPhotos(userInput, page);
             totalAmountOfPhoto = response.totalHits;
             arrOfPhotos = response.hits;
       
    galleryBox.insertAdjacentHTML('beforeend', createGalleryCards(arrOfPhotos));
  } catch (error) {
      console.log(error);
      Notiflix.Notify.info(`❌ Oops! ${error}`);
  }
}
   

form.addEventListener('submit', async(event) => {
    event.preventDefault();
    page = 1;
    galleryBox.innerHTML = '';
    userInput = input.value;
   await getData(userInput, page)

    if (arrOfPhotos.length === 0) {
        Notiflix.Notify.info(`Sorry, there are no images matching your search query. Please try again.`);
      loadMoreButton.classList.add('is-hidden');
    } else { 
        Notiflix.Notify.success(`Hooray! We found ${totalAmountOfPhoto} images.`);
        loadMoreButton.classList.remove('is-hidden');
    }
   
});
  
loadMoreButton.addEventListener('click', async () => {
   page += 1;
  console.log(page);
  await getData(userInput, page);
  if (arrOfPhotos.length === 0) {
    Notiflix.Notify.info(`We're sorry, but you've reached the end of search results.`);
    loadMoreButton.classList.add('is-hidden');
  }
    
});
