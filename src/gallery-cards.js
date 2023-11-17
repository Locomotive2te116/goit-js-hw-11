
export function createGalleryCards(arrOfPhotos) {
    const photos = arrOfPhotos.map(photo => {
        return `
        <div class="photo-card">
        <img src="${photo.webformatURL}" alt="${photo.tags}" loading="lazy" data-bigImg=${photo.largeImageURL}/>
        <div class="info">
          <p class="info-item">
            <b>Likes</b> ${photo.likes}
          </p>
          <p class="info-item">
            <b>Views</b> ${photo.views}
          </p>
          <p class="info-item">
            <b>Comments</b> ${photo.comments}
          </p>
          <p class="info-item">
            <b>Downloads</b> ${photo.downloads}
          </p>
        </div>
      </div>
      `
      })
      .join('');
      return photos;
  };