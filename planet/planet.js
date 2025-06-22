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
  const smallImg = document.querySelector(
    ".dagestan__first-wrapper__img-little"
  );
  const wrapper = document.querySelector(".dagestan__first-wrapper");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // Рассчитываем прогресс видимости от 0 до 1
        const visibilityRatio = entry.intersectionRatio;

        // Анимация начинается при 20% видимости и заканчивается при 60%
        const startAnimationAt = 0.2;
        const endAnimationAt = 0.6;

        if (visibilityRatio >= startAnimationAt) {
          // Нормализуем прогресс между startAnimationAt и endAnimationAt
          const progress = Math.min(
            (visibilityRatio - startAnimationAt) /
              (endAnimationAt - startAnimationAt),
            1
          );

          // Вычисляем новую высоту (от 30vw до 60vw)
          const newHeight = 25 + 25 * progress;
          smallImg.style.height = `${newHeight}vw`;
        } else {
          // Возвращаем исходную высоту, если видимость меньше startAnimationAt
          smallImg.style.height = "30vw";
        }
      });
    },
    {
      threshold: Array.from({ length: 20 }, (_, i) => i * 0.05), // 20 точек отслеживания
      rootMargin: "0px 0px -100px 0px", // Небольшой отступ для плавности
    }
  );

  observer.observe(wrapper);
  smallImg.style.alignSelf = "end";
});

document.addEventListener("DOMContentLoaded", () => {
  const img = document.querySelector(".dagestan__women-wrapper__img-main");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          img.classList.add("animated");
        } else {
          img.classList.remove("animated");
        }
      });
    },
    {
      threshold: 0.3,
    }
  );

  observer.observe(img);
});

const img = document.querySelector(".dagestan__hourse-block__img");
const block = document.querySelector(".dagestan__hourse-block");

window.addEventListener("scroll", () => {
  const rect = block.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  // Если блок в пределах видимой области
  if (rect.top < windowHeight && rect.bottom > 0) {
    // Вычисляем прогресс скролла блока (0 - начало блока внизу экрана, 1 - блок вверху экрана)
    const scrollProgress = 1 - rect.top / windowHeight;

    // Ограничиваем прогресс от 0 до 1
    const clampedProgress = Math.max(0, Math.min(1, scrollProgress));

    // Вычисляем трансформацию: масштаб от 1 до 2, смещение влево (от 0 до -50px например)
    const scale = 1 + clampedProgress; // 1 → 2
    const translateX = -50 * clampedProgress; // 0 → -50px

    img.style.transform = `translateX(${translateX}px) scale(${scale})`;
  }
});

const firstImg = document.querySelector(".laCoruna__first-wrapper__img");
const rightImg = document.querySelector(".laCoruna__img-right");
const downImg = document.querySelector(".laCoruna__img-down");

window.addEventListener("scroll", () => {
  const windowHeight = window.innerHeight;

  const firstRect = firstImg.getBoundingClientRect();
  const rightRect = rightImg.getBoundingClientRect();
  const downRect = downImg.getBoundingClientRect();

  // 1️⃣ Изменение ширины для first и right image
  const firstVisible = Math.min(
    1,
    Math.max(0, (windowHeight - firstRect.top) / (windowHeight * 0.7))
  );
  const rightVisible = Math.min(
    1,
    Math.max(0, (windowHeight - rightRect.top) / (windowHeight * 0.7))
  );

  if (firstRect.top < windowHeight && firstRect.bottom > 0) {
    // first: от 40vw до 50vw
    const firstWidth = 40 + 10 * firstVisible;
    firstImg.style.width = `${firstWidth}vw`;
  }

  if (rightRect.top < windowHeight && rightRect.bottom > 0) {
    // right: от 35vw до 25vw
    const rightWidth = 35 - 10 * rightVisible;
    rightImg.style.width = `${rightWidth}vw`;
  }

  // 2️⃣ opacity для down image
  const downVisible = Math.min(
    1,
    Math.max(0, (windowHeight - downRect.top) / (windowHeight * 0.9))
  );

  if (downRect.top < windowHeight && downRect.bottom > 0) {
    let opacity = 0.5 + 0.7 * downVisible;
    downImg.style.opacity = opacity;
  }

  // исчезание при скролле дальше вниз
  if (downRect.top < 0 && downRect.bottom < windowHeight) {
    const hideProgress = Math.min(1, Math.max(0, -downRect.top / windowHeight));
    downImg.style.opacity = 1 - hideProgress;
  }

  // исчезание при скролле дальше вверх
  if (downRect.bottom > windowHeight && downRect.top > 0) {
    const hideProgress = Math.min(
      1,
      Math.max(0, (downRect.bottom - windowHeight) / windowHeight)
    );
    downImg.style.opacity = 1 - hideProgress;
  }
});

const mainImg = document.querySelector(".madrid__main-img");

window.addEventListener("scroll", () => {
  const rect = mainImg.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  if (rect.top < windowHeight && rect.bottom > 0) {
    const visibleStart = windowHeight * 0.95;
    const visibleEnd = windowHeight * 0.3;

    let progress = (visibleStart - rect.top) / (visibleStart - visibleEnd);
    progress = Math.max(0, Math.min(1, progress));

    mainImg.style.opacity = 0.3 + 0.7 * progress;
  }
});

const istanbulImg = document.querySelector(".istanbul__img");

window.addEventListener("scroll", () => {
  const rect = istanbulImg.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  if (rect.top < windowHeight && rect.bottom > 0) {
    // вычисляем прогресс видимости (0 при 30%, 1 при 100%)
    const visibleStart = windowHeight * 0.7;
    const visibleEnd = 0;

    let progress = (visibleStart - rect.top) / (visibleStart - visibleEnd);
    progress = Math.max(0, Math.min(1, progress));

    // top: от 28vw до 48vw
    const topVW = 28 + 20 * progress;
    istanbulImg.style.top = `${topVW}vw`;

    // scale: от 1 до 1.3
    const scale = 1 + 0.3 * progress;
    istanbulImg.style.transform = `scale(${scale})`;
  }
});

const lisbonScaleImg = document.querySelector(".lisbon__main-img-scale");

window.addEventListener("scroll", () => {
  const rect = lisbonScaleImg.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  if (rect.top < windowHeight && rect.bottom > 0) {
    // Рассчитываем прогресс скролла
    const progress = 1 - rect.top / windowHeight;
    const clampedProgress = Math.max(0, Math.min(1, progress));

    // Масштаб: от 1 до 1.2
    const scale = 1 + 0.15 * clampedProgress;
    lisbonScaleImg.style.transform = `scale(${scale})`;
  }
});

window.addEventListener("scroll", () => {
  const mainImg = document.querySelector(".porto__main-img");
  const rect = mainImg.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  if (rect.top < windowHeight && rect.bottom > 0) {
    const visibleStart = windowHeight * 0.95;
    const visibleEnd = windowHeight * 0.3;

    let progress = (visibleStart - rect.top) / (visibleStart - visibleEnd);
    progress = Math.max(0, Math.min(1, progress));

    mainImg.style.opacity = 0.3 + 0.7 * progress;
  }
});
