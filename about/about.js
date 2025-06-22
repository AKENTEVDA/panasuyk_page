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

document.addEventListener("click", function (e) {
  // Проверяем, была ли нажата кнопка переключения языка
  if (e.target.classList.contains("bio__btn-en")) {
    const container = e.target.closest(".bio__wrapper-main__text");
    if (!container) return;

    const textRuElements = container.querySelectorAll(".text-ru");
    const textEnElements = container.querySelectorAll(".text-en");
    const btn = e.target;

    if (btn.textContent === "en") {
      // Переключаем на английский
      textRuElements.forEach((el) => el.classList.add("hidden"));
      textEnElements.forEach((el) => el.classList.remove("hidden"));
      btn.textContent = "ru";
    } else {
      // Переключаем на русский
      textRuElements.forEach((el) => el.classList.remove("hidden"));
      textEnElements.forEach((el) => el.classList.add("hidden"));
      btn.textContent = "en";
    }
  }
});

const bioImg = document.querySelector(".bio__wrapper-main__img");

window.addEventListener("scroll", () => {
  const rect = bioImg.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  if (rect.top < windowHeight && rect.bottom > 0) {
    // вычисляем прогресс скрытия/появления
    const halfHeight = rect.height / 2;
    const imgCenter = rect.top + halfHeight;

    let progress;
    if (imgCenter <= windowHeight / 2) {
      // Скролл вниз — от 0.7 до 0
      progress = 1 - Math.max(0, Math.min(1, imgCenter / (windowHeight / 2)));
      bioImg.style.opacity = 0.7 * (1 - progress);
    } else {
      // Скролл вверх — от 0 до 0.7
      progress = Math.max(
        0,
        Math.min(1, (windowHeight - rect.top) / (windowHeight / 2))
      );
      bioImg.style.opacity = 0.7 * progress;
    }
  }
});

window.addEventListener("scroll", () => {
  const bioImg = document.querySelector(".bio__wrapper-tool__wrapper-img");
  const rect = bioImg.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  if (rect.top < windowHeight && rect.bottom > 0) {
    // вычисляем прогресс скрытия/появления
    const halfHeight = rect.height / 2;
    const imgCenter = rect.top + halfHeight;

    let progress;
    if (imgCenter <= windowHeight / 2) {
      // Скролл вниз — от 0.7 до 0
      progress = 1 - Math.max(0, Math.min(1, imgCenter / (windowHeight / 2)));
      bioImg.style.opacity = 1 * (1 - progress);
    } else {
      // Скролл вверх — от 0 до 0.7
      progress = Math.max(
        0,
        Math.min(1, (windowHeight - rect.top) / (windowHeight / 2))
      );
      bioImg.style.opacity = 1 * progress;
    }
  }
});

window.addEventListener("scroll", () => {
  const bioImg = document.querySelector(".bio__wrapper-deep__img");
  const rect = bioImg.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  if (rect.top < windowHeight && rect.bottom > 0) {
    // вычисляем прогресс скрытия/появления
    const halfHeight = rect.height / 2;
    const imgCenter = rect.top + halfHeight;

    let progress;
    if (imgCenter <= windowHeight / 2) {
      // Скролл вниз — от 0.7 до 0
      progress = 1 - Math.max(0, Math.min(1, imgCenter / (windowHeight / 2)));
      bioImg.style.opacity = 1 * (1 - progress);
    } else {
      // Скролл вверх — от 0 до 0.7
      progress = Math.max(
        0,
        Math.min(1, (windowHeight - rect.top) / (windowHeight / 2))
      );
      bioImg.style.opacity = 1 * progress;
    }
  }
});
