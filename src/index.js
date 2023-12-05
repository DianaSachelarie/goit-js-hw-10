import axios from "axios";

const API_KEY =
  "live_w7M8XZsQ8qgiGBxHUkD6egohzkNr4fPWDsGORGtYgzfZTa5RTfV8NKqmy7JXh67X";
axios.defaults.headers.common["x-api-key"] = API_KEY;

function fetchBreeds() {
  const BREEDS_URL = "https://api.thecatapi.com/v1/breeds";

  return axios.get(`${BREEDS_URL}`).then((response) => {
    return response.data;
  });
}

function fetchCatByBreed(breedId) {
  const SEARCH_URL = "https://api.thecatapi.com/v1/images/search";

  return axios.get(`${SEARCH_URL}?breed_ids=${breedId}`).then((response) => {
    return response.data;
  });
}

export { fetchBreeds, fetchCatByBreed };

import "./css/style.css";

import SlimSelect from "slim-select";
import "slim-select/dist/slimselect.css";

import Notiflix from "notiflix";

const selectBreed = document.querySelector(".breed-select");
const catPicture = document.querySelector(".cat-picture");
const catDescription = document.querySelector(".cat-description");
const catInformation = document.querySelector(".cat-info");
const loaderElement = document.querySelector(".loader");

selectBreed.addEventListener("change", changeCatBreed);

fetchAndSelectBreeds();

function changeCatBreed(event) {
  loaderElement.classList.remove("hidden");
  catDescription.innerHTML = "";
  catPicture.innerHTML = "";

  const breedId = event.target.value;
  console.log("breedId: ".breedId);
  fetchCatByBreed(breedId)
    .then((breed) => renderBreedDescription(breed))
    .catch((error) => {
      console.log(error);
      Notiflix.Notify.failure(
        "Oops! Something went wrong! Try reloading the page!"
      );
    })
    .finally(() => {
      loaderElement.classList.add("hidden");

      selectBreed.classList.remove("hidden");
    });
}

function markupBreedsSelect(breeds) {
  const optionMarkup = breeds
    .map((breed) => {
      return `<option value="${breed.id}">${breed.name}</option>`;
    })
    .join("");
  selectBreed.insertAdjacentElement("beforeend", optionMarkup);

  new SlimSelect({
    select: "#selectElement",
  });
}

function renderBreedDescription(breed) {
  console.log(breed);
  const pictureMarkup = `<img src="${breed[0].url}" alt="${breed.name}">`;
  const descriptionMarkup = `<h2>${breed[0].breeds[0].name}</h2>
    <p class="">${breed[0].breeds[0].description}</p>`;

  catPicture.innerHTML = pictureMarkup;
  catDescription.innerHTML = descriptionMarkup;
}
