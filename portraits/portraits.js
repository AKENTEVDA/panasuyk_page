document.addEventListener("DOMContentLoaded", () => {
  const secondPortrait = document.querySelector(
    ".first-section__second_portrait"
  );
  const startWidth = secondPortrait.clientWidth; // Начальная ширина
  const endWidth = startWidth + 100; // Конечная ширина

  // Функция для обновления ширины при скролле
  function updateWidthOnScroll() {
    const scrollPosition = window.scrollY;
    const triggerOffset = 200; // На каком скролле начинать анимацию
    const maxScroll = 500; // На каком скролле завершить анимацию

    // Если скролл в пределах диапазона
    if (scrollPosition > triggerOffset && scrollPosition < maxScroll) {
      const scrollProgress =
        (scrollPosition - triggerOffset) / (maxScroll - triggerOffset);
      const currentWidth =
        startWidth + (endWidth - startWidth) * scrollProgress;
      secondPortrait.style.width = `${currentWidth}px`;
    }
    // Если скролл меньше триггера — сброс к начальной ширине
    else if (scrollPosition <= triggerOffset) {
      secondPortrait.style.width = `${startWidth}px`;
    }
    // Если скролл больше максимума — финальная ширина
    else if (scrollPosition >= maxScroll) {
      secondPortrait.style.width = `${endWidth}px`;
    }
  }

  // Слушаем скролл
  window.addEventListener("scroll", updateWidthOnScroll);
});

document.addEventListener("DOMContentLoaded", () => {
  const secondPortrait = document.querySelector(
    ".first-section__second_portrait"
  );
  const nakedWomenSection = document.querySelector(".naked-women");

  // Настройки для более плавного эффекта
  const fadeStart = 0.1; // Начинаем бледнение, когда 10% секции видно
  const fadeEnd = 0.4; // Полностью исчезает, когда 40% секции видно
  const minOpacity = 0; // Минимальная прозрачность (чтобы не исчезал полностью)

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const ratio = entry.intersectionRatio;

        // Плавный расчет прозрачности
        let opacity;
        if (ratio < fadeStart) {
          opacity = 1; // Полностью видим
        } else if (ratio > fadeEnd) {
          opacity = minOpacity; // Минимальная видимость
        } else {
          // Плавное изменение между fadeStart и fadeEnd
          opacity =
            1 -
            ((ratio - fadeStart) / (fadeEnd - fadeStart)) * (1 - minOpacity);
        }

        secondPortrait.style.opacity = opacity;
      });
    },
    {
      threshold: Array.from({ length: 20 }, (_, i) => i * 0.05), // 20 точек отслеживания
    }
  );

  observer.observe(nakedWomenSection);
});

document.addEventListener("DOMContentLoaded", () => {
  const icon = document.querySelector(".naked-women__icon");
  const hiddenImg = document.querySelector(".naked-women__hidden-img");
  let isImageVisible = false;

  // Клик по иконке
  icon.addEventListener("click", (e) => {
    e.stopPropagation(); // Предотвращаем всплытие, чтобы не сработал document.click сразу
    toggleImage();
  });

  // Клик в любом месте страницы
  document.addEventListener("click", () => {
    if (isImageVisible) {
      hideImage();
    }
  });

  // Функции для управления видимостью
  function toggleImage() {
    if (isImageVisible) {
      hideImage();
    } else {
      showImage();
    }
  }

  function showImage() {
    hiddenImg.style.display = "block";
    isImageVisible = true;
  }

  function hideImage() {
    hiddenImg.style.display = "none";
    isImageVisible = false;
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const main_img = document.querySelector(".naked-women__main-img");
  const coupleInLoveSection = document.querySelector(".coupleInLove");

  // Настройки для более плавного эффекта
  const fadeStart = 0.1; // Начинаем бледнение, когда 10% секции видно
  const fadeEnd = 0.4; // Полностью исчезает, когда 40% секции видно
  const minOpacity = 0; // Минимальная прозрачность (чтобы не исчезал полностью)

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const ratio = entry.intersectionRatio;

        // Плавный расчет прозрачности
        let opacity;
        if (ratio < fadeStart) {
          opacity = 1; // Полностью видим
        } else if (ratio > fadeEnd) {
          opacity = minOpacity; // Минимальная видимость
        } else {
          // Плавное изменение между fadeStart и fadeEnd
          opacity =
            1 -
            ((ratio - fadeStart) / (fadeEnd - fadeStart)) * (1 - minOpacity);
        }

        main_img.style.opacity = opacity;
      });
    },
    {
      threshold: Array.from({ length: 20 }, (_, i) => i * 0.05), // 20 точек отслеживания
    }
  );

  observer.observe(coupleInLoveSection);
});

document.addEventListener("DOMContentLoaded", () => {
  const img2 = document.querySelector(".coupleInLove__img-2");
  const wrapper = document.querySelector(".coupleInLove__wrapper");
  const section = document.querySelector(".coupleInLove");

  let lastScrollPosition = window.scrollY;
  let isScrollingDown = true;

  // Получаем максимальное смещение
  const getMaxMargin = () => {
    const wrapperHeight = wrapper.clientHeight;
    const imgHeight = img2.clientHeight;
    return wrapperHeight - imgHeight;
  };

  let maxMargin = getMaxMargin();

  window.addEventListener("resize", () => {
    maxMargin = getMaxMargin();
  });

  // Определяем направление скролла
  window.addEventListener("scroll", () => {
    const currentScroll = window.scrollY;
    isScrollingDown = currentScroll > lastScrollPosition;
    lastScrollPosition = currentScroll;
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const ratio = entry.intersectionRatio;
        const sectionRect = section.getBoundingClientRect();
        const isSectionVisible =
          sectionRect.top < window.innerHeight && sectionRect.bottom > 0;

        if (isSectionVisible) {
          if (isScrollingDown) {
            // Фиксируем внизу при скролле вниз
            img2.style.marginTop = `${maxMargin}px`;
          } else {
            // Фиксируем вверху при скролле вверх
            img2.style.marginTop = "0px";
          }
        } else {
          // Плавная анимация при входе/выходе из секции
          const scrollProgress = Math.min(Math.max((ratio - 0.2) / 0.6, 0), 1);
          const margin = scrollProgress * maxMargin;
          img2.style.marginTop = `${margin}px`;
        }
      });
    },
    {
      threshold: Array.from({ length: 20 }, (_, i) => i * 0.05),
      rootMargin: "0px 0px -100px 0px", // Небольшой отступ для плавности
    }
  );

  observer.observe(section);
});

document.addEventListener("DOMContentLoaded", () => {
  const main_img = document.querySelector(".photo-cards__main-img");
  const wrapper = document.querySelector(".portraitsPhoto-cards__wrapper");

  // Настройки для более плавного эффекта
  const fadeStart = 0.1; // Начинаем бледнение, когда 10% секции видно
  const fadeEnd = 0.4; // Полностью исчезает, когда 40% секции видно
  const minOpacity = 0; // Минимальная прозрачность (чтобы не исчезал полностью)

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const ratio = entry.intersectionRatio;

        // Плавный расчет прозрачности
        let opacity;
        if (ratio < fadeStart) {
          opacity = 1; // Полностью видим
        } else if (ratio > fadeEnd) {
          opacity = minOpacity; // Минимальная видимость
        } else {
          // Плавное изменение между fadeStart и fadeEnd
          opacity =
            1 -
            ((ratio - fadeStart) / (fadeEnd - fadeStart)) * (1 - minOpacity);
        }

        main_img.style.opacity = opacity;
      });
    },
    {
      threshold: Array.from({ length: 20 }, (_, i) => i * 0.05), // 20 точек отслеживания
    }
  );

  observer.observe(wrapper);
});

document.addEventListener("DOMContentLoaded", function () {
  const icons = document.querySelectorAll(".portraitsPhoto-cards__icon");

  icons.forEach((icon) => {
    icon.addEventListener("click", function (e) {
      e.stopPropagation();
      const card = this.closest(".portraitsPhoto-cards__card");
      const hiddenImg = card.querySelector(
        ".portraitsPhoto-cards__card-img-hidden"
      );

      // Закрываем все открытые изображения
      document
        .querySelectorAll(".portraitsPhoto-cards__card-img-hidden")
        .forEach((img) => {
          if (img !== hiddenImg) {
            img.style.opacity = "0";
            setTimeout(() => {
              img.style.display = "none";
            }, 300); // Длительность анимации
          }
        });

      // Переключаем текущее изображение
      if (hiddenImg.style.display === "block") {
        hiddenImg.style.opacity = "0";
        setTimeout(() => {
          hiddenImg.style.display = "none";
        }, 300);
      } else {
        hiddenImg.style.display = "block";
        setTimeout(() => {
          hiddenImg.style.opacity = "1";
        }, 10);
      }
    });
  });

  document.addEventListener("click", function () {
    document
      .querySelectorAll(".portraitsPhoto-cards__card-img-hidden")
      .forEach((img) => {
        img.style.opacity = "0";
        setTimeout(() => {
          img.style.display = "none";
        }, 300);
      });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const icons = document.querySelectorAll(
    ".portraitsPhoto-cards__icon-reverse"
  );

  icons.forEach((icon) => {
    icon.addEventListener("click", function (e) {
      e.stopPropagation();
      const card = this.closest(".portraitsPhoto-cards__card");
      const hiddenImg = card.querySelector(
        ".portraitsPhoto-cards__card-img-hidden"
      );

      // Закрываем все открытые изображения
      document
        .querySelectorAll(".portraitsPhoto-cards__card-img-hidden")
        .forEach((img) => {
          if (img !== hiddenImg) {
            img.style.opacity = "0";
            setTimeout(() => {
              img.style.display = "none";
            }, 300); // Длительность анимации
          }
        });

      // Переключаем текущее изображение
      if (hiddenImg.style.display === "block") {
        hiddenImg.style.opacity = "0";
        setTimeout(() => {
          hiddenImg.style.display = "none";
        }, 300);
      } else {
        hiddenImg.style.display = "block";
        setTimeout(() => {
          hiddenImg.style.opacity = "1";
        }, 10);
      }
    });
  });

  document.addEventListener("click", function () {
    document
      .querySelectorAll(".portraitsPhoto-cards__card-img-hidden")
      .forEach((img) => {
        img.style.opacity = "0";
        setTimeout(() => {
          img.style.display = "none";
        }, 300);
      });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const icon = document.querySelector(".portraitsPhoto-cards__icon-fourth");
  const hiddenImg = document.querySelector(
    ".portraitsPhoto-cards__card-img-hiddenFourth"
  );
  let isVisible = false;

  function showImage() {
    hiddenImg.style.display = "block";
    setTimeout(() => {
      hiddenImg.style.opacity = "1";
      isVisible = true;
    }, 10);
  }

  function hideImage() {
    hiddenImg.style.opacity = "0";
    setTimeout(() => {
      hiddenImg.style.display = "none";
      isVisible = false;
    }, 300);
  }

  icon.addEventListener("click", function (e) {
    e.stopPropagation();
    isVisible ? hideImage() : showImage();
  });

  document.addEventListener("click", function () {
    if (isVisible) {
      hideImage();
    }
  });

  hiddenImg.addEventListener("click", function (e) {
    e.stopPropagation();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && isVisible) {
      hideImage();
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const targetImg = document.querySelector(".secondBlockPhoto__bay-img-2");
  const section = document.querySelector(".secondBlockPhoto");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const visibilityRatio = entry.intersectionRatio;

        const scale = 0.7 + visibilityRatio * 0.3;

        targetImg.style.transform = `scale(${scale})`;
      });
    },
    {
      threshold: Array.from({ length: 20 }, (_, i) => i * 0.05),
      rootMargin: "0px 0px -100px 0px",
    }
  );

  observer.observe(section);
});

document.addEventListener("DOMContentLoaded", () => {
  const main_img = document.querySelector(".secondBlockPhoto__bay-img");
  const wrapper = document.querySelector(".secondBlockPhoto__wrapper-antohaMC");

  const fadeStart = 0.3;
  const fadeEnd = 0.6;
  const minOpacity = 0;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const ratio = entry.intersectionRatio;

        let opacity;
        if (ratio < fadeStart) {
          opacity = 1;
        } else if (ratio > fadeEnd) {
          opacity = minOpacity;
        } else {
          opacity =
            1 -
            ((ratio - fadeStart) / (fadeEnd - fadeStart)) * (1 - minOpacity);
        }

        main_img.style.opacity = opacity;
      });
    },
    {
      threshold: Array.from({ length: 20 }, (_, i) => i * 0.05),
    }
  );

  observer.observe(wrapper);
});

document.addEventListener("DOMContentLoaded", () => {
  const icons = document.querySelectorAll(".moscowPeople__icon");

  icons.forEach((icon) => {
    icon.addEventListener("click", function () {
      // Находим родительский блок
      const leftWrapper = this.closest(".moscowPeople__wrapper-ironMan-left");

      // Находим изображения в этом блоке
      const img1 = leftWrapper.querySelector(".moscowPeople__ironMan-img-1");
      const img3 = leftWrapper.querySelector(".moscowPeople__ironMan-img-3");

      // Переключаем видимость
      if (img1.style.opacity !== "0") {
        // Плавное исчезновение img1 и появление img3
        img1.style.opacity = "0";
        img1.style.transition = "opacity 0.5s ease";

        setTimeout(() => {
          img1.style.display = "none";
          img3.style.display = "block";
          img3.style.opacity = "0";

          setTimeout(() => {
            img3.style.opacity = "1";
            img3.style.transition = "opacity 0.5s ease";
          }, 10);
        }, 500); // Должно совпадать с длительностью анимации
      } else {
        // Обратное переключение
        img3.style.opacity = "0";
        img3.style.transition = "opacity 0.5s ease";

        setTimeout(() => {
          img3.style.display = "none";
          img1.style.display = "block";
          img1.style.opacity = "0";

          setTimeout(() => {
            img1.style.opacity = "1";
            img1.style.transition = "opacity 0.5s ease";
          }, 10);
        }, 500);
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const ironManWrapper = document.querySelector(
    ".moscowPeople__wrapper-ironMan"
  );
  const moscowSection = document.querySelector(
    ".moscowPeople__wrapper-ironMan-left"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const opacity = 0.2 + entry.intersectionRatio * 0.8;
        ironManWrapper.style.opacity = opacity;
      });
    },
    {
      threshold: Array.from({ length: 20 }, (_, i) => i * 0.05),
      rootMargin: "0px 0px -100px 0px",
    }
  );

  observer.observe(moscowSection);
});

document.addEventListener("DOMContentLoaded", () => {
  const img1 = document.querySelector(".setInForest__wrapper-river-img-1");
  const riverSection = document.querySelector(".setInForest__wrapper-river");
  let lastScrollPosition = window.scrollY;
  let isScrollingDown = true;

  window.addEventListener("scroll", () => {
    const currentScroll = window.scrollY;
    isScrollingDown = currentScroll > lastScrollPosition;
    lastScrollPosition = currentScroll;
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const ratio = entry.intersectionRatio;

        if (isScrollingDown) {
          // При скролле вниз: 0.75 → 1
          const scale = 0.75 + ratio * 0.25;
          img1.style.transform = `scale(${scale})`;
        } else {
          // При скролле вверх: 1 → 0.75
          const scale = 1 - (1 - ratio) * 0.25;
          img1.style.transform = `scale(${scale})`;
        }
      });
    },
    {
      threshold: Array.from({ length: 20 }, (_, i) => i * 0.05),
      rootMargin: "0px 0px -100px 0px",
    }
  );

  observer.observe(riverSection);
});

document.addEventListener("DOMContentLoaded", () => {
  const img1 = document.querySelector(".studio__wrapper-girl-tights-img-left");
  const riverSection = document.querySelector(".studio__wrapper-girl-tights");
  let lastScrollPosition = window.scrollY;
  let isScrollingDown = true;

  window.addEventListener("scroll", () => {
    const currentScroll = window.scrollY;
    isScrollingDown = currentScroll > lastScrollPosition;
    lastScrollPosition = currentScroll;
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const ratio = entry.intersectionRatio;

        if (isScrollingDown) {
          // При скролле вниз: 0.75 → 1
          const scale = 0.75 + ratio * 0.25;
          img1.style.transform = `scale(${scale})`;
        } else {
          // При скролле вверх: 1 → 0.75
          const scale = 1 - (1 - ratio) * 0.25;
          img1.style.transform = `scale(${scale})`;
        }
      });
    },
    {
      threshold: Array.from({ length: 20 }, (_, i) => i * 0.05),
      rootMargin: "0px 0px -100px 0px",
    }
  );

  observer.observe(riverSection);
});

document.addEventListener("DOMContentLoaded", () => {
  const secondPortrait = document.querySelector(
    ".studio__wrapper-girl-tights-img-right"
  );
  const nakedWomenSection = document.querySelector(
    ".studio__wrapper-plasticGirl"
  );

  const fadeStart = 0.2;
  const fadeEnd = 0.7;
  const minOpacity = 0;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const ratio = entry.intersectionRatio;

        // Плавный расчет прозрачности
        let opacity;
        if (ratio < fadeStart) {
          opacity = 1; // Полностью видим
        } else if (ratio > fadeEnd) {
          opacity = minOpacity; // Минимальная видимость
        } else {
          // Плавное изменение между fadeStart и fadeEnd
          opacity =
            1 -
            ((ratio - fadeStart) / (fadeEnd - fadeStart)) * (1 - minOpacity);
        }

        secondPortrait.style.opacity = opacity;
      });
    },
    {
      threshold: Array.from({ length: 20 }, (_, i) => i * 0.05), // 20 точек отслеживания
    }
  );

  observer.observe(nakedWomenSection);
});

document.addEventListener("DOMContentLoaded", () => {
  const img1 = document.querySelector(".studio__wrapper-studioTsenev-img-left");
  const riverSection = document.querySelector(".studio__wrapper-studioTsenev");
  let lastScrollPosition = window.scrollY;
  let isScrollingDown = true;

  window.addEventListener("scroll", () => {
    const currentScroll = window.scrollY;
    isScrollingDown = currentScroll > lastScrollPosition;
    lastScrollPosition = currentScroll;
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const ratio = entry.intersectionRatio;

        if (isScrollingDown) {
          // При скролле вниз: 0.75 → 1
          const scale = 0.75 + ratio * 0.25;
          img1.style.transform = `scale(${scale})`;
        } else {
          // При скролле вверх: 1 → 0.75
          const scale = 1 - (1 - ratio) * 0.25;
          img1.style.transform = `scale(${scale})`;
        }
      });
    },
    {
      threshold: Array.from({ length: 20 }, (_, i) => i * 0.05),
      rootMargin: "0px 0px -100px 0px",
    }
  );

  observer.observe(riverSection);
});

document.addEventListener("DOMContentLoaded", () => {
  const img1 = document.querySelector(
    ".studio__wrapper-studioTsenev-img-right"
  );
  const riverSection = document.querySelector(".studio__wrapper-studioTsenev");
  let lastScrollPosition = window.scrollY;
  let isScrollingDown = true;

  window.addEventListener("scroll", () => {
    const currentScroll = window.scrollY;
    isScrollingDown = currentScroll > lastScrollPosition;
    lastScrollPosition = currentScroll;
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const ratio = entry.intersectionRatio;

        if (isScrollingDown) {
          // При скролле вниз: 0.75 → 1
          const scale = 1 - ratio * 0.25;
          img1.style.transform = `scale(${scale})`;
        } else {
          // При скролле вверх: 1 → 0.75
          const scale = 0.75 + (1 - ratio) * 0.25;
          img1.style.transform = `scale(${scale})`;
        }
      });
    },
    {
      threshold: Array.from({ length: 20 }, (_, i) => i * 0.05),
      rootMargin: "0px 0px -100px 0px",
    }
  );

  observer.observe(riverSection);
});

document.addEventListener("DOMContentLoaded", function () {
  const moscowIcon = document.querySelector(".moscowMan__icon");
  const moscowWrapper = document.querySelector(
    ".moscowPeople__wrapper-moscowMan"
  );

  if (moscowIcon && moscowWrapper) {
    moscowIcon.addEventListener("click", function (e) {
      e.stopPropagation();
      const hiddenImgs = moscowWrapper.querySelectorAll(
        ".moscowPeople__moscowMan-img_hidden"
      );

      hiddenImgs.forEach((img) => {
        if (img.style.display === "block") {
          img.style.opacity = "0";
          setTimeout(() => {
            img.style.display = "none";
          }, 300);
        } else {
          img.style.display = "block";
          setTimeout(() => {
            img.style.opacity = "1";
          }, 10);
        }
      });
    });

    document.addEventListener("click", function () {
      const hiddenImgs = document.querySelectorAll(
        ".moscowPeople__moscowMan-img_hidden"
      );
      hiddenImgs.forEach((img) => {
        img.style.opacity = "0";
        setTimeout(() => {
          img.style.display = "none";
        }, 300);
      });
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const moscowIcon = document.querySelector(".tsenevRiver__icon");
  const moscowWrapper = document.querySelector(".setInForest__wrapper-river");

  if (moscowIcon && moscowWrapper) {
    moscowIcon.addEventListener("click", function (e) {
      e.stopPropagation();
      const hiddenImgs = moscowWrapper.querySelectorAll(
        ".moscowPeople__moscowMan-img_hidden"
      );

      hiddenImgs.forEach((img) => {
        if (img.style.display === "block") {
          img.style.opacity = "0";
          setTimeout(() => {
            img.style.display = "none";
          }, 300);
        } else {
          img.style.display = "block";
          setTimeout(() => {
            img.style.opacity = "1";
          }, 10);
        }
      });
    });

    document.addEventListener("click", function () {
      const hiddenImgs = document.querySelectorAll(
        ".moscowPeople__moscowMan-img_hidden"
      );
      hiddenImgs.forEach((img) => {
        img.style.opacity = "0";
        setTimeout(() => {
          img.style.display = "none";
        }, 300);
      });
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const moscowIcon = document.querySelector(".forestWomen__icon");
  const moscowWrapper = document.querySelector(".setInForest__wrapper-forest");

  if (moscowIcon && moscowWrapper) {
    moscowIcon.addEventListener("click", function (e) {
      e.stopPropagation();
      const hiddenImgs = moscowWrapper.querySelectorAll(
        ".moscowPeople__moscowMan-img_hidden"
      );

      hiddenImgs.forEach((img) => {
        if (img.style.display === "block") {
          img.style.opacity = "0";
          setTimeout(() => {
            img.style.display = "none";
          }, 300);
        } else {
          img.style.display = "block";
          setTimeout(() => {
            img.style.opacity = "1";
          }, 10);
        }
      });
    });

    document.addEventListener("click", function () {
      const hiddenImgs = document.querySelectorAll(
        ".moscowPeople__moscowMan-img_hidden"
      );
      hiddenImgs.forEach((img) => {
        img.style.opacity = "0";
        setTimeout(() => {
          img.style.display = "none";
        }, 300);
      });
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const girlTightsIcon = document.querySelector(".girl-tights__icon");
  const girlTightsWrapper = document.querySelector(
    ".studio__wrapper-girl-tights"
  );
  const plus = document.querySelector(".girl-tights__icon");
  if (girlTightsIcon && girlTightsWrapper) {
    girlTightsIcon.addEventListener("click", function (e) {
      e.stopPropagation();
      const hiddenImg = girlTightsWrapper.querySelector(
        ".studio__wrapper-girl-tights-img-left"
      );

      // Проверяем текущее состояние через getComputedStyle
      const currentDisplay = window.getComputedStyle(hiddenImg).display;

      if (currentDisplay === "block") {
        hiddenImg.style.opacity = "0";
        setTimeout(() => {
          hiddenImg.style.display = "none";
          plus.style.right = "initial";
          plus.style.left = "15%";
        }, 300);
      } else {
        hiddenImg.style.display = "block";
        setTimeout(() => {
          hiddenImg.style.opacity = "1";
          plus.style.left = "initial";
          plus.style.right = "15%";
        }, 10);
      }
    });

    document.addEventListener("click", function () {
      const hiddenImgs = document.querySelectorAll(
        ".studio__wrapper-girl-tights-img-left"
      );
      hiddenImgs.forEach((img) => {
        if (window.getComputedStyle(img).display === "block") {
          img.style.opacity = "0";
          setTimeout(() => {
            img.style.display = "none";
          }, 300);
        }
      });
    });
  }
});
