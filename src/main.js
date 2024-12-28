import { fetchImages } from "./js/pixabay-api.js";
import { renderGallery, clearGallery, showLoader, hideLoader, showError, showWarning } from "./js/render-function.js";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
let lightbox;

searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const query = searchInput.value.trim();
  if (!query) {
    showError("Search field cannot be empty!");
    return;
  }

  clearGallery();
  showLoader();

  try {
    const data = await fetchImages(query);

    if (data.hits.length === 0) {
      showWarning("Sorry, there are no images matching your search query. Please try again!");
      return;
    }

    renderGallery(data.hits);

    if (lightbox) {
      lightbox.refresh();
    } else {
      lightbox = new SimpleLightbox(".gallery a");
    }
  } catch (error) {
    showError("Something went wrong. Please try again later.");
  } finally {
    hideLoader();
  }
});