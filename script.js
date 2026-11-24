/**
 * Next Journey — Tours & Travels
 * Vanilla JavaScript Implementation
 * 
 * Features:
 * 1. Wanderland-style Hero Banner Slider (Next/Prev arrow interaction & slide switching)
 * 2. IntersectionObserver scroll reveal animations
 * 3. Smooth internal anchor navigation
 * 4. Destination carousel side navigation
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ==========================================================================
     1. Wanderland Hero Banner Slide Switcher
     ========================================================================== */
  const slides = [
    {
      img: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=1920&q=85',
      title: 'AMAZON RAINFOREST & HIMALAYAN EXPEDITIONS',
      desc: 'Traverse untouched wilderness, high-altitude alpine ridges, and mystical ancient trails with handcrafted itineraries built for genuine explorers.',
      date: 'October 11, 2026',
      author: 'by Next Journey Expeditions'
    },
    {
      img: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1920&q=85',
      title: 'KASHMIR LAKES & GLACIAL PEAKS RETREAT',
      desc: 'Wake up to morning mist drifting across cedar houseboats on Dal Lake and trek through golden pine meadows of Pahalgam and Gulmarg.',
      date: 'November 24, 2026',
      author: 'by Mountain Guides'
    },
    {
      img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=85',
      title: 'SWISS ALPS & NORWEGIAN FJORD ODYSSEY',
      desc: 'Panoramic alpine rail expeditions through snow-dusted valleys, crystal-clear glacial waters, and secluded timber lodges.',
      date: 'December 05, 2026',
      author: 'by Alpine Specialist'
    }
  ];

  let currentSlideIndex = 0;
  const heroImg1 = document.getElementById('hero-img-1');
  const heroTitle = document.getElementById('hero-headline-text');
  const heroDesc = document.getElementById('hero-desc-text');
  const heroPrevBtn = document.getElementById('hero-prev-btn');
  const heroNextBtn = document.getElementById('hero-next-btn');

  const updateSlide = (index) => {
    if (!heroImg1 || !heroTitle || !heroDesc) return;
    
    // Smooth fade effect
    heroTitle.style.opacity = '0';
    heroDesc.style.opacity = '0';
    heroImg1.style.opacity = '0';

    setTimeout(() => {
      heroImg1.src = slides[index].img;
      heroTitle.textContent = slides[index].title;
      heroDesc.textContent = slides[index].desc;
      
      heroImg1.style.opacity = '1';
      heroTitle.style.opacity = '1';
      heroDesc.style.opacity = '1';
    }, 280);
  };

  if (heroPrevBtn && heroNextBtn) {
    heroPrevBtn.addEventListener('click', () => {
      currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
      updateSlide(currentSlideIndex);
    });

    heroNextBtn.addEventListener('click', () => {
      currentSlideIndex = (currentSlideIndex + 1) % slides.length;
      updateSlide(currentSlideIndex);
    });
  }

  /* ==========================================================================
     2. Scroll Reveal Animations (Intersection Observer)
     ========================================================================== */
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  if (revealElements.length > 0) {
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      revealElements.forEach(el => el.classList.add('is-visible'));
    } else {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
      });

      revealElements.forEach(el => observer.observe(el));
    }
  }

  /* ==========================================================================
     3. Smooth Anchor Scrolling
     ========================================================================== */
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#' || targetId === '#!') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const targetPosition = targetEl.getBoundingClientRect().top + window.pageYOffset - 30;

        window.scrollTo({
          top: targetPosition,
          behavior: prefersReducedMotion ? 'auto' : 'smooth'
        });
      }
    });
  });

  /* ==========================================================================
     4. Destinations Next Button Carousel Effect
     ========================================================================== */
  const nextBtn = document.querySelector('.dest-next-btn');
  const destinationsRow = document.querySelector('.destinations-row');

  if (nextBtn && destinationsRow) {
    nextBtn.addEventListener('click', () => {
      destinationsRow.scrollBy({
        left: 280,
        behavior: 'smooth'
      });
    });
  }
});
