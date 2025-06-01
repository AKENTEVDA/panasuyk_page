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
