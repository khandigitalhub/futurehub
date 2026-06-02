// FutureHub Main Script

document.addEventListener("DOMContentLoaded", function () {

  // ========================================
  // HERO SLIDER
  // ========================================
  const slides = [
    {
      badge: "All-in-One Platform",
      title: "Earn, Learn & Grow<br>Your Future",
      description: "Jobs, Freelance, Education, Marketplace, Matrimony & AI Assistance — All in One Place!",
      button: "Explore Now"
    },
    {
      badge: "Career Opportunities",
      title: "Find Your Dream<br>Job Today",
      description: "Discover thousands of job opportunities and freelance work from top companies.",
      button: "Browse Jobs"
    },
    {
      badge: "Free Education",
      title: "Learn New Skills<br>For Free",
      description: "Access hundreds of free courses and boost your career with new skills.",
      button: "Start Learning"
    },
    {
      badge: "AI-Powered Tools",
      title: "AI Tools For<br>Everyone",
      description: "Use powerful AI tools to improve productivity and automate tasks.",
      button: "Try AI Center"
    }
  ];

  let currentSlide = 0;
  let slideInterval;

  const heroSlide = document.querySelector('.hero-slide');
  const heroBadge = document.querySelector('.hero-badge');
  const heroTitle = document.querySelector('.hero-title');
  const heroDescription = document.querySelector('.hero-description');
  const heroBtn = document.querySelector('.hero-btn');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.hero-prev');
  const nextBtn = document.querySelector('.hero-next');

  function updateSlide(index) {
    if (!heroSlide || !slides[index]) return;

    // Update content
    heroBadge.textContent = slides[index].badge;
    heroTitle.innerHTML = slides[index].title;
    heroDescription.textContent = slides[index].description;
    heroBtn.innerHTML = slides[index].button + ' <i class="fa-solid fa-arrow-right"></i>';

    // Update dots
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });

    currentSlide = index;
  }

  function nextSlide() {
    const next = (currentSlide + 1) % slides.length;
    updateSlide(next);
  }

  function prevSlide() {
    const prev = (currentSlide - 1 + slides.length) % slides.length;
    updateSlide(prev);
  }

  function startAutoSlide() {
    slideInterval = setInterval(nextSlide, 5000);
  }

  function stopAutoSlide() {
    clearInterval(slideInterval);
  }

  // Event Listeners for slider
  if (prevBtn) {
    prevBtn.addEventListener('click', function() {
      stopAutoSlide();
      prevSlide();
      startAutoSlide();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', function() {
      stopAutoSlide();
      nextSlide();
      startAutoSlide();
    });
  }

  // Dot navigation
  dots.forEach((dot, index) => {
    dot.addEventListener('click', function() {
      stopAutoSlide();
      updateSlide(index);
      startAutoSlide();
    });
  });

  // Touch/Swipe support for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  const heroSlider = document.querySelector('.hero-slider');

  if (heroSlider) {
    heroSlider.addEventListener('touchstart', function(e) {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    heroSlider.addEventListener('touchend', function(e) {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
  }

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      stopAutoSlide();
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
      startAutoSlide();
    }
  }

  // Initialize slider
  if (heroSlide) {
    updateSlide(0);
    startAutoSlide();
  }

  // ========================================
  // NOTICE BAR ANIMATION
  // ========================================
  const notices = [
    "Welcome to FutureHub! Explore endless opportunities. New users get 100 points!",
    "New Jobs Added Daily! Check out the latest opportunities.",
    "Free Learning Courses Available! Start learning today.",
    "AI Center Now Live! Try our AI-powered tools.",
    "Marketplace Updated! New products available now."
  ];

  let currentNotice = 0;
  const noticeText = document.querySelector('.notice-text');

  function changeNotice() {
    if (!noticeText) return;

    noticeText.style.opacity = '0';
    
    setTimeout(() => {
      currentNotice = (currentNotice + 1) % notices.length;
      noticeText.textContent = notices[currentNotice];
      noticeText.style.opacity = '1';
    }, 300);
  }

  if (noticeText) {
    noticeText.style.transition = 'opacity 0.3s ease';
    setInterval(changeNotice, 4000);
  }

  // ========================================
  // SEARCH FUNCTIONALITY
  // ========================================
  const searchInput = document.querySelector('.search-input');

  if (searchInput) {
    searchInput.addEventListener('keyup', function(e) {
      const query = this.value.trim();
      
      if (e.key === 'Enter' && query) {
        // Handle search submission
        console.log('Searching for:', query);
        // Add your search logic here
      }
    });

    searchInput.addEventListener('focus', function() {
      this.parentElement.style.boxShadow = '0 0 0 2px rgba(37, 99, 235, 0.2)';
    });

    searchInput.addEventListener('blur', function() {
      this.parentElement.style.boxShadow = 'none';
    });
  }

  // ========================================
  // BOTTOM NAVIGATION
  // ========================================
  const navItems = document.querySelectorAll('.nav-item');

  navItems.forEach(item => {
    item.addEventListener('click', function(e) {
      // Don't prevent default for actual navigation
      // This is for visual feedback only
      
      // Remove active class from all items
      navItems.forEach(nav => nav.classList.remove('active'));
      
      // Add active class to clicked item (except add button)
      if (!this.classList.contains('add-btn')) {
        this.classList.add('active');
      }
    });
  });

  // ========================================
  // MENU CARD HOVER EFFECT (Touch devices)
  // ========================================
  const menuCards = document.querySelectorAll('.menu-card');

  menuCards.forEach(card => {
    card.addEventListener('touchstart', function() {
      this.style.transform = 'translateY(-2px)';
    }, { passive: true });

    card.addEventListener('touchend', function() {
      this.style.transform = 'translateY(0)';
    }, { passive: true });
  });

  // ========================================
  // STATS COUNTER ANIMATION
  // ========================================
  const statValues = document.querySelectorAll('.stat-value');

  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
  };

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const finalValue = target.textContent;
        
        // Animate the value
        target.style.opacity = '0';
        target.style.transform = 'translateY(10px)';
        
        setTimeout(() => {
          target.style.transition = 'all 0.3s ease';
          target.style.opacity = '1';
          target.style.transform = 'translateY(0)';
        }, 100);

        statsObserver.unobserve(target);
      }
    });
  }, observerOptions);

  statValues.forEach(value => {
    statsObserver.observe(value);
  });

  // ========================================
  // SCROLL BEHAVIOR
  // ========================================
  let lastScrollTop = 0;
  const header = document.querySelector('.header');

  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Add shadow to header on scroll
    if (scrollTop > 10) {
      header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
      header.style.boxShadow = '0 2px 12px rgba(0, 0, 0, 0.08)';
    }

    lastScrollTop = scrollTop;
  }, { passive: true });

  // ========================================
  // LAZY LOADING FOR IMAGES
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

  lazyImages.forEach(img => {
    imageObserver.observe(img);
  });

  // ========================================
  // RIPPLE EFFECT FOR BUTTONS
  // ========================================
  function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add('ripple');

    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) {
      ripple.remove();
    }

    button.appendChild(circle);
  }

  const rippleButtons = document.querySelectorAll('.hero-btn, .add-icon');
  rippleButtons.forEach(button => {
    button.addEventListener('click', createRipple);
  });

});
