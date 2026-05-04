const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
const year = document.querySelector('#year');
const heroCarousel = document.querySelector('#hero-carousel');

if (year) year.textContent = new Date().getFullYear();
if (menuButton && nav) {
  menuButton.addEventListener('click', () => nav.classList.toggle('open'));
}

if (heroCarousel) {
  const track = heroCarousel.querySelector('.hero-track');
  const slides = Array.from(heroCarousel.querySelectorAll('.hero-slide'));
  const dots = Array.from(heroCarousel.querySelectorAll('.hero-dot'));
  const prev = heroCarousel.querySelector('.hero-prev');
  const next = heroCarousel.querySelector('.hero-next');
  const isMobile = () => window.matchMedia('(max-width: 980px)').matches;
  let active = 0;
  let startX = 0;
  let endX = 0;
  let isPointerDown = false;
  let isTouchDown = false;
  let autoTimer;

  const setActive = (index, animate = true) => {
    active = (index + slides.length) % slides.length;
    dots.forEach((dot, i) => dot.classList.toggle('is-active', i === active));
    if (isMobile()) {
      track.style.transition = animate ? 'transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)' : 'none';
      track.style.transform = `translateX(-${active * 100}%)`;
    } else {
      track.style.transition = 'none';
      track.style.transform = 'none';
    }
  };

  dots.forEach((dot) => {
    dot.addEventListener('click', () => setActive(Number(dot.dataset.slide || 0)));
  });

  if (prev) prev.addEventListener('click', () => isMobile() && setActive(active - 1));
  if (next) next.addEventListener('click', () => isMobile() && setActive(active + 1));

  const restartAuto = () => {
    window.clearInterval(autoTimer);
    if (isMobile()) autoTimer = window.setInterval(() => setActive(active + 1), 5000);
  };

  const onPointerDown = (event) => {
    if (!isMobile()) return;
    isPointerDown = true;
    startX = event.clientX;
    endX = startX;
    heroCarousel.style.cursor = 'grabbing';
    window.clearInterval(autoTimer);
  };

  const onPointerMove = (event) => {
    if (!isMobile()) return;
    if (!isPointerDown) return;
    endX = event.clientX;
  };

  const onPointerUp = () => {
    if (!isMobile()) return;
    if (!isPointerDown) return;
    isPointerDown = false;
    heroCarousel.style.cursor = 'grab';
    const delta = endX - startX;
    const threshold = 45;
    if (delta > threshold) setActive(active - 1);
    if (delta < -threshold) setActive(active + 1);
    restartAuto();
  };

  const onTouchStart = (event) => {
    if (!isMobile()) return;
    isTouchDown = true;
    startX = event.changedTouches[0].clientX;
    endX = startX;
    window.clearInterval(autoTimer);
  };

  const onTouchMove = (event) => {
    if (!isMobile()) return;
    if (!isTouchDown) return;
    endX = event.changedTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!isMobile()) return;
    if (!isTouchDown) return;
    isTouchDown = false;
    const delta = endX - startX;
    const threshold = 45;
    if (delta > threshold) setActive(active - 1);
    if (delta < -threshold) setActive(active + 1);
    restartAuto();
  };

  heroCarousel.addEventListener('pointerdown', onPointerDown, { passive: true });
  heroCarousel.addEventListener('pointermove', onPointerMove, { passive: true });
  heroCarousel.addEventListener('pointerup', onPointerUp, { passive: true });
  heroCarousel.addEventListener('pointercancel', onPointerUp, { passive: true });
  heroCarousel.addEventListener('pointerleave', onPointerUp, { passive: true });
  heroCarousel.addEventListener('touchstart', onTouchStart, { passive: true });
  heroCarousel.addEventListener('touchmove', onTouchMove, { passive: true });
  heroCarousel.addEventListener('touchend', onTouchEnd, { passive: true });
  heroCarousel.addEventListener('touchcancel', onTouchEnd, { passive: true });

  heroCarousel.addEventListener('mouseenter', () => window.clearInterval(autoTimer));
  heroCarousel.addEventListener('mouseleave', restartAuto);
  window.addEventListener('resize', () => {
    setActive(active, false);
    restartAuto();
  });
  setActive(0, false);
  restartAuto();
}

const ratingBadges = document.querySelectorAll('.rating-badge');
if (ratingBadges.length) {
  ratingBadges.forEach((badge) => {
    badge.addEventListener('click', (event) => {
      event.stopPropagation();
      const card = badge.closest('.product-card');
      if (!card) return;
      const isOpen = card.classList.contains('rating-open');
      document.querySelectorAll('.product-card.rating-open').forEach((c) => c.classList.remove('rating-open'));
      if (!isOpen) card.classList.add('rating-open');
    });
  });

  document.addEventListener('click', () => {
    document.querySelectorAll('.product-card.rating-open').forEach((c) => c.classList.remove('rating-open'));
  });
}

const reviewCards = document.querySelectorAll('.review-card');
if (reviewCards.length) {
  const productImageMap = {
    'FUMOT ECO 2w1 50K': './assets/img/jednorazowki-fumot-eco-2w1-50k.png',
    'JNR Quads 120K': './assets/img/jednorazowki-jnr-quads-4w1-120k.png',
    'AL FAKHER Crown Bar 60K': './assets/img/jednorazowki-al-fakher-crown-bar-e-hose-x-60k.png',
    'Vozol Rave 40K': './assets/img/vozol-rave-40k-buchow.png',
    'MERRYMI Panda Twins 40K': './assets/img/jednorazowki-merrymi-panda-twins-40k.png',
    'MERRYMI Mecha X 28K': './assets/img/jednorazowki-merrymi-mecha-x-28k.png',
    'JNR Triple 110K': './assets/img/jednorazowki-jnr-triple-110k.png',
    'ADALYA ADL PRO 360 20K': './assets/img/jednorazowki-adalya-adl-pro-360-20k.jpg',
    'JNR Mega Box Pro 50K': './assets/img/jednorazowki-jnr-mega-box-pro-50k.png',
    'Vozol Gear Power 20K': './assets/img/vozol-gear-power-20k-buchow.jpg',
    'JNR Falcon Bar 48K': './assets/img/jednorazowki-jnr-falcon-bar-48k.jpg',
    'MERRYMI Panda X 40K': './assets/img/jednorazowki-merrymi-panda-x-40k.jpg'
  };

  reviewCards.forEach((card) => {
    const meta = card.querySelector('small');
    if (!meta) return;
    const productName = meta.textContent.replace('Produkt:', '').trim();
    const image = productImageMap[productName];
    if (!image) return;
    meta.classList.add('review-product-inline');
    meta.innerHTML = `<img src="${image}" alt="${productName}" /><span>${productName}</span>`;
  });
}
