const body = document.body;
const loader = document.querySelector('.loader');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -35px' });
revealElements.forEach((element) => revealObserver.observe(element));

window.addEventListener('load', () => {
  window.setTimeout(() => {
    loader.classList.add('is-hidden');
    body.classList.remove('is-loading');
    body.classList.add('is-ready');
  }, 1050);
}, { once: true });

const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');
const closeMobileNav = () => {
  menuToggle?.setAttribute('aria-expanded', 'false');
  mobileNav?.classList.remove('is-open');
  mobileNav?.setAttribute('aria-hidden', 'true');
  if (mobileNav) mobileNav.inert = true;
};
if (mobileNav) mobileNav.inert = true;
menuToggle?.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  mobileNav.classList.toggle('is-open', !isOpen);
  mobileNav.setAttribute('aria-hidden', String(isOpen));
  mobileNav.inert = isOpen;
});
document.querySelectorAll('.mobile-nav a').forEach((link) => link.addEventListener('click', closeMobileNav));

const navLinks = [...document.querySelectorAll('.desktop-nav .nav-link')];
const sections = [...document.querySelectorAll('main section[id]')];
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navLinks.forEach((link) => link.classList.toggle('is-active', link.getAttribute('href') === `#${entry.target.id}`));
    }
  });
}, { threshold: 0, rootMargin: '-30% 0px -55%' });
sections.forEach((section) => sectionObserver.observe(section));

const track = document.querySelector('.talk-track');
const carouselButtons = document.querySelectorAll('[data-carousel]');
let carouselIndex = 0;
const updateCarousel = () => {
  if (!track) return;
  const isMobile = window.matchMedia('(max-width: 780px)').matches;
  const cardWidth = isMobile ? track.parentElement.clientWidth : 0;
  const maxIndex = isMobile ? 2 : 0;
  carouselIndex = Math.max(0, Math.min(carouselIndex, maxIndex));
  track.style.transform = `translateX(-${carouselIndex * (cardWidth + (isMobile ? 0 : 0))}px)`;
};
carouselButtons.forEach((button) => button.addEventListener('click', () => {
  carouselIndex += button.dataset.carousel === 'next' ? 1 : -1;
  updateCarousel();
}));
window.addEventListener('resize', updateCarousel);

const filterButtons = document.querySelectorAll('.filter');
const galleryCards = document.querySelectorAll('.gallery-card');
filterButtons.forEach((button) => button.setAttribute('aria-selected', String(button.classList.contains('is-active'))));
filterButtons.forEach((button) => button.addEventListener('click', () => {
  const selected = button.dataset.filter;
  filterButtons.forEach((item) => {
    item.classList.toggle('is-active', item === button);
    item.setAttribute('aria-selected', String(item === button));
  });
  galleryCards.forEach((card) => {
    const matches = selected === 'all' || card.dataset.category === selected;
    card.classList.toggle('is-hidden', !matches);
    if (matches && !reduceMotion) {
      card.animate([
        { opacity: 0, transform: 'translateY(8px) scale(.98)' },
        { opacity: 1, transform: 'translateY(0) scale(1)' }
      ], { duration: 420, easing: 'cubic-bezier(.2,.8,.2,1)' });
    }
  });
}));

const form = document.querySelector('#contact-form');
const formStatus = document.querySelector('.form-status');
const toast = document.querySelector('.toast');
let toastTimer;
const showToast = (message) => {
  toast.textContent = message;
  toast.classList.add('is-visible');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 3600);
};
form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const name = String(data.get('name') || '').trim();
  const email = String(data.get('email') || '').trim();
  const interest = String(data.get('interest') || '').trim();
  const message = String(data.get('message') || '').trim();
  formStatus.classList.remove('is-error');
  if (!name || !email || !interest || !message) {
    formStatus.textContent = 'Please fill in each field so we can guide you well.';
    formStatus.classList.add('is-error');
    return;
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    formStatus.textContent = 'Please check your email address and try again.';
    formStatus.classList.add('is-error');
    return;
  }
  const subject = encodeURIComponent(`${interest} enquiry from ${name}`);
  const emailBody = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nInterest: ${interest}\n\n${message}`);
  const draftWindow = window.open(`mailto:hello@roadtorainbow.in?subject=${subject}&body=${emailBody}`, '_blank');
  if (!draftWindow) window.location.href = `mailto:hello@roadtorainbow.in?subject=${subject}&body=${emailBody}`;
  formStatus.textContent = 'Your email draft is ready — please send it from your mail app.';
  form.reset();
  showToast('Email draft opened.');
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const href = link.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  });
});

const heroVisual = document.querySelector('.hero__visual');
  if (heroVisual && !reduceMotion) {
  window.addEventListener('scroll', () => {
    const offset = Math.min(window.scrollY * .08, 28);
    heroVisual.style.setProperty('--parallax', `${offset}px`);
    heroVisual.style.transform = `translateY(${offset}px)`;
  }, { passive: true });
}
