// Mukova AI - Premium Interactive Client Engine

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // --- 1. Global Themes & Toggle Handler ---
  const initTheme = () => {
    const isDark = localStorage.getItem('theme') === 'dark' || 
                   (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    if (isDark) {
      document.documentElement.classList.add('dark');
      updateThemeIcons(true);
    } else {
      document.documentElement.classList.remove('dark');
      updateThemeIcons(false);
    }
  };

  const updateThemeIcons = (isDark) => {
    const sunIcons = [document.getElementById('theme-sun-icon'), document.getElementById('theme-sun-icon-mobile')];
    const moonIcons = [document.getElementById('theme-moon-icon'), document.getElementById('theme-moon-icon-mobile')];
    
    sunIcons.forEach(icon => {
      if (icon) {
        if (isDark) icon.classList.remove('hidden');
        else icon.classList.add('hidden');
      }
    });
    
    moonIcons.forEach(icon => {
      if (icon) {
        if (isDark) icon.classList.add('hidden');
        else icon.classList.remove('hidden');
      }
    });
  };

  const toggleTheme = () => {
    document.documentElement.classList.add('theme-transition');
    
    const isCurrentlyDark = document.documentElement.classList.contains('dark');
    if (isCurrentlyDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      updateThemeIcons(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      updateThemeIcons(true);
    }
    
    setTimeout(() => {
      document.documentElement.classList.remove('theme-transition');
    }, 550);
  };

  // Bind Theme Toggles
  document.getElementById('theme-toggle-btn')?.addEventListener('click', toggleTheme);
  document.getElementById('theme-toggle-btn-mobile')?.addEventListener('click', toggleTheme);
  initTheme();

  // Define DOM Elements
  const header = document.getElementById('navbar-header');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu-drawer');
  const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');

  // --- 2. Sticky Header & Scroll Effects ---
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('shadow-md', 'backdrop-blur-lg');
      header.classList.remove('border-transparent');
    } else {
      header.classList.remove('shadow-md', 'backdrop-blur-lg');
    }
  });

  // --- 3. Mobile Drawer Navigation ---
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
      mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
      
      // Toggle menu classes
      mobileMenu.classList.toggle('hidden');
      mobileMenu.classList.toggle('flex');
      document.body.classList.toggle('overflow-hidden');
      
      // Toggle menu button visual representation
      const iconMenu = mobileMenuBtn.querySelector('.icon-menu');
      const iconClose = mobileMenuBtn.querySelector('.icon-close');
      
      if (iconMenu && iconClose) {
        iconMenu.classList.toggle('hidden');
        iconClose.classList.toggle('hidden');
      }
    });

    // Close mobile drawer on link click
    mobileMenuLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('flex');
        document.body.classList.remove('overflow-hidden');
        const iconMenu = mobileMenuBtn.querySelector('.icon-menu');
        const iconClose = mobileMenuBtn.querySelector('.icon-close');
        if (iconMenu && iconClose) {
          iconMenu.classList.remove('hidden');
          iconClose.classList.add('hidden');
        }
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // --- 4. Scroll Reveal Entrance Animations ---
  const scrollRevealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('.reveal-on-scroll').forEach(el => {
    scrollRevealObserver.observe(el);
  });

  // --- 5. Active Nav Link Highlighting on Scroll ---
  const activeSectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        
        // Desktop Highlight
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('text-green-600', 'font-semibold');
            link.classList.remove('text-gray-650', 'text-gray-600', 'dark:text-gray-400');
            link.querySelector('.nav-dot')?.classList.remove('scale-0');
            link.querySelector('.nav-dot')?.classList.add('scale-100');
          } else {
            link.classList.remove('text-green-600', 'font-semibold');
            link.classList.add('text-gray-600', 'dark:text-gray-400');
            link.querySelector('.nav-dot')?.classList.remove('scale-100');
            link.querySelector('.nav-dot')?.classList.add('scale-0');
          }
        });

        // Mobile Highlight
        mobileMenuLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('text-green-600', 'bg-green-50/50', 'dark:bg-green-950/20');
            link.classList.remove('text-gray-700', 'dark:text-gray-300');
          } else {
            link.classList.remove('text-green-600', 'bg-green-50/50', 'dark:bg-green-950/20');
            link.classList.add('text-gray-700', 'dark:text-gray-300');
          }
        });
      }
    });
  }, {
    threshold: 0.25,
    rootMargin: '-10% 0px -55% 0px'
  });

  sections.forEach(section => {
    if (section.getAttribute('id')) {
      activeSectionObserver.observe(section);
    }
  });

  // Immediate Highlight on Click
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      navLinks.forEach(l => {
        l.classList.remove('text-green-600', 'font-semibold');
        l.classList.add('text-gray-600', 'dark:text-gray-400');
        l.querySelector('.nav-dot')?.classList.remove('scale-100');
        l.querySelector('.nav-dot')?.classList.add('scale-0');
      });
      
      this.classList.add('text-green-600', 'font-semibold');
      this.classList.remove('text-gray-600', 'dark:text-gray-400');
      this.querySelector('.nav-dot')?.classList.remove('scale-0');
      this.querySelector('.nav-dot')?.classList.add('scale-100');
    });
  });

  // --- 6. Interactive Testimonial Slider/Carousel ---
  const testimonialTrack = document.getElementById('testimonial-track');
  const testimonialSlides = document.querySelectorAll('.testimonial-slide');
  const prevBtn = document.getElementById('slider-prev');
  const nextBtn = document.getElementById('slider-next');
  const dotsContainer = document.getElementById('slider-dots');

  if (testimonialTrack && testimonialSlides.length > 0) {
    let currentIndex = 0;
    const totalSlides = testimonialSlides.length;
    let autoPlayInterval;

    // Create Carousel Indicator Dots
    dotsContainer.innerHTML = '';
    testimonialSlides.forEach((_, idx) => {
      const dot = document.createElement('button');
      dot.className = `w-3 h-3 rounded-full transition-all duration-300 ${
        idx === 0 ? 'bg-green-600 w-6' : 'bg-gray-300 dark:bg-gray-700 hover:bg-gray-400'
      }`;
      dot.setAttribute('aria-label', `Go to testimonial slide ${idx + 1}`);
      dot.addEventListener('click', () => {
        goToSlide(idx);
        resetAutoPlay();
      });
      dotsContainer.appendChild(dot);
    });

    const updateDots = () => {
      const dots = dotsContainer.querySelectorAll('button');
      dots.forEach((dot, idx) => {
        if (idx === currentIndex) {
          dot.className = 'w-3 h-3 rounded-full transition-all duration-300 bg-green-600 w-6';
        } else {
          dot.className = 'w-3 h-3 rounded-full transition-all duration-300 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400';
        }
      });
    };

    const goToSlide = (index) => {
      currentIndex = (index + totalSlides) % totalSlides;
      const offset = -currentIndex * 100;
      testimonialTrack.style.transform = `translateX(${offset}%)`;
      updateDots();
    };

    const nextSlide = () => {
      goToSlide(currentIndex + 1);
    };

    const prevSlide = () => {
      goToSlide(currentIndex - 1);
    };

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoPlay();
      });
    }
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoPlay();
      });
    }

    const startAutoPlay = () => {
      autoPlayInterval = setInterval(nextSlide, 6000);
    };

    const resetAutoPlay = () => {
      clearInterval(autoPlayInterval);
      startAutoPlay();
    };

    startAutoPlay();

    const carouselContainer = document.getElementById('testimonials-carousel');
    if (carouselContainer) {
      carouselContainer.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
      carouselContainer.addEventListener('mouseleave', startAutoPlay);
    }
  }

  // --- 7. Elegant Toast Notifications ---
  const toast = document.getElementById('toast-notification');
  const toastMessage = document.getElementById('toast-message');

  const showToast = (message, isError = false) => {
    if (!toast || !toastMessage) return;

    toastMessage.textContent = message;
    const toastBody = toast.querySelector('.toast-body');
    if (toastBody) {
      if (isError) {
        toastBody.className = 'toast-body flex items-center gap-3 p-4 bg-red-50 dark:bg-red-950/20 text-red-900 dark:text-red-300 border-l-4 border-red-500 rounded-xl shadow-lg';
      } else {
        toastBody.className = 'toast-body flex items-center gap-3 p-4 bg-green-50 dark:bg-green-950/20 text-green-950 dark:text-green-300 border-l-4 border-green-500 rounded-xl shadow-lg';
      }
    }

    toast.classList.remove('hidden');
    void toast.offsetWidth; // Force reflow
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        toast.classList.add('hidden');
      }, 400);
    }, 4500);
  };

  // --- 8. Search Widget Interactions ---
  const heroSearchBtn = document.getElementById('hero-search-btn');
  const heroSearchInput = document.getElementById('hero-search-input');

  if (heroSearchBtn && heroSearchInput) {
    heroSearchBtn.addEventListener('click', () => {
      const val = heroSearchInput.value.trim();
      if (!val) {
        showToast('Please type your AI project request or question first!', true);
      } else {
        showToast(`Analyzing request: "${val}". We are redirecting you to customized options...`);
        heroSearchInput.value = '';
      }
    });
    
    heroSearchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        heroSearchBtn.click();
      }
    });
  }

  // --- 9. Particle canvas script ---
  const initNeuralCanvas = () => {
    const canvas = document.getElementById('neural-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let particles = [];
    let particleCount = window.innerWidth < 640 ? 30 : 65;
    let mouse = { x: null, y: null, radius: 130 };
    
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', () => {
      resizeCanvas();
      particleCount = window.innerWidth < 640 ? 30 : 65;
    });
    
    canvas.parentElement.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });
    
    canvas.parentElement.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });
    
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.35;
        this.vy = (Math.random() - 0.5) * 0.35;
        this.radius = Math.random() * 2 + 1.2;
        this.baseColor = Math.random() > 0.55 ? '#10b981' : '#34d399';
      }
      
      update() {
        this.x += this.vx;
        this.y += this.vy;
        
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        
        // Mouse magnetism
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.hypot(dx, dy);
          if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius;
            this.x -= dx * force * 0.02;
            this.y -= dy * force * 0.02;
          }
        }
      }
      
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        
        const isDark = document.documentElement.classList.contains('dark');
        ctx.fillStyle = isDark ? this.baseColor : '#16a34a';
        ctx.globalAlpha = isDark ? 0.7 : 0.3;
        ctx.fill();
      }
    }
    
    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    initParticles();
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const isDark = document.documentElement.classList.contains('dark');
      
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      
      // Draw connection lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.hypot(dx, dy);
          
          if (distance < 110) {
            const opacity = (110 - distance) / 110 * (isDark ? 0.15 : 0.06);
            ctx.strokeStyle = isDark ? '#10b981' : '#16a34a';
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.globalAlpha = opacity;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(animate);
    };
    
    animate();
  };

  initNeuralCanvas();

  // --- 10. AI Project Cost Estimator Logic ---
  const initEstimator = () => {
    const compInput = document.getElementById('calc-complexity');
    const compLabel = document.getElementById('calc-complexity-label');
    const dataInput = document.getElementById('calc-datasize');
    const dataLabel = document.getElementById('calc-datasize-label');
    const timeInput = document.getElementById('calc-timeline');
    const timeLabel = document.getElementById('calc-timeline-label');
    
    const tierOutput = document.getElementById('calc-recommended-tier');
    const timeOutput = document.getElementById('calc-match-time');
    const rateOutput = document.getElementById('calc-rate');
    const ctaBtn = document.getElementById('calc-cta-btn');

    if (!compInput || !dataInput || !timeInput) return;

    const compTexts = {
      1: "Prototype / MVP Scope",
      2: "Mid-Scale Enterprise",
      3: "Heavy AI / Neural Arch"
    };

    const dataTexts = {
      1: "Small (< 10 GB)",
      2: "Medium (10 GB - 1 TB)",
      3: "Massive (> 1 TB)"
    };

    const timeTexts = {
      1: "Express (< 2 Weeks)",
      2: "Standard (1 Month)",
      3: "Flexible (3+ Months)"
    };

    const updateCalculations = () => {
      const compVal = parseInt(compInput.value);
      const dataVal = parseInt(dataInput.value);
      const timeVal = parseInt(timeInput.value);

      compLabel.textContent = compTexts[compVal];
      dataLabel.textContent = dataTexts[dataVal];
      timeLabel.textContent = timeTexts[timeVal];

      // Sourcing Match Time
      let matchTime = "< 48 Hours";
      if (timeVal === 1) matchTime = "< 12 Hours";
      else if (timeVal === 2) matchTime = "< 24 Hours";
      timeOutput.textContent = matchTime;

      // Recommended Tier Sorter
      let recommended = "Guided Matching";
      if (compVal === 1 && dataVal === 1) {
        recommended = "Self-Service";
      } else if (compVal === 3 || dataVal === 3) {
        recommended = "Full Project Mgmt";
      }
      tierOutput.textContent = recommended;

      // Rate Calculator
      let baseRate = 85;
      if (compVal === 2) baseRate += 40;
      else if (compVal === 3) baseRate += 85;

      if (dataVal === 2) baseRate += 15;
      else if (dataVal === 3) baseRate += 35;

      if (timeVal === 1) baseRate += 20;
      else if (timeVal === 3) baseRate -= 10;

      rateOutput.textContent = `$${baseRate} / hr`;
    };

    compInput.addEventListener('input', updateCalculations);
    dataInput.addEventListener('input', updateCalculations);
    timeInput.addEventListener('input', updateCalculations);
    updateCalculations();

    if (ctaBtn) {
      ctaBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const tier = tierOutput.textContent;
        const rate = rateOutput.textContent;
        showToast(`Preferences captured: Sourcing matching ${tier} architects at ${rate}...`);
        
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
          const subjectInput = document.getElementById('contact-subject');
          if (subjectInput) {
            subjectInput.value = `AI Matching Sourcing Request: ${tier} (${rate})`;
          }
        }
      });
    }
  };

  initEstimator();

  // --- 11. Animated File Upload Interactions ---
  const setupDragAndDrop = (dropZoneId, fileInputId, feedbackId, clearBtnId, progressContainerId, progressPercentId, progressBarId, filenameId) => {
    const dropZone = document.getElementById(dropZoneId);
    const fileInput = document.getElementById(fileInputId);
    const feedback = document.getElementById(feedbackId);
    const clearBtn = document.getElementById(clearBtnId);
    
    const progressContainer = document.getElementById(progressContainerId);
    const progressPercent = document.getElementById(progressPercentId);
    const progressBar = document.getElementById(progressBarId);
    const filenameLabel = document.getElementById(filenameId);

    if (!dropZone || !fileInput || !feedback) return;

    dropZone.addEventListener('click', () => fileInput.click());

    dropZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropZone.classList.add('border-green-500', 'bg-green-50/30', 'dark:bg-green-950/10');
    });

    dropZone.addEventListener('dragleave', () => {
      dropZone.classList.remove('border-green-500', 'bg-green-50/30', 'dark:bg-green-950/10');
    });

    dropZone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropZone.classList.remove('border-green-500', 'bg-green-50/30', 'dark:bg-green-950/10');
      
      const files = e.dataTransfer.files;
      if (files.length > 0) {
        fileInput.files = files;
        handleFileSelect(files[0]);
      }
    });

    fileInput.addEventListener('change', () => {
      if (fileInput.files.length > 0) {
        handleFileSelect(fileInput.files[0]);
      }
    });

    const handleFileSelect = (file) => {
      if (progressContainer && progressPercent && progressBar && filenameLabel) {
        feedback.classList.add('hidden');
        progressContainer.classList.remove('hidden');
        progressContainer.classList.add('flex');
        filenameLabel.textContent = file.name;
        dropZone.style.pointerEvents = 'none';

        let percentage = 0;
        progressBar.style.width = '0%';
        progressPercent.textContent = '0%';
        progressBar.classList.remove('bg-emerald-500');
        progressBar.classList.add('bg-green-600');

        const interval = setInterval(() => {
          percentage += Math.floor(Math.random() * 15) + 5;
          if (percentage >= 100) {
            percentage = 100;
            clearInterval(interval);
            
            progressBar.classList.remove('bg-green-600');
            progressBar.classList.add('bg-emerald-500');
            progressPercent.innerHTML = '<span class="text-green-600 dark:text-green-400 font-bold flex items-center gap-1"><i data-lucide="check" class="w-3.5 h-3.5 inline"></i> Scanned</span>';
            if (typeof lucide !== 'undefined') lucide.createIcons();
            
            dropZone.style.pointerEvents = 'auto';
            if (clearBtn) clearBtn.classList.remove('hidden');
            showToast(`"${file.name}" uploaded and parsed successfully!`);
          }
          progressBar.style.width = `${percentage}%`;
          if (percentage < 100) {
            progressPercent.textContent = `${percentage}%`;
          }
        }, 120);
      } else {
        feedback.classList.remove('text-gray-500');
        feedback.classList.add('text-green-600', 'font-semibold');
        feedback.innerHTML = `
          <div class="flex items-center justify-center gap-2">
            <i data-lucide="file-check" class="w-5 h-5"></i>
            <span>${file.name} (${(file.size / 1024).toFixed(1)} KB)</span>
          </div>
        `;
        if (typeof lucide !== 'undefined') lucide.createIcons();
        if (clearBtn) clearBtn.classList.remove('hidden');
      }
    };

    if (clearBtn) {
      clearBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        fileInput.value = '';
        clearBtn.classList.add('hidden');
        
        if (progressContainer) {
          progressContainer.classList.add('hidden');
          progressContainer.classList.remove('flex');
        }
        feedback.classList.remove('hidden');
        feedback.classList.add('text-gray-500');
        feedback.classList.remove('text-green-600', 'font-semibold');
        feedback.innerHTML = `
          <div class="w-10 h-10 rounded-xl bg-gray-50 dark:bg-gray-850 flex items-center justify-center text-gray-400 dark:text-gray-505 group-hover:bg-green-50 dark:group-hover:bg-green-950/30 group-hover:text-green-600 dark:group-hover:text-green-400 transition-all">
            <i data-lucide="file-text" class="w-5 h-5"></i>
          </div>
          <span>Drag and drop resume here, or <span class="text-green-600 dark:text-green-400 font-medium">browse</span></span>
        `;
        if (typeof lucide !== 'undefined') lucide.createIcons();
      });
    }
  };

  setupDragAndDrop(
    'provider-upload-zone', 
    'provider-file-input', 
    'provider-upload-feedback', 
    'provider-upload-clear',
    'provider-upload-progress',
    'provider-progress-percent',
    'provider-progress-bar',
    'provider-progress-filename'
  );

  // --- 12. Floating AI Chatbot Sorter ---
  const initChatbot = () => {
    const launcher = document.getElementById('chatbot-launcher');
    const panel = document.getElementById('chatbot-panel');
    const closeBtn = document.getElementById('chatbot-close');
    const messagesContainer = document.getElementById('chatbot-messages');
    const chipsContainer = document.getElementById('chatbot-chips');
    const chatForm = document.getElementById('chatbot-form');
    const chatInput = document.getElementById('chatbot-input');
    const badge = document.getElementById('chatbot-badge');

    if (!launcher || !panel || !messagesContainer) return;

    launcher.addEventListener('click', () => {
      panel.classList.toggle('hidden');
      panel.classList.toggle('flex');
      
      if (badge) badge.classList.add('hidden');
      if (panel.classList.contains('flex')) {
        chatInput.focus();
        scrollToBottom();
      }
    });

    closeBtn.addEventListener('click', () => {
      panel.classList.add('hidden');
      panel.classList.remove('flex');
    });

    const scrollToBottom = () => {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    };

    const appendMessage = (sender, text) => {
      const msgDiv = document.createElement('div');
      const isBot = sender === 'bot';
      msgDiv.className = `flex gap-2 items-start max-w-[85%] text-left ${isBot ? '' : 'ml-auto flex-row-reverse'}`;
      
      const avatarHTML = isBot 
        ? `<div class="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
             <i data-lucide="bot" class="w-4 h-4"></i>
           </div>`
        : `<div class="w-7 h-7 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-650 dark:text-gray-450 flex items-center justify-center shrink-0">
             <i data-lucide="user" class="w-4 h-4"></i>
           </div>`;

      const bubbleClass = isBot
        ? 'bg-white dark:bg-gray-850 border border-gray-150 dark:border-gray-800 text-gray-800 dark:text-gray-200'
        : 'bg-green-600 text-white';

      msgDiv.innerHTML = `
        ${avatarHTML}
        <div class="${bubbleClass} p-3 rounded-2xl ${isBot ? 'rounded-tl-none' : 'rounded-tr-none'} shadow-sm leading-relaxed">
          ${text}
        </div>
      `;

      messagesContainer.appendChild(msgDiv);
      if (typeof lucide !== 'undefined') lucide.createIcons();
      scrollToBottom();
    };

    const showTypingIndicator = () => {
      const typingDiv = document.createElement('div');
      typingDiv.id = 'bot-typing-indicator';
      typingDiv.className = 'flex gap-2 items-start max-w-[85%] text-left';
      typingDiv.innerHTML = `
        <div class="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
          <i data-lucide="bot" class="w-4 h-4"></i>
        </div>
        <div class="bg-white dark:bg-gray-850 border border-gray-150 dark:border-gray-800 text-gray-800 dark:text-gray-200 p-3 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-1.5 py-4">
          <span class="w-1.5 h-1.5 bg-gray-400 dark:bg-gray-600 rounded-full animate-bounce" style="animation-delay: 0s"></span>
          <span class="w-1.5 h-1.5 bg-gray-400 dark:bg-gray-600 rounded-full animate-bounce" style="animation-delay: 0.2s"></span>
          <span class="w-1.5 h-1.5 bg-gray-400 dark:bg-gray-600 rounded-full animate-bounce" style="animation-delay: 0.4s"></span>
        </div>
      `;
      messagesContainer.appendChild(typingDiv);
      if (typeof lucide !== 'undefined') lucide.createIcons();
      scrollToBottom();
      return typingDiv;
    };

    const handleBotResponse = (userText) => {
      const cleanText = userText.toLowerCase().trim();
      const typingIndicator = showTypingIndicator();
      
      let answer = "Thank you for asking! I can assist you with vetting details, service tiers, or custom consultations. Could you clarify your project requirements?";
      
      if (cleanText.includes('vetting') || cleanText.includes('how vetting works') || cleanText.includes('vetted') || cleanText.includes('works')) {
        answer = "Our expert matching network ensures code security and engineering validity. Each machine learning developer passes a strict 4-stage process: deep resume review, custom sandbox coding audits, live interviews, and reference checks. Only the top 1.2% are admitted.";
      } else if (cleanText.includes('price') || cleanText.includes('pricing') || cleanText.includes('cost') || cleanText.includes('rate')) {
        answer = "Mukova AI rates are milestone-based, ranging from **$85/hr** up to **$180/hr** for custom neural layers. Check out our **AI Project Estimator** widget in the Hero section above to adjust your preferences and see custom estimations!";
      } else if (cleanText.includes('consultation') || cleanText.includes('book') || cleanText.includes('talk') || cleanText.includes('contact') || cleanText.includes('whatsapp') || cleanText.includes('representative')) {
        answer = "You can schedule a private session with our Lead Architect by starting a WhatsApp chat (+263 78 526 1617) or emailing architects@mukova.ai. Standard response time is under 2 hours!";
      } else if (cleanText.includes('apply') || cleanText.includes('provider') || cleanText.includes('join') || cleanText.includes('job') || cleanText.includes('developer')) {
        answer = "We are always looking for elite ML and MLOps talent! Feel free to scroll down to the **Apply as a Mukova Provider** section and drop your resume. Our audit team will review it within 24 hours.";
      } else if (cleanText.includes('hello') || cleanText.includes('hi') || cleanText.includes('hey')) {
        answer = "Hello! Nice to meet you. How is your AI product development going? Let me know if you have questions about matching experts, security, or rates.";
      }

      setTimeout(() => {
        typingIndicator.remove();
        appendMessage('bot', answer);
      }, 1000 + Math.random() * 800);
    };

    const chipBtns = chipsContainer.querySelectorAll('.chip-btn');
    chipBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const text = btn.textContent.trim();
        appendMessage('user', text);
        handleBotResponse(text);
      });
    });

    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = chatInput.value.trim();
      if (!val) return;

      appendMessage('user', val);
      chatInput.value = '';
      
      handleBotResponse(val);
    });
  };

  initChatbot();

  // --- 13. Provider Signup Form Validation & Submission Mock ---
  const providerForm = document.getElementById('provider-signup-form');
  if (providerForm) {
    providerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('provider-name').value.trim();
      const email = document.getElementById('provider-email').value.trim();
      const phone = document.getElementById('provider-phone').value.trim();
      const expertise = document.getElementById('provider-expertise').value;
      const message = document.getElementById('provider-message').value.trim();

      if (!name || !email || !phone || !expertise || !message) {
        showToast('Please fill out all required fields before submitting!', true);
        return;
      }

      if (!validateEmail(email)) {
        showToast('Please enter a valid email address!', true);
        return;
      }

      // Build WhatsApp message including attachment if present
      let waMessage = `Hello Mukova AI, I would like to get listed as a service provider ($1/mo).\n\nName: ${name}\nEmail: ${email}\nPhone/WhatsApp: ${phone}\nExpertise: ${expertise}\nMessage: ${message}`;
      const providerFileInput = document.getElementById('provider-file-input');
      if (providerFileInput && providerFileInput.files.length > 0) {
        const fileName = providerFileInput.files[0].name;
        waMessage += `\n\nI will also be sending my CV/attachment (${fileName}) in this chat shortly.`;
      }
      const encoded = encodeURIComponent(waMessage);
      window.open(`https://wa.me/263785261617?text=${encoded}`, '_blank');

      showToast('Application submitted! Opening WhatsApp...');
      providerForm.reset();
      
      const uploaderFeedback = document.getElementById('provider-upload-feedback');
      const uploaderClear = document.getElementById('provider-upload-clear');
      const uploaderProgress = document.getElementById('provider-upload-progress');
      
      if (uploaderFeedback) {
        uploaderFeedback.classList.remove('hidden');
        uploaderFeedback.className = 'flex flex-col items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400';
        uploaderFeedback.innerHTML = `
          <div class="w-10 h-10 rounded-xl bg-gray-50 dark:bg-gray-850 flex items-center justify-center text-gray-400 dark:text-gray-505 group-hover:bg-green-50 dark:group-hover:bg-green-950/30 group-hover:text-green-600 dark:group-hover:text-green-400 transition-all">
            <i data-lucide="file-text" class="w-5 h-5"></i>
          </div>
          <span>Drag and drop resume here, or <span class="text-green-600 dark:text-green-400 font-medium">browse</span></span>
        `;
      }
      if (uploaderProgress) {
        uploaderProgress.classList.add('hidden');
        uploaderProgress.classList.remove('flex');
      }
      if (uploaderClear) {
        uploaderClear.classList.add('hidden');
      }
      if (typeof lucide !== 'undefined') lucide.createIcons();
    });
  }

  // --- 14. Contact Form Validation & Submission Mock ---
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const subject = document.getElementById('contact-subject').value.trim();
      const message = document.getElementById('contact-message').value.trim();

      if (!name || !email || !subject || !message) {
        showToast('Please fill out all contact fields!', true);
        return;
      }

      if (!validateEmail(email)) {
        showToast('Please enter a valid email address!', true);
        return;
      }

      showToast(`Thank you, ${name}! Your message regarding "${subject}" has been successfully sent. We'll reply shortly.`);
      contactForm.reset();
    });
  }

  // --- 15. Hero File Upload & WhatsApp Submit Mock ---
  const heroUploadZone = document.getElementById('hero-upload-zone');
  const heroFileInput = document.getElementById('hero-file-input');
  const heroUploadFeedback = document.getElementById('hero-upload-feedback');
  const heroUploadClear = document.getElementById('hero-upload-clear');
  const submitWhatsappBtn = document.getElementById('submit-whatsapp-btn');
  const heroSearchInput = document.getElementById('hero-search-input');
  
  let currentHeroFile = null;

  if (heroUploadZone && heroFileInput) {
    heroUploadZone.addEventListener('click', (e) => {
      if (e.target !== heroUploadClear && e.target.closest('#hero-upload-clear') === null) {
        heroFileInput.click();
      }
    });

    heroUploadZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      heroUploadZone.classList.add('border-green-400', 'bg-white', 'dark:bg-gray-950');
    });

    heroUploadZone.addEventListener('dragleave', (e) => {
      e.preventDefault();
      heroUploadZone.classList.remove('border-green-400', 'bg-white', 'dark:bg-gray-950');
    });

    heroUploadZone.addEventListener('drop', (e) => {
      e.preventDefault();
      heroUploadZone.classList.remove('border-green-400', 'bg-white', 'dark:bg-gray-950');
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        handleHeroFile(e.dataTransfer.files[0]);
      }
    });

    heroFileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files.length > 0) {
        handleHeroFile(e.target.files[0]);
      }
    });
    
    if (heroUploadClear) {
      heroUploadClear.addEventListener('click', (e) => {
        e.stopPropagation();
        heroFileInput.value = '';
        currentHeroFile = null;
        
        heroUploadFeedback.innerHTML = `
          <div class="w-10 h-10 rounded-xl bg-gray-50 dark:bg-gray-850 flex items-center justify-center text-gray-400 dark:text-gray-500 group-hover:bg-green-50 dark:group-hover:bg-green-950/50 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
            <i data-lucide="upload-cloud" class="w-5 h-5"></i>
          </div>
          <span>Drag and drop project details here, or <span class="text-green-600 dark:text-green-400 font-medium">browse</span></span>
        `;
        heroUploadClear.classList.add('hidden');
        if (typeof lucide !== 'undefined') lucide.createIcons();
      });
    }
  }

  function handleHeroFile(file) {
    currentHeroFile = file;
    const fileSize = (file.size / 1024 / 1024).toFixed(2);
    
    heroUploadFeedback.innerHTML = `
      <div class="flex items-center gap-3 w-full bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 p-2.5 rounded-xl shadow-sm text-left">
        <div class="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-950/50 flex items-center justify-center text-green-600 dark:text-green-400 shrink-0">
          <i data-lucide="file" class="w-4 h-4"></i>
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-xs font-semibold text-gray-800 dark:text-gray-200 truncate">${file.name}</p>
          <p class="text-[10px] text-gray-400 dark:text-gray-500 font-medium">${fileSize} MB - Ready for secure transmission</p>
        </div>
      </div>
    `;
    if (heroUploadClear) heroUploadClear.classList.remove('hidden');
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }

  if (submitWhatsappBtn) {
    submitWhatsappBtn.addEventListener('click', (e) => {
      e.preventDefault();
      
      let message = "Hello Mukova AI, I would like to request a service provider ($2).";
      const query = heroSearchInput ? heroSearchInput.value.trim() : "";
      
      if (query) {
        message += `\n\nProject details: ${query}`;
      }
      
      if (currentHeroFile) {
        message += `\n\n(I have a file ready to send: *${currentHeroFile.name}*. I will upload it here in the chat once you reply.)`;
      }
      
      const encodedMessage = encodeURIComponent(message);
      window.open(`https://wa.me/263785261617?text=${encodedMessage}`, '_blank');
    });
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }
});
