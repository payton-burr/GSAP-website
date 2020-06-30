let controller;
let slideScene;

function animateSlides() {
  controller = new ScrollMagic.Controller();

  const sliders = document.querySelectorAll('.slide');

  const nav = document.querySelector('nav-header');

  sliders.forEach((slide) => {
    const revealImage = slide.querySelector('.reveal-img');
    const img = slide.querySelector('img');
    const revealText = slide.querySelector('.reveal-text');

    const slideTl = gsap.timeline({ defaults: { duration: 1, ease: 'power2.inOut' } });

    slideTl.fromTo(revealImage, { x: '0%' }, { x: '100%' });
    slideTl.fromTo(img, { scale: 2 }, { scale: 1 });
  });
}

animateSlides();
