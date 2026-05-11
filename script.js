/* ========================================
   DRIVERA — script.js
   ======================================== */
document.addEventListener('DOMContentLoaded', () => {

  /* Preloader */
  const pre = document.getElementById('preloader');
  setTimeout(() => pre.classList.add('hidden'), 2200);

  /* Navbar scroll */
  const nav = document.querySelector('.nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  /* Hamburger */
  const ham = document.querySelector('.hamburger');
  const mob = document.querySelector('.mob-nav');
  ham.addEventListener('click', () => {
    ham.classList.toggle('active');
    mob.classList.toggle('open');
    document.body.style.overflow = mob.classList.contains('open') ? 'hidden' : '';
  });
  mob.querySelectorAll('a').forEach(l => l.addEventListener('click', () => {
    ham.classList.remove('active');
    mob.classList.remove('open');
    document.body.style.overflow = '';
  }));

  /* Scroll reveal */
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

  /* Counter animation */
  let done = false;
  const statsEl = document.querySelector('.stats');
  if (statsEl) {
    new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !done) {
        done = true;
        document.querySelectorAll('.stat-n').forEach(c => {
          const t = +c.dataset.target, s = c.dataset.suffix || '', st = performance.now();
          const up = now => {
            const p = Math.min((now - st) / 2000, 1);
            c.textContent = Math.floor(t * (1 - Math.pow(1 - p, 3))) + s;
            if (p < 1) requestAnimationFrame(up);
          };
          requestAnimationFrame(up);
        });
      }
    }, { threshold: 0.3 }).observe(statsEl);
  }

  /* Duplicate marquees for infinite scroll */
  ['brandTrack', 'testiTrack'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.innerHTML += el.innerHTML;
  });

  /* Form → WhatsApp */
  const form = document.getElementById('booking-form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const d = id => form.querySelector('#' + id).value;
      const msg = `Hi DRIVERA! I'd like to book a slot.%0A%0A*Name:* ${d('name')}%0A*Car:* ${d('car')}%0A*Service:* ${d('service')}%0A*Date:* ${d('date')}%0A*Phone:* ${d('phone')}`;
      window.open(`https://wa.me/918182923456?text=${msg}`, '_blank');
    });
  }

  /* Gallery Lightbox */
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightbox-img');
  if (lightbox) {
    document.querySelectorAll('.gallery-item img').forEach(img => {
      img.addEventListener('click', () => {
        lbImg.src = img.src;
        lightbox.classList.add('active');
      });
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') lightbox.classList.remove('active');
    });
  }
});
