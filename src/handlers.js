// EVENT HANDLERS
const HANDLERS_MODULE = (() => {
  const nextArrowHandler = () => {
    if (CURRENT_IMAGE < images.length - 1) {
      CURRENT_IMAGE++;
      modalImage.src = images[CURRENT_IMAGE];

      prevArrow.getAttribute("disabled") && UTILS_MODULE.enablePrevBtn();
    }

    CURRENT_IMAGE >= images.length - 1 && UTILS_MODULE.disableNextBtn();
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
      UTILS_MODULE.showImageInWindow(e.target.src);
    }
  };

  const loadHandler = () => {
    UTILS_MODULE.attachImages();
    UTILS_MODULE.rovingTabIndex();
  };

  return {
    nextArrowHandler,
    prevArrowHandler,
    mainElementHandler,
    loadHandler,
  };
})();
