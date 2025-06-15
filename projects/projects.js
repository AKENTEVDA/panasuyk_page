document.addEventListener("DOMContentLoaded", function () {
  const menuButton = document.querySelector(".wrapper-menu");
  const menuModal = document.querySelector(".menu-modal");
  const menuClose = document.querySelector(".menu-close");
  document
    .querySelector(".menu-container")
    .setAttribute("aria-hidden", "false");

  menuButton.addEventListener("click", function (e) {
    e.preventDefault();
    menuModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  });

  menuClose.addEventListener("click", function () {
    menuModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  });

  menuModal.addEventListener("click", function (e) {
    if (e.target === menuModal) {
      menuModal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }
  });

  document.addEventListener("keydown", function (e) {
    if (
      e.key === "Escape" &&
      menuModal.getAttribute("aria-hidden") === "false"
    ) {
      menuModal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll(".artDecor__img");
  const modal = document.querySelector(".artDecor-modal");
  const modalContent = document.querySelector(".artDecor-modal__content");
  const modalImg = document.querySelector(".artDecor-modal__img");
  const modalClose = document.querySelector(".artDecor-modal__close");

  images.forEach((img) => {
    img.addEventListener("click", function (e) {
      e.stopPropagation();
      modal.style.display = "block";
      modalImg.src = this.src;
      modalImg.alt = this.alt;
      document.body.style.overflow = "hidden";
    });
  });

  modalClose.addEventListener("click", function (e) {
    e.stopPropagation();
    closeModal();
  });

  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.style.display === "block") {
      closeModal();
    }
  });

  function closeModal() {
    modal.classList.add("hidden");
    setTimeout(() => {
      modal.style.display = "none";
      modal.classList.remove("hidden");
      document.body.style.overflow = "";
    }, 300);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const wrapper = document.querySelector(".twinPeaks__wrapper");
  const images = document.querySelectorAll(".twinPeaks__img");
  const leftArrow = document.querySelector(".twinPeaks__icon-left");
  const rightArrow = document.querySelector(".twinPeaks__icon-right");
  let currentIndex = 0;

  updateSlider();

  function updateSlider() {
    images.forEach((img, index) => {
      img.style.opacity = index === currentIndex ? "1" : "0";
      img.style.zIndex = index === currentIndex ? "2" : "1";
      img.style.transform = "translateX(0)";
    });
  }

  function slide(direction) {
    images[currentIndex].style.opacity = "0";
    images[currentIndex].style.zIndex = "1";

    if (direction === "right") {
      currentIndex = (currentIndex + 1) % images.length;
      images[currentIndex].style.transform = "translateX(100%)";
    } else {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      images[currentIndex].style.transform = "translateX(-100%)";
    }

    images[currentIndex].style.opacity = "1";
    images[currentIndex].style.zIndex = "2";

    setTimeout(() => {
      images[currentIndex].style.transform = "translateX(0)";
    }, 10);
  }

  rightArrow.addEventListener("click", () => {
    slide("right");
  });

  leftArrow.addEventListener("click", () => {
    slide("left");
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") slide("right");
    if (e.key === "ArrowLeft") slide("left");
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const plusIcon = document.querySelector(".kidIt-icon");
  const textBlock = document.querySelector(".kidIt__text");

  plusIcon.addEventListener("click", function () {
    textBlock.classList.toggle("visible");
    plusIcon.classList.toggle("rotated");

    event.stopPropagation();
  });

  document.addEventListener("click", function () {
    if (textBlock.classList.contains("visible")) {
      textBlock.classList.remove("visible");
      plusIcon.classList.remove("rotated");
    }
  });

  textBlock.addEventListener("click", function (event) {
    event.stopPropagation();
  });
});
