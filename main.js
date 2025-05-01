document.addEventListener("DOMContentLoaded", function () {
  const firstSection = document.querySelector(".first-main");
  const secondSection = document.querySelector(".beauty");
  let firstSectionHeight = firstSection.offsetHeight;

  function updateAnimation() {
    const scrollY = window.scrollY;
    const progress = Math.min(scrollY / (firstSectionHeight * 0.6), 1);

    // Управление через CSS-переменную
    firstSection.style.setProperty("--fade-opacity", progress);

    // Управление второй секцией
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

  // Инициализация
  updateAnimation();
});
