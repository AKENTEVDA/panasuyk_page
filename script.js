document.addEventListener("DOMContentLoaded", function () {
  const firstSection = document.querySelector(".first-main");
  const secondSection = document.querySelector(".beauty");
  let firstSectionHeight = firstSection.offsetHeight;

  function updateAnimation() {
    const scrollY = window.scrollY;
    const progress = Math.min(scrollY / (firstSectionHeight * 0.6), 1);

    firstSection.style.setProperty("--fade-opacity", progress);

    if (scrollY > firstSectionHeight * 0.7) {
      secondSection.style.opacity = "1";
    } else {
      secondSection.style.opacity = "0";
    }
  }

  function handleScroll() {
    requestAnimationFrame(updateAnimation);
  }

  window.addEventListener("scroll", handleScroll);
  window.addEventListener("resize", function () {
    firstSectionHeight = firstSection.offsetHeight;
  });

  updateAnimation();
});

document.addEventListener("DOMContentLoaded", function () {
  const showSection = document.querySelector(".show");
  const showImg = document.querySelector(".show__img");
  const manifestSection = document.querySelector(".manifest");
  const manifestPhoto = document.querySelector(".manifest__photo");

  let ticking = false;

  function updateElements() {
    // Получаем позиции секций относительно viewport
    const showRect = showSection.getBoundingClientRect();
    const manifestRect = manifestSection.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    // Расчет видимости секции show (0..1)
    const showVisibility = Math.min(
      Math.max(
        (Math.min(showRect.bottom, viewportHeight) -
          Math.max(showRect.top, 0)) /
          viewportHeight,
        0
      ),
      1
    );

    // Расчет видимости секции manifest (0..1)
    const manifestVisibility = Math.min(
      Math.max(
        (Math.min(manifestRect.bottom, viewportHeight) -
          Math.max(manifestRect.top, 0)) /
          viewportHeight,
        0
      ),
      1
    );

    // Плавное появление show__img (начинаем при 20% видимости секции show)
    showImg.style.opacity = Math.min(
      Math.max((showVisibility - 0.2) / 0.8, 0),
      1
    );

    // Плавное исчезновение manifest__photo (начинаем при 50% видимости секции show)
    if (manifestPhoto) {
      const fadeStart = 0.7; // Начинаем исчезать при 50% видимости show
      const fadeProgress = Math.min(
        Math.max((showVisibility - fadeStart) / (1 - fadeStart), 0),
        1
      );
      manifestPhoto.style.opacity = 1 - fadeProgress;
    }
  }

  function handleScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateElements();
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener("scroll", handleScroll);
  window.addEventListener("resize", updateElements);

  // Инициализация
  updateElements();
});

document.addEventListener("DOMContentLoaded", function () {
  const heroSection = document.querySelector(".hero");
  const heroImg = document.querySelector(".hero__img");
  const heroText = document.querySelector(".hero__content .beauty__text-ru");
  let lastScrollY = window.scrollY;
  let ticking = false;

  function updateOpacity() {
    const rect = heroSection.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const sectionHeight = rect.height;

    const sectionCenter = rect.top + sectionHeight / 2;
    const distanceFromCenter = Math.abs(viewportHeight / 2 - sectionCenter);

    const opacity = 1 - Math.min(distanceFromCenter / (viewportHeight / 2), 1);

    heroImg.style.opacity = opacity;
    heroText.style.opacity = opacity;
  }

  function handleScroll() {
    const currentScrollY = window.scrollY;
    lastScrollY = currentScrollY;

    if (!ticking) {
      window.requestAnimationFrame(function () {
        updateOpacity();
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener("scroll", handleScroll);
  window.addEventListener("resize", updateOpacity);

  updateOpacity();
});

document.addEventListener("DOMContentLoaded", function () {
  const ellipses = document.querySelectorAll(".portfolio__ellipse");

  document.addEventListener("mousemove", function (e) {
    ellipses.forEach((ellipse) => {
      const rect = ellipse.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const distance = Math.sqrt(
        Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
      );
      const maxDistance = Math.sqrt(
        Math.pow(centerX, 2) + Math.pow(centerY, 2)
      );
      const glowIntensity = 1 - distance / maxDistance;

      ellipse.style.setProperty("--glow-opacity", glowIntensity * 0.6);
      ellipse.style.setProperty("--glow-position-x", `${(x - centerX) / 10}px`);
      ellipse.style.setProperty("--glow-position-y", `${(y - centerY) / 10}px`);
    });
  });

  document
    .querySelector(".portfolio__background")
    .addEventListener("mouseleave", function () {
      ellipses.forEach((ellipse) => {
        ellipse.style.setProperty("--glow-opacity", "0");
      });
    });
});

document.addEventListener("DOMContentLoaded", () => {
  const video = document.querySelector(".main__video-mp4");
  const videoSection = document.querySelector(".video-section");
  video.preload = "auto";
  // Настройки для Intersection Observer
  const options = {
    root: null, // Отслеживаем относительно viewport
    rootMargin: "0px",
    threshold: 0.5, // Срабатывает при 50% видимости
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Когда секция видна на 50%
        video
          .play()
          .catch((e) => console.log("Автовоспроизведение заблокировано:", e));
      } else {
        // Когда секция скрыта
        video.pause();
        video.currentTime = 0; // Сбрасываем на начало
      }
    });
  }, options);

  if (videoSection) {
    observer.observe(videoSection);
  }

  video.muted = true;
});

document.addEventListener("DOMContentLoaded", function () {
  const section = document.querySelector(".seeing");
  const img = document.querySelector(".seeing__img");
  const text = document.querySelector(".seeing__inside-title");

  // Настройки анимации (как в Readymag)
  const settings = {
    startPoint: 0.9, // Начинать анимацию при 20% видимости
    endPoint: 1, // Заканчивать при 80% видимости
    imgFrom: 0.4, // Начальная opacity изображения
    imgTo: 1, // Конечная opacity изображения
    textFrom: 0.7, // Начальная opacity текста
    textTo: 0, // Конечная opacity текста
  };

  function getVisibilityRatio(el) {
    const rect = el.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const visibleHeight =
      Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
    return Math.min(1, Math.max(0, visibleHeight / viewportHeight));
  }

  function updateAnimations() {
    const visibility = getVisibilityRatio(section);

    // Рассчитываем прогресс анимации (0-1)
    let progress;
    if (visibility < settings.startPoint) {
      progress = 0;
    } else if (visibility > settings.endPoint) {
      progress = 1;
    } else {
      progress =
        (visibility - settings.startPoint) /
        (settings.endPoint - settings.startPoint);
    }

    // Применяем анимацию с easing-функцией для плавности
    const easedProgress = Math.pow(progress, 1.5); // Нелинейное изменение

    // Анимация изображения
    img.style.opacity = (
      settings.imgFrom +
      (settings.imgTo - settings.imgFrom) * easedProgress
    ).toFixed(3);

    // Анимация текста
    text.style.opacity = (
      settings.textFrom +
      (settings.textTo - settings.textFrom) * easedProgress
    ).toFixed(3);
  }

  // Оптимизированный обработчик скролла
  let ticking = false;
  window.addEventListener("scroll", function () {
    if (!ticking) {
      requestAnimationFrame(function () {
        updateAnimations();
        ticking = false;
      });
      ticking = true;
    }
  });

  window.addEventListener("resize", updateAnimations);
  updateAnimations(); // Инициализация
});
