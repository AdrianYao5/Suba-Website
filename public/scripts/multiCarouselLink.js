const images = document.querySelector("#imageCarousel");
const links = document.querySelector("#linksCarousel");

if (images !== null && links !== null) {
  // Get either the existing Bootstrap Carousel instance or create a new one
  const imageCarousel = bootstrap.Carousel.getOrCreateInstance(images);
  const linksCarousel = bootstrap.Carousel.getOrCreateInstance(links);

  // Grab your radio indicators, the previous and next buttons/arrows
  const indicatorsAll = document.querySelectorAll(".carousel-indicators");
  const prevCarouselBtn = document.querySelector(".carousel-control-prev");
  const nextCarouselBtn = document.querySelector(".carousel-control-next");
  const innerAll = document.querySelectorAll(".carousel-inner");

  // Add event listeners to your indicators, previous and next buttons/arrows
  indicatorsAll.forEach((IndicatorBtn) =>
    IndicatorBtn.addEventListener("click", function (e) {
      let clickedIndicator = e.target.attributes["data-bs-slide-to"].value;
      imageCarousel.to(clickedIndicator);
      linksCarousel.to(clickedIndicator);
    })
  );
  prevCarouselBtn.addEventListener("click", function (e) {
    imageCarousel.prev();
    linksCarousel.prev();
  });
  nextCarouselBtn.addEventListener("click", function (e) {
    imageCarousel.next();
    linksCarousel.next();
  });

  indicatorsAll.forEach((IndicatorBtn) =>
    IndicatorBtn.addEventListener("mouseenter", function (e) {
      imageCarousel.pause();
      linksCarousel.pause();
    })
  );
  indicatorsAll.forEach((IndicatorBtn) =>
    IndicatorBtn.addEventListener("mouseleave", function (e) {
      imageCarousel.cycle();
      linksCarousel.cycle();
    })
  );
  innerAll.forEach((CarouselInner) =>
    CarouselInner.addEventListener("mouseenter", function (e) {
      imageCarousel.pause();
      linksCarousel.pause();
    })
  );
  innerAll.forEach((CarouselInner) =>
    CarouselInner.addEventListener("mouseleave", function (e) {
      imageCarousel.cycle();
      linksCarousel.cycle();
    })
  );
}
