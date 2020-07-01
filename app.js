let controller;
let slideScene;
let pageScene;
let mouse = document.querySelector('.cursor');
let mouseText = mouse.querySelector('span');

function animateSlides() {
  controller = new ScrollMagic.Controller();

  const sliders = document.querySelectorAll('.slide');

  const nav = document.querySelector('.nav-header');

  sliders.forEach((slide, index, slides) => {
    const revealImage = slide.querySelector('.reveal-img');
    const img = slide.querySelector('img');
    const revealText = slide.querySelector('.reveal-text');

    const slideTl = gsap.timeline({ defaults: { duration: 1, ease: 'power2.inOut' } });

    slideTl.fromTo(revealImage, { x: '0%' }, { x: '100%' });
    slideTl.fromTo(img, { scale: 2 }, { scale: 1 }, '-=1');
    slideTl.fromTo(revealText, { x: '0%' }, { x: '100%' }, '-=0.75');
    slideTl.fromTo(nav, { y: '-100%' }, { y: '0%' }, '-=0.5');

    // Scene

    slideScene = new ScrollMagic.Scene({
      triggerElement: slide,
      triggerHook: 0.25,
      reverse: false,
    })
      .setTween(slideTl)
      .addTo(controller);

    // New animation
    const pageTl = gsap.timeline();
    let nextSlide = slides.length - 1 === index ? 'end' : slides[index + 1];
    pageTl.fromTo(nextSlide, { y: '0%' }, { y: '50%' });
    pageTl.fromTo(slide, { opacity: 1, scale: 1 }, { opacity: 0, scale: 0.5 });
    pageTl.fromTo(nextSlide, { y: '50%' }, { y: '0%' }, '-=0.5');

    // New Scene
    pageScene = new ScrollMagic.Scene({
      triggerElement: slide,
      duration: '100%',
      triggerHook: 0,
    })
      .setPin(slide, { pushFollowers: false })
      .setTween(pageTl)
      .addTo(controller);
  });
}

function cursor(e) {
  mouse.style.top = e.pageY + 'px';
  mouse.style.left = e.pageX + 'px';
  mouse.style.opacity = '1';
  mouse.style.display = 'block';
}

function activeCursor(e) {
  const item = e.target;

  if (item.id === 'logo' || item.classList.contains('burger')) {
    mouse.classList.add('nav-active');
  } else {
    mouse.classList.remove('nav-active');
  }

  if (item.classList.contains('explore')) {
    mouse.classList.add('explore-active');
    mouseText.innerText = 'Tap';
  } else {
    mouse.classList.remove('explore-active');
    mouseText.innerText = '';
  }
}

window.addEventListener('mousemove', cursor);
window.addEventListener('mouseover', activeCursor);

animateSlides();
