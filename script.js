/* =============================================
   DESCOOL ACADEMY – script.js
   Interactive JavaScript
   ============================================= */

'use strict';

// =============================================
// 1. NAVBAR – Scroll & Mobile Menu
// =============================================
(function () {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  const allNavLinks = document.querySelectorAll('.nav-link');

  // Scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  // Mobile menu toggle
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.classList.toggle('open');
    // Animate hamburger
    const spans = hamburger.querySelectorAll('span');
    if (navLinks.classList.contains('open')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });

  // Close menu on link click
  allNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      const spans = hamburger.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    });
  });

  // Active link on scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    allNavLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
})();

// =============================================
// 2. HERO PARTICLES
// =============================================
(function () {
  const container = document.getElementById('particles');
  if (!container) return;

  const count = 30;
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.style.cssText = `
      position: absolute;
      border-radius: 50%;
      pointer-events: none;
      background: rgba(244, 196, 48, ${Math.random() * 0.5 + 0.1});
      width: ${Math.random() * 4 + 2}px;
      height: ${Math.random() * 4 + 2}px;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation: particleFloat ${Math.random() * 10 + 8}s ease-in-out infinite;
      animation-delay: -${Math.random() * 10}s;
    `;
    container.appendChild(particle);
  }

  // Add the keyframe dynamically
  const style = document.createElement('style');
  style.textContent = `
    @keyframes particleFloat {
      0%, 100% { transform: translateY(0) translateX(0); opacity: 0.6; }
      25% { transform: translateY(-20px) translateX(10px); opacity: 1; }
      50% { transform: translateY(-35px) translateX(-5px); opacity: 0.7; }
      75% { transform: translateY(-15px) translateX(15px); opacity: 0.9; }
    }
  `;
  document.head.appendChild(style);
})();

// =============================================
// 3. COUNTER ANIMATION (Hero Stats)
// =============================================
(function () {
  const counters = document.querySelectorAll('.stat-num[data-target]');
  if (!counters.length) return;

  let animated = false;

  function animateCounters() {
    if (animated) return;
    animated = true;
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      const duration = 2000;
      const step = target / (duration / 16);
      let current = 0;

      const update = () => {
        current = Math.min(current + step, target);
        counter.textContent = Math.floor(current);
        if (current < target) {
          requestAnimationFrame(update);
        }
      };
      requestAnimationFrame(update);
    });
  }

  // Trigger when hero is visible
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) animateCounters();
    });
  }, { threshold: 0.5 });

  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) observer.observe(heroStats);
})();

// =============================================
// 4. SCROLL REVEAL ANIMATION
// =============================================
(function () {
  const revealElements = document.querySelectorAll(
    '.course-card, .why-card, .blog-card, .gallery-item, .pillar, .contact-item, .testimonial-card'
  );

  // Add reveal class
  revealElements.forEach((el, i) => {
    el.classList.add('reveal');
    const delay = (i % 4) * 100;
    el.style.transitionDelay = `${delay}ms`;
  });

  // Also add to section headers
  document.querySelectorAll('.section-header, .about-content, .about-visual, .contact-info, .contact-form').forEach(el => {
    el.classList.add('reveal');
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
})();

// =============================================
// 5. GALLERY FILTER
// =============================================
(function () {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          item.style.display = '';
          item.style.animation = 'fadeInUp 0.4s ease both';
          setTimeout(() => { item.style.animation = ''; }, 400);
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
})();

// =============================================
// 6. TESTIMONIALS SLIDER
// =============================================
(function () {
  const track = document.getElementById('testimonialTrack');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dotsContainer = document.getElementById('sliderDots');

  if (!track) return;

  const cards = track.querySelectorAll('.testimonial-card');
  const totalCards = cards.length;
  let currentIndex = 0;
  const cardsVisible = window.innerWidth > 768 ? 2 : 1;

  // Create dots
  const totalSlides = Math.ceil(totalCards / cardsVisible);
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('div');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  }

  function updateSlider() {
    const cardWidth = cards[0].getBoundingClientRect().width + 24; // gap
    track.style.transform = `translateX(-${currentIndex * cardWidth * cardsVisible}px)`;

    // Update dots
    document.querySelectorAll('.dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
  }

  function goTo(index) {
    currentIndex = Math.max(0, Math.min(index, totalSlides - 1));
    updateSlider();
  }

  prevBtn.addEventListener('click', () => goTo(currentIndex - 1));
  nextBtn.addEventListener('click', () => goTo(currentIndex + 1));

  // Auto-slide
  let autoSlide = setInterval(() => {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlider();
  }, 5000);

  // Pause on hover
  track.addEventListener('mouseenter', () => clearInterval(autoSlide));
  track.addEventListener('mouseleave', () => {
    autoSlide = setInterval(() => {
      currentIndex = (currentIndex + 1) % totalSlides;
      updateSlider();
    }, 5000);
  });

  // Touch support
  let touchStartX = 0;
  track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? goTo(currentIndex + 1) : goTo(currentIndex - 1);
    }
  });

  // Recalculate on resize
  window.addEventListener('resize', updateSlider, { passive: true });
})();

// =============================================
// 7. CONTACT FORM
// =============================================
(function () {
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const successMsg = document.getElementById('formSuccess');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Simple validation
    let valid = true;
    const required = form.querySelectorAll('[required]');

    required.forEach(field => {
      field.classList.remove('error');
      if (!field.value.trim()) {
        field.classList.add('error');
        valid = false;
      }
      if (field.type === 'email' && field.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value)) {
          field.classList.add('error');
          valid = false;
        }
      }
    });

    if (!valid) return;

    submitBtn.innerHTML = '<span>Sending...</span>';
    submitBtn.disabled = true;

    const formData = new FormData(form);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });
      const data = await response.json();

      if (data.success) {
        form.reset();
        successMsg.innerHTML = "✅ Thank you! Your message has been sent successfully. We will contact you shortly.";
        successMsg.classList.add('show');
        setTimeout(() => successMsg.classList.remove('show'), 6000);
      } else {
        alert("Form submission error: " + (data.message || "Please verify your Web3Forms access key."));
      }
    } catch (err) {
      alert("Network error: Could not send your message. Please check your internet connection.");
    } finally {
      submitBtn.innerHTML = '<span>Send Message</span><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>';
      submitBtn.disabled = false;
    }
  });

  // Remove error on input
  form.querySelectorAll('input, select, textarea').forEach(field => {
    field.addEventListener('input', () => field.classList.remove('error'));
  });
})();

// =============================================
// 8. BACK TO TOP
// =============================================
(function () {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

// =============================================
// 9. SMOOTH ANCHOR SCROLLING
// =============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const offset = 80; // navbar height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// =============================================
// 10. GALLERY LIGHTBOX (Click to enlarge)
// =============================================
(function () {
  const galleryItems = document.querySelectorAll('.gallery-item');

  // Create lightbox
  const lightbox = document.createElement('div');
  lightbox.id = 'lightbox';
  lightbox.style.cssText = `
    position: fixed; inset: 0; z-index: 9999;
    background: rgba(0,0,0,0.9);
    display: flex; align-items: center; justify-content: center;
    opacity: 0; visibility: hidden;
    transition: all 0.3s ease;
    cursor: pointer;
    padding: 24px;
  `;

  const lightboxContent = document.createElement('div');
  lightboxContent.style.cssText = `
    max-width: 800px; width: 100%;
    background: #0d2347;
    border: 1px solid rgba(244,196,48,0.3);
    border-radius: 16px;
    padding: 24px;
    text-align: center;
    transform: scale(0.9);
    transition: transform 0.3s ease;
    box-shadow: 0 20px 60px rgba(0,0,0,0.5);
  `;

  const lightboxImg = document.createElement('img');
  lightboxImg.style.cssText = 'width: 100%; max-height: 70vh; object-fit: contain; border-radius: 12px; margin-bottom: 16px; display: none;';

  const lightboxVideo = document.createElement('video');
  lightboxVideo.style.cssText = 'width: 100%; max-height: 70vh; object-fit: contain; border-radius: 12px; margin-bottom: 16px; display: none;';
  lightboxVideo.controls = true;

  const lightboxTitle = document.createElement('h3');
  lightboxTitle.style.cssText = `
    font-family: 'Playfair Display', serif;
    color: #F4C430; font-size: 1.3rem;
    margin-bottom: 8px;
  `;

  const lightboxClose = document.createElement('button');
  lightboxClose.textContent = '✕ Close';
  lightboxClose.style.cssText = `
    margin-top: 12px; padding: 10px 28px;
    background: rgba(244,196,48,0.15);
    border: 1.5px solid #F4C430;
    color: #F4C430; border-radius: 50px;
    cursor: pointer; font-size: 0.9rem;
    font-weight: 600; transition: all 0.3s;
  `;
  lightboxClose.addEventListener('mouseenter', () => {
    lightboxClose.style.background = '#F4C430';
    lightboxClose.style.color = '#0d2347';
  });
  lightboxClose.addEventListener('mouseleave', () => {
    lightboxClose.style.background = 'rgba(244,196,48,0.15)';
    lightboxClose.style.color = '#F4C430';
  });

  lightboxContent.appendChild(lightboxImg);
  lightboxContent.appendChild(lightboxVideo);
  lightboxContent.appendChild(lightboxTitle);
  lightboxContent.appendChild(lightboxClose);
  lightbox.appendChild(lightboxContent);
  document.body.appendChild(lightbox);

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const label = item.querySelector('.gallery-label')?.textContent || 'Gallery';
      const imgSrc = item.querySelector('img')?.src || '';
      const videoSrc = item.getAttribute('data-video-src');
      
      lightboxTitle.textContent = label;

      if (videoSrc) {
        lightboxImg.style.display = 'none';
        lightboxVideo.src = videoSrc;
        lightboxVideo.style.display = 'block';
        lightboxVideo.play().catch(e => console.log('Auto-play prevented'));
      } else {
        lightboxVideo.style.display = 'none';
        lightboxVideo.pause();
        lightboxVideo.src = '';
        lightboxImg.src = imgSrc;
        lightboxImg.style.display = 'block';
      }
      lightbox.style.opacity = '1';
      lightbox.style.visibility = 'visible';
      lightboxContent.style.transform = 'scale(1)';
    });
  });

  const closeLightbox = () => {
    lightbox.style.opacity = '0';
    lightbox.style.visibility = 'hidden';
    lightboxContent.style.transform = 'scale(0.9)';
    lightboxVideo.pause();
    setTimeout(() => {
      if(lightboxVideo.style.display === 'none') {
          lightboxImg.src = '';
      } else {
          lightboxVideo.src = '';
      }
    }, 300);
  };

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });
})();

// =============================================
// 11. PAGE LOAD ANIMATION
// =============================================
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  });
});

console.log('%c🎓 Descool Academy', 'color:#F4C430; font-size:20px; font-weight:bold; background:#0d2347; padding:8px 16px; border-radius:8px;');
console.log('%cPremier CLAT & Law Coaching Institute', 'color:#9ca3af; font-size:12px;');
