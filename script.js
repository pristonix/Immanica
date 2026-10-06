(() => {
  'use strict';
  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#main-nav');
  const carousel = document.querySelector('.carousel');
  const slides = Array.from(document.querySelectorAll('.slide'));
  const dots = document.querySelector('.dots');
  const prev = document.querySelector('.prev');
  const next = document.querySelector('.next');
  const AUTOPLAY_MS = 4000;
  let current = 0;
  let timer = null;
  let touchStartX = 0;
  let animating = false;

  if (menu && nav) {
    menu.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menu.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('open');
      menu.setAttribute('aria-expanded', 'false');
    }));
  }

  if (carousel && slides.length > 1 && dots && prev && next) {
    dots.replaceChildren();
    const dotButtons = slides.map((slide, i) => {
      slide.classList.toggle('active', i === 0);
      slide.setAttribute('aria-hidden', String(i !== 0));
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.setAttribute('aria-label', `Show slide ${i + 1}`);
      dot.classList.toggle('active', i === 0);
      dot.addEventListener('click', () => show(i, i >= current ? 1 : -1, true));
      dots.appendChild(dot);
      return dot;
    });

    function restartProgress() {
      carousel.classList.remove('is-playing');
      void carousel.offsetWidth;
      carousel.classList.add('is-playing');
    }

    function show(index, direction = 1, resetTimer = false) {
      if (animating || index === current) {
        if (resetTimer) restart();
        return;
      }
      animating = true;
      const target = (index + slides.length) % slides.length;
      const oldSlide = slides[current];
      const newSlide = slides[target];
      slides.forEach(s => s.classList.remove('exit-left', 'exit-right'));
      newSlide.classList.add('active');
      newSlide.setAttribute('aria-hidden', 'false');
      oldSlide.classList.add(direction > 0 ? 'exit-left' : 'exit-right');
      oldSlide.classList.remove('active');
      oldSlide.setAttribute('aria-hidden', 'true');
      current = target;
      dotButtons.forEach((dot, i) => dot.classList.toggle('active', i === current));
      restartProgress();
      window.setTimeout(() => {
        oldSlide.classList.remove('exit-left', 'exit-right');
        animating = false;
      }, 850);
      if (resetTimer) restart();
    }

    function restart() {
      window.clearInterval(timer);
      timer = window.setInterval(() => show(current + 1, 1, false), AUTOPLAY_MS);
      restartProgress();
    }

    prev.addEventListener('click', () => show(current - 1, -1, true));
    next.addEventListener('click', () => show(current + 1, 1, true));
    carousel.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].clientX; }, { passive: true });
    carousel.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 45) show(current + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1, true);
    }, { passive: true });
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) window.clearInterval(timer); else restart();
    });
    restart();
  }

  const form = document.getElementById('enquiryForm');
  const status = document.getElementById('formStatus');
  if (form) form.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(form);
    const subject = encodeURIComponent(`Website enquiry - ${data.get('service')}`);
    const body = encodeURIComponent(`Name: ${data.get('name')}\nCompany: ${data.get('company')}\nEmail: ${data.get('email')}\nPhone: ${data.get('phone')}\nService: ${data.get('service')}\n\nRequirement:\n${data.get('message')}`);
    if (status) status.textContent = 'Opening your email application…';
    window.location.href = `mailto:immanicahrsolutions@outlook.com?subject=${subject}&body=${body}`;
  });
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
