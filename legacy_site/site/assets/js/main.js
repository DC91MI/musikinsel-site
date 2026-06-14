document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-menu]');
  if (toggle && menu) {
    toggle.addEventListener('click', () => menu.classList.toggle('open'));
  }

  const yearNode = document.querySelector('[data-year]');
  if (yearNode) yearNode.textContent = new Date().getFullYear();

  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('[data-nav]').forEach(link => {
    const href = link.getAttribute('href');
    if ((current === '' && href === 'index.html') || href === current) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });

  const formspreeForm = document.querySelector('[data-formspree-form]');
  if (formspreeForm) {
    const statusNode = formspreeForm.querySelector('[data-form-status]');
    const submitButton = formspreeForm.querySelector('button[type="submit"]');
    const defaultButtonText = submitButton ? submitButton.textContent : '';

    formspreeForm.addEventListener('submit', async (event) => {
      if (!formspreeForm.checkValidity()) return;

      event.preventDefault();
      if (statusNode) statusNode.textContent = '';
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = 'Wird gesendet...';
      }

      try {
        const response = await fetch(formspreeForm.action, {
          method: 'POST',
          body: new FormData(formspreeForm),
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          window.location.href = formspreeForm.dataset.successUrl || '/danke/';
          return;
        }

        if (statusNode) {
          statusNode.textContent = 'Die Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder schreiben Sie direkt an musikinsel-leipzig@gmx.de.';
        }
      } catch (error) {
        if (statusNode) {
          statusNode.textContent = 'Die Nachricht konnte nicht gesendet werden. Bitte prüfen Sie Ihre Internetverbindung oder schreiben Sie direkt an musikinsel-leipzig@gmx.de.';
        }
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = defaultButtonText;
        }
      }
    });
  }

  const heroSlides = [
    "assets/images/startseite/klavier.jpg",
    "assets/images/startseite/Room2-min.png",
    "assets/images/startseite/Room3-min.jpg",
    "assets/images/startseite/Detail.jpg",
    "assets/images/startseite/Eingang.jpg",
    "assets/images/startseite/Aussenansicht_1.jpg",
    "assets/images/startseite/Spielzimmer.jpg"
  ];

  heroSlides.forEach(src => {
    const img = new Image();
    img.src = src;
  });

  const heroImage = document.getElementById("heroSlideImage");
  const heroDots = document.getElementById("heroDots");
  const heroPrev = document.querySelector("[data-hero-prev]");
  const heroNext = document.querySelector("[data-hero-next]");
  const heroOpen = document.querySelector("[data-hero-open]");

  const lightbox = document.getElementById("heroLightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const lightboxClose = document.querySelector("[data-lightbox-close]");
  const lightboxPrev = document.querySelector("[data-lightbox-prev]");
  const lightboxNext = document.querySelector("[data-lightbox-next]");

  if (!heroImage || !heroDots || !heroPrev || !heroNext || !heroOpen || !lightbox || !lightboxImage) {
    return;
  }

  let currentHeroIndex = 0;
  let autoplay;

  function renderHeroDots() {
    heroDots.innerHTML = "";
    heroSlides.forEach((_, index) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "hero-dot" + (index === currentHeroIndex ? " active" : "");
      dot.setAttribute("aria-label", `Gehe zu Bild ${index + 1}`);
      dot.addEventListener("click", () => {
        currentHeroIndex = index;
        updateHeroSlide();
        restartAutoplay();
      });
      heroDots.appendChild(dot);
    });
  }

  function updateHeroSlide() {
    heroImage.style.opacity = 0;

    setTimeout(() => {
      heroImage.src = heroSlides[currentHeroIndex];
      lightboxImage.src = heroSlides[currentHeroIndex];
      heroImage.style.opacity = 1;
      renderHeroDots();
    }, 200);
  }

  function showPrevHero() {
    currentHeroIndex = (currentHeroIndex - 1 + heroSlides.length) % heroSlides.length;
    updateHeroSlide();
  }

  function showNextHero() {
    currentHeroIndex = (currentHeroIndex + 1) % heroSlides.length;
    updateHeroSlide();
  }

  function startAutoplay() {
    autoplay = setInterval(showNextHero, 4000);
  }

  function stopAutoplay() {
    clearInterval(autoplay);
  }

  function restartAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  function openLightbox() {
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    lightboxImage.src = heroSlides[currentHeroIndex];
    document.body.style.overflow = "hidden";
    stopAutoplay();
  }

  function closeLightbox() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    restartAutoplay();
  }

  heroPrev.addEventListener("click", () => {
    showPrevHero();
    restartAutoplay();
  });

  heroNext.addEventListener("click", () => {
    showNextHero();
    restartAutoplay();
  });

  heroOpen.addEventListener("click", openLightbox);

  if (lightboxPrev) {
    lightboxPrev.addEventListener("click", () => {
      showPrevHero();
    });
  }

  if (lightboxNext) {
    lightboxNext.addEventListener("click", () => {
      showNextHero();
    });
  }

  if (lightboxClose) {
    lightboxClose.addEventListener("click", closeLightbox);
  }

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  heroImage.addEventListener("mouseenter", stopAutoplay);
  heroImage.addEventListener("mouseleave", startAutoplay);

  document.addEventListener("keydown", (e) => {
    if (lightbox.classList.contains("open")) {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showPrevHero();
      if (e.key === "ArrowRight") showNextHero();
    }
  });

  updateHeroSlide();
  startAutoplay();
});
