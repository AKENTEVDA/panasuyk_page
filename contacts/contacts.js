document.addEventListener("DOMContentLoaded", function () {
  const menuButton = document.querySelector(".wrapper-menu");
  const menuModal = document.querySelector(".menu-modal");
  const menuClose = document.querySelector(".menu-close");
  document
    .querySelector(".menu-container")
    .setAttribute("aria-hidden", "false");

  // Открытие меню
  menuButton.addEventListener("click", function (e) {
    e.preventDefault();
    menuModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden"; // Блокируем скролл
  });

  // Закрытие меню
  menuClose.addEventListener("click", function () {
    menuModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = ""; // Разблокируем скролл
  });

  // Закрытие по клику вне меню
  menuModal.addEventListener("click", function (e) {
    if (e.target === menuModal) {
      menuModal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }
  });

  // Закрытие по ESC
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
