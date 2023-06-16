const images = [
  "../assets/(1).jpg",
  "../assets/(2).jpg",
  "../assets/(3).jpg",
  "../assets/(4).jpg",
  "../assets/(5).jpg",
  "../assets/(6).jpg",
  // "./assets/(7).jpg",
  // "./assets/(8).jpg",
  // "./assets/(9).jpg",
  // "./assets/(10).jpg",
];

const main = document.querySelector("main");
const modal = document.querySelector(".modal");
const modalImage = document.querySelector(".modal img");
const closeBtn = document.querySelector(".modal #closeBtn");
const nextArrow = modal.querySelector("#next");
const prevArrow = modal.querySelector("#prev");

let CURRENT_IMAGE = 0;

// UTILS
const UTILS_MODULE = (() => {
  const disableNextBtn = () => nextArrow.setAttribute("disabled", "true");
  const enableNextBtn = () => nextArrow.removeAttribute("disabled");

  const disablePrevBtn = () => prevArrow.setAttribute("disabled", "true");
  const enablePrevBtn = () => prevArrow.removeAttribute("disabled");

  const enableDisableBtnsOnModalOpen = () => {
    CURRENT_IMAGE === images.length - 1 ? disableNextBtn() : enableNextBtn();

    CURRENT_IMAGE === 0 ? disablePrevBtn() : enablePrevBtn();
  };

  const showImageInWindow = (src) => {
    enableDisableBtnsOnModalOpen();

    modalImage.src = src;
    modal.classList.add("active");
    modal.setAttribute("tabIndex", 1);
    modal.focus();

    modal.addEventListener("keydown", (e) => {
      if (e.code === "Escape") {
        closeModal();
      }
    });
  };

  const addKeyPressToSection = (section) => {
    section.addEventListener("keypress", (e) => {
      (e.code === "Enter" || e.code === "space") &&
        showImageInWindow(e.target.firstElementChild.src);

      CURRENT_IMAGE = parseInt(e.target.dataset.index);
      enableDisableBtnsOnModalOpen();
    });
  };

  const createSection = (img, index) => {
    const section = document.createElement("section");
    section.setAttribute("data-index", index);
    section.tabIndex = index === 0 ? 0 : -1;
    section.innerHTML = `
    <img data-index="${index}" src="${img}" alt="${img}">
    `;

    addKeyPressToSection(section);

    return section;
  };

  const attachImages = () => {
    images.forEach((image, index) => {
      const section = createSection(image, index);
      main.append(section);
    });
  };

  const setNegativeTabIndex = (sections) => {
    sections.forEach((section) => {
      section.tabIndex = -1;
    });
  };

  const rovingTabIndex = () => {
    const sections = main.querySelectorAll(`section[tabindex]`);
    main.addEventListener("keydown", (e) => {
      if (e.code === "Tab") {
        setNegativeTabIndex(sections);

        if (CURRENT_IMAGE < images.length - 1) {
          CURRENT_IMAGE++;
        } else {
          CURRENT_IMAGE = 0;
        }

        sections[CURRENT_IMAGE].tabIndex = 0;
        sections[CURRENT_IMAGE].focus();
        e.preventDefault();
      }
    });
  };

  return { rovingTabIndex, attachImages };
})();

// EVENT HANDLERS
const HANDLERS_MODULE = (() => {
  const nextArrowHandler = () => {
    if (CURRENT_IMAGE < images.length - 1) {
      CURRENT_IMAGE++;
      modalImage.src = images[CURRENT_IMAGE];

      prevArrow.getAttribute("disabled") && enablePrevBtn();
    }

    CURRENT_IMAGE >= images.length - 1 && disableNextBtn();
  };

  const prevArrowHandler = () => {
    if (CURRENT_IMAGE >= 1) {
      CURRENT_IMAGE -= 1;
      modalImage.src = images[CURRENT_IMAGE];

      nextArrow.getAttribute("disabled") &&
        nextArrow.removeAttribute("disabled");
    }

    CURRENT_IMAGE < 1 && prevArrow.setAttribute("disabled", true);
  };

  const mainElementHandler = (e) => {
    if (e.target.localName === "img") {
      CURRENT_IMAGE = parseInt(e.target.dataset.index);
      showImageInWindow(e.target.src);
    }
  };

  const loadHandler = () => {
    UTILS_MODULE.attachImages();
    UTILS_MODULE.rovingTabIndex();
  };

  const closeModal = () => {
    modal.classList.remove("active");
  };

  return {
    nextArrowHandler,
    prevArrowHandler,
    mainElementHandler,
    loadHandler,
    closeModal,
  };
})();

// // EVENT LISTENERS
main.addEventListener("click", HANDLERS_MODULE.mainElementHandler);
closeBtn.addEventListener("click", HANDLERS_MODULE.closeModal);
nextArrow.addEventListener("click", HANDLERS_MODULE.nextArrowHandler);
prevArrow.addEventListener("click", HANDLERS_MODULE.prevArrowHandler);
addEventListener("DOMContentLoaded", HANDLERS_MODULE.loadHandler);
