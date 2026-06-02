// FutureHub - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {

  // ========================================
  // HERO SLIDER
  // ========================================
  const slides = [
    {
      label: 'All-in-One Platform',
      title: 'Earn, Learn & Grow<br>Your Future',
      desc: 'Jobs, Freelance, Education, Marketplace,<br>Matrimony & AI Assistance — All in One Place!',
      cta: 'Explore Now'
    },
    {
      label: 'Career Opportunities',
      title: 'Find Your Dream<br>Job Today',
      desc: 'Discover thousands of job opportunities<br>and freelance work from top companies.',
      cta: 'Browse Jobs'
    },
    {
      label: 'Free Education',
      title: 'Learn New Skills<br>For Free',
      desc: 'Access hundreds of free courses and<br>boost your career with new skills.',
      cta: 'Start Learning'
    },
    {
      label: 'AI-Powered Tools',
      title: 'AI Tools For<br>Everyone',
      desc: 'Use powerful AI tools to improve<br>productivity and automate tasks.',
      cta: 'Try AI Center'
    }
  ];

  let currentSlide = 0;
  let autoSlideInterval;

  const heroLabel = document.querySelector('.hero-label');
  const heroTitle = document.querySelector('.hero-title');
  const heroDesc = document.querySelector('.hero-desc');
  const heroCta = document.querySelector('.hero-cta');
  const dots = document.querySelectorAll('.slider-dots .dot');
  const prevBtn = document.querySelector('.slider-arrow.prev');
  const nextBtn = document.querySelector('.slider-arrow.next');
  const heroBanner = document.querySelector('.hero-banner');

  function updateSlide(index) {
    if (!slides[index]) return;

    heroLabel.textContent = slides[index].label;
    heroTitle.innerHTML = slides[index].title;
    heroDesc.innerHTML = slides[index].desc;
    heroCta.innerHTML = slides[index].cta + ' <i class="fa-solid fa-arrow-right"></i>';

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });

    currentSlide = index;
  }

  function nextSlide() {
    const next = (currentSlide + 1) % slides.length;
    updateSlide(next);
  }

  function prevSlideFunc() {
    const prev = (currentSlide - 1 + slides.length) % slides.length;
    updateSlide(prev);
  }

  function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 5000);
  }

  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }

  function resetAutoSlide() {
    stopAutoSlide();
    startAutoSlide();
  }

  // Event listeners
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlideFunc();
      resetAutoSlide();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      resetAutoSlide();
    });
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      updateSlide(i);
      resetAutoSlide();
    });
  });

  // Touch/swipe support
  let touchStartX = 0;
  let touchEndX = 0;

  if (heroBanner) {
    heroBanner.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    heroBanner.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
  }

  function handleSwipe() {
    const diff = touchStartX - touchEndX;
    const threshold = 50;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlideFunc();
      }
      resetAutoSlide();
    }
  }

  // Initialize slider
  if (heroLabel) {
    updateSlide(0);
    startAutoSlide();
  }

  // ========================================
  // NOTICE BAR ROTATION
  // ========================================
  const notices = [
    'Welcome to FutureHub! Explore endless opportunities. New users get 100 points!',
    'New Jobs Added Daily! Check out the latest opportunities.',
    'Free Learning Courses Available! Start learning today.',
    'AI Center Now Live! Try our AI-powered tools.',
    'Marketplace Updated! New products available now.'
  ];

  let currentNotice = 0;
  const noticeText = document.querySelector('.notice-text');

  function rotateNotice() {
    if (!noticeText) return;

    noticeText.style.opacity = '0';
    noticeText.style.transform = 'translateY(-5px)';

    setTimeout(() => {
      currentNotice = (currentNotice + 1) % notices.length;
      noticeText.textContent = notices[currentNotice];
      noticeText.style.opacity = '1';
      noticeText.style.transform = 'translateY(0)';
    }, 300);
  }

  if (noticeText) {
    noticeText.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    setInterval(rotateNotice, 4000);
  }

  // ========================================
  // SEARCH BOX FOCUS STATE
  // ========================================
  const searchInput = document.querySelector('.search-box input');
  const searchBox = document.querySelector('.search-box');

  if (searchInput && searchBox) {
    searchInput.addEventListener('focus', () => {
      searchBox.style.boxShadow = '0 0 0 2px rgba(37, 99, 235, 0.2)';
      searchBox.style.background = '#ffffff';
    });

    searchInput.addEventListener('blur', () => {
      searchBox.style.boxShadow = 'none';
      searchBox.style.background = '#f3f4f6';
    });

    searchInput.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        const query = searchInput.value.trim();
        if (query) {
          console.log('Search query:', query);
          // Implement search functionality
        }
      }
    });
  }

  // ========================================
  // BOTTOM NAVIGATION
  // ========================================
  const navItems = document.querySelectorAll('.bottom-nav .nav-item');

  navItems.forEach(item => {
    item.addEventListener('click', function(e) {
      if (this.classList.contains('add-post')) {
        e.preventDefault();
        console.log('Add Post clicked');
        // Implement add post modal
        return;
      }

      navItems.forEach(nav => nav.classList.remove('active'));
      if (!this.classList.contains('add-post')) {
        this.classList.add('active');
      }
    });
  });

  // ========================================
  // MENU CARD INTERACTIONS
  // ========================================
  const menuCards = document.querySelectorAll('.menu-card');

  menuCards.forEach(card => {
    // Touch feedback for mobile
    card.addEventListener('touchstart', function() {
      this.style.transform = 'scale(0.98)';
    }, { passive: true });

    card.addEventListener('touchend', function() {
      this.style.transform = '';
    }, { passive: true });
  });

  // ========================================
  // STATS ANIMATION (Intersection Observer)
  // ========================================
  const statValues = document.querySelectorAll('.stat-value');

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        el.style.opacity = '0';
        el.style.transform = 'translateY(10px)';

        setTimeout(() => {
          el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }, 100);

        statsObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statValues.forEach(val => statsObserver.observe(val));

  // ========================================
  // HEADER SCROLL EFFECT
  // ========================================
  const header = document.querySelector('.header');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
      header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.06)';
    }
  }, { passive: true });

  // ========================================
  // PROFILE DROPDOWN (Desktop)
  // ========================================
  const profileDropdown = document.querySelector('.profile-dropdown');

  if (profileDropdown) {
    profileDropdown.addEventListener('click', () => {
      console.log('Profile dropdown clicked');
      // Implement profile dropdown menu
    });
  }

  // ========================================
  // NOTIFICATION BUTTON
  // ========================================
  const notificationBtn = document.querySelector('.notification-btn');

  if (notificationBtn) {
    notificationBtn.addEventListener('click', () => {
      console.log('Notifications clicked');
      // Implement notifications panel
    });
  }

  // ========================================
  // LAZY LOADING IMAGES
  // ========================================
  const lazyImages = document.querySelectorAll('img[data-src]');

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });

  lazyImages.forEach(img => imageObserver.observe(img));

  // ========================================
  // PREVENT DOUBLE TAP ZOOM (iOS)
  // ========================================
  let lastTouchEnd = 0;

  document.addEventListener('touchend', (e) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
      e.preventDefault();
    }
    lastTouchEnd = now;
  }, false);

});
