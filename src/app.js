const images = [
  "../assets/(1).jpg",
  "../assets/(2).jpg",
  "../assets/(3).jpg",
  "../assets/(4).jpg",
  "../assets/(5).jpg",
  "../assets/(6).jpg",
  "../assets/(7).jpg",
  "../assets/(8).jpg",
  "../assets/(9).jpg",
  "../assets/(11).jpg",
  "../assets/(12).jpg",
  "../assets/(13).jpg",
  "../assets/(14).jpg",
  "../assets/(15).jpg",
  "../assets/(16).jpg",
];

const main = document.querySelector("main");
const modal = document.querySelector(".modal");
const modalImage = document.querySelector(".modal img");
const closeBtn = document.querySelector(".modal #closeBtn");
const nextArrow = modal.querySelector("#next");
const prevArrow = modal.querySelector("#prev");

let CURRENT_IMAGE = 0;

// // EVENT LISTENERS
main.addEventListener("click", HANDLERS_MODULE.mainElementHandler);
closeBtn.addEventListener("click", UTILS_MODULE.closeModal);
nextArrow.addEventListener("click", HANDLERS_MODULE.nextArrowHandler);
prevArrow.addEventListener("click", HANDLERS_MODULE.prevArrowHandler);
addEventListener("DOMContentLoaded", HANDLERS_MODULE.loadHandler);
