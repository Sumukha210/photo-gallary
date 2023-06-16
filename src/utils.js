// UTILS
const UTILS_MODULE = (() => {
  const closeModal = () => {
    modal.classList.remove("active");
  };

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

  return {
    rovingTabIndex,
    attachImages,
    enableNextBtn,
    disableNextBtn,
    showImageInWindow,
    closeModal,
  };
})();
