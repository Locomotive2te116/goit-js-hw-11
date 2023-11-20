import { createGalleryCards } from "./js/gallery-cards.js";
import { getPhotos} from "./js/api.js";
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const form = document.querySelector('.search-form');
const galleryBox = document.querySelector('.gallery');
const input = document.querySelector('input');
const loadMoreButton = document.querySelector('.load-more');
let userInput;
let page = 1;
let per_page = 40;
let totalAmountOfPhoto = 0;
let arrOfPhotos = [];
let lastPage;
async function getData(userInput, page, per_page) {
         try {              
             const response = await getPhotos(userInput, page, per_page);
             totalAmountOfPhoto = response.totalHits;
             arrOfPhotos = response.hits;
       
           galleryBox.insertAdjacentHTML('beforeend', createGalleryCards(arrOfPhotos));
           const lightbox = new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: 250, });
           lastPage = totalAmountOfPhoto / per_page;
           
           if (lastPage === page ) {
               Notiflix.Notify.info(`We're sorry, but that all of search results.`);
                loadMoreButton.classList.add('is-hidden');
           }
  } catch (error) {
      console.log(error);
      Notiflix.Notify.info(`❌ Oops! ${error}`);
  }
}
   

form.addEventListener('submit', async (event) => {
 
    event.preventDefault();
    page = 1;
    galleryBox.innerHTML = '';
  userInput = input.value.trim();
  if (!userInput) { 
    Notiflix.Notify.failure('Sorry, you need to insert the text.')
    loadMoreButton.classList.add('is-hidden');
    return;
  }
  
  await getData(userInput, page, per_page);
  

    if (arrOfPhotos.length === 0 ) {
        Notiflix.Notify.info(`Sorry, there are no images matching your search query. Please try again.`);
      loadMoreButton.classList.add('is-hidden');
    }
     if (arrOfPhotos.length < per_page) {
       // Notiflix.Notify.info(`We're sorry, but that all of search results.`);
       Notiflix.Notify.success(`Hooray! We found ${totalAmountOfPhoto} images.`);
    loadMoreButton.classList.add('is-hidden');
  }
     else { 
        Notiflix.Notify.success(`Hooray! We found ${totalAmountOfPhoto} images.`);
        loadMoreButton.classList.remove('is-hidden');
  }
 
   
});
  
loadMoreButton.addEventListener('click', async () => {
  
   page += 1;
  console.log(page);
  await getData(userInput, page, per_page);

  const { height: cardHeight } = document.querySelector(".gallery").firstElementChild.getBoundingClientRect();
window.scrollBy({
  top: cardHeight * 2,
  behavior: "smooth",
});
  if (arrOfPhotos.length === 0) {
    Notiflix.Notify.info(`We're sorry, but you've reached the end of search results.`);
    loadMoreButton.classList.add('is-hidden');
  }
   if (arrOfPhotos.length < per_page && arrOfPhotos.length > 0) {
    Notiflix.Notify.info(`We're sorry, but that all of search results.`);
    loadMoreButton.classList.add('is-hidden');
  }
  if (lastPage === page ) {
               Notiflix.Notify.info(`We're sorry, but that all of search results.`);
    loadMoreButton.classList.add('is-hidden');
    return;
           }
  
    
});
