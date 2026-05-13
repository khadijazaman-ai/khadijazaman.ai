// Portfolio Site JavaScript
// Premium Interaction & Animation Orchestrator

// Theme Toggle Functionality
const initTheme = () => {
  const themeToggle = document.getElementById("theme-toggle");
  const themeToggleMobile = document.getElementById("theme-toggle-mobile");
  const html = document.documentElement;

  // Check for saved theme preference or system preference
  const getTheme = () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) return savedTheme;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  // Apply theme
  const applyTheme = (theme) => {
    if (theme === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  };

  // Toggle theme
  const toggleTheme = () => {
    const currentTheme = html.classList.contains("dark") ? "dark" : "light";
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    applyTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // Initialize theme
  applyTheme(getTheme());

  // Event listeners - ensure they exist before adding and prevent duplicate bindings
  if (themeToggle && !themeToggle.dataset.themeBound) {
    themeToggle.addEventListener("click", toggleTheme);
    themeToggle.dataset.themeBound = "true";
  }
  if (themeToggleMobile && !themeToggleMobile.dataset.themeBound) {
    themeToggleMobile.addEventListener("click", toggleTheme);
    themeToggleMobile.dataset.themeBound = "true";
  }

  // Listen for system theme changes
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      if (!localStorage.getItem("theme")) {
        applyTheme(e.matches ? "dark" : "light");
      }
    });
};

// Mobile Menu Toggle
const initMobileMenu = () => {
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      const isOpen = !mobileMenu.classList.contains("hidden");
      if (isOpen) {
        mobileMenu.classList.add("hidden");
        mobileMenu.classList.remove("active");
      } else {
        mobileMenu.classList.remove("hidden");
        mobileMenu.classList.add("active");
      }
      const icon = mobileMenuBtn.querySelector("i");
      icon.classList.toggle("fa-bars");
      icon.classList.toggle("fa-times");
    });

    mobileNavLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
        mobileMenu.classList.remove("active");
        const icon = mobileMenuBtn.querySelector("i");
        icon.classList.add("fa-bars");
        icon.classList.remove("fa-times");
      });
    });
  }
};

// Active Navigation State on Scroll
const initActiveNav = () => {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  const observerOptions = {
    root: null,
    rootMargin: "-20% 0px -80% 0px",
    threshold: 0,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach((section) => observer.observe(section));
};

// Scroll Reveal Animation - unified observer for all animated elements
const initScrollReveal = () => {
  const animClasses = [
    ".anim-fade-up",
    ".anim-fade-down",
    ".anim-slide-left",
    ".anim-slide-right",
    ".anim-scale",
    ".anim-flip",
    ".skill-card",
    ".project-card",
    ".timeline-item",
    ".section-title-line",
  ];

  const elements = document.querySelectorAll(animClasses.join(","));

  if (!window.IntersectionObserver) {
    elements.forEach((el) => el.classList.add("in-view", "active"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = parseInt(entry.target.dataset.obsDelay || "0", 10);
          if (delay) {
            setTimeout(() => {
              entry.target.classList.add("in-view", "active");
            }, delay);
          } else {
            entry.target.classList.add("in-view", "active");
          }
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.05,
      rootMargin: "0px 0px -20px 0px",
    },
  );

  elements.forEach((el) => {
    observer.observe(el);
  });
};

// Navbar Background on Scroll
const initNavbarScroll = () => {
  const nav = document.querySelector("nav");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      nav.classList.add("shadow-md");
    } else {
      nav.classList.remove("shadow-md");
    }
  });
};

// Smooth Scroll for Anchor Links (accounts for 80px fixed header offset)
const initSmoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        const offset = 80; // Account for fixed navbar
        const targetPosition =
          target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
};

// Notification system
const showNotification = (message, type = "info") => {
  // Create notification element
  const notification = document.createElement("div");
  notification.className = `fixed top-24 right-6 px-6 py-4 rounded-xl shadow-lg z-50 transform translate-x-full transition-transform duration-300 font-medium backdrop-blur-md border`;
  
  // Style based on type
  if (type === "success") {
    notification.classList.add("bg-green-500/95", "text-white", "border-green-400/20");
  } else if (type === "error") {
    notification.classList.add("bg-red-500/95", "text-white", "border-red-400/20");
  } else {
    notification.classList.add("bg-indigo-600/95", "text-white", "border-indigo-400/20");
  }
  
  // Icon + Message layout
  const icon = type === "success" 
    ? '<i class="fas fa-check-circle mr-2"></i>' 
    : type === "error" 
      ? '<i class="fas fa-exclamation-circle mr-2"></i>' 
      : '<i class="fas fa-info-circle mr-2"></i>';
      
  notification.innerHTML = `<div class="flex items-center">${icon}<span>${message}</span></div>`;
  
  // Add to DOM
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.classList.remove("translate-x-full");
  }, 100);
  
  // Remove after 3.5 seconds
  setTimeout(() => {
    notification.classList.add("translate-x-full");
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3500);
};

// Contact Form Handler with premium spinner and netlify compatibility
const initContactForm = () => {
  const form = document.getElementById("contact-form");
  const successMessage = document.getElementById("form-success");
  const submitBtn = form?.querySelector('button[type="submit"]');

  if (form && submitBtn) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      // Get form data
      const name = form.querySelector('input[name="name"]')?.value;
      const email = form.querySelector('input[name="email"]')?.value;
      const message = form.querySelector('textarea[name="message"]')?.value;

      // Simple validation
      if (!name || !email || !message) {
        showNotification("Please fill in all fields", "error");
        return;
      }

      // Show loading state
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Sending...';
      submitBtn.disabled = true;

      // AJAX Form Submission for Netlify
      const formData = new FormData(form);
      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString(),
      })
        .then((response) => {
          if (response.ok) {
            form.style.display = "none";
            successMessage.classList.remove("hidden");
            showNotification("Message sent successfully!", "success");

            // Reset after 4 seconds
            setTimeout(() => {
              form.reset();
              form.style.display = "block";
              successMessage.classList.add("hidden");
              submitBtn.innerHTML = originalText;
              submitBtn.disabled = false;
            }, 4000);
          } else {
            throw new Error("Form submission failed");
          }
        })
        .catch((error) => {
          console.error(error);
          showNotification("Oops! Something went wrong. Please try again.", "error");
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
        });
    });
  }
};

// Typing Effect for Hero Section
const initTypingEffect = () => {
  const typingElement = document.querySelector(".typing-text");
  if (!typingElement) return;

  const text = typingElement.textContent;
  typingElement.textContent = "";

  let i = 0;
  const typeWriter = () => {
    if (i < text.length) {
      typingElement.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
    }
  };

  // Start typing after a delay
  setTimeout(typeWriter, 1000);
};

// Parallax Effect for Hero and Background Elements
const initHeroParallax = () => {
  const hero = document.getElementById("hero");
  const parallaxElements = document.querySelectorAll("[data-parallax]");

  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;

    // Apply subtle parallax to hero elements
    if (hero) {
      const heroContent = hero.querySelector(".relative.z-10");
      if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.15}px)`;
      }
    }

    // Apply parallax to generic data-parallax elements
    parallaxElements.forEach((element) => {
      const speed = parseFloat(element.getAttribute("data-parallax")) || 0.5;
      const yPos = -(scrolled * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
  });
};

// Scroll Progress Bar + Back to Top button
const initScrollExtras = () => {
  const progressBar = document.getElementById('scroll-progress');
  const backToTop = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (progressBar) progressBar.style.width = pct + '%';
    if (backToTop) {
      if (scrollTop > 400) backToTop.classList.add('visible');
      else backToTop.classList.remove('visible');
    }
  });

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
};

// =============================================
// ULTRA PREMIUM INTERACTIVE ANIMATIONS
// =============================================

// 3D Card Tilt on Mousemove
const init3DTilt = () => {
  const cards = document.querySelectorAll('.skill-card, .project-card, .premium-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px) scale(1.02)`;
      card.style.transition = 'transform 0.1s ease';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.6s cubic-bezier(0.22,1,0.36,1)';
    });
  });
};

// Magnetic effect on main action buttons
const initMagnetic = () => {
  const btns = document.querySelectorAll('a[href="#projects"], a[href="#contact"], #back-to-top');
  btns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
      btn.style.transition = 'transform 0.15s ease';
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
      btn.style.transition = 'transform 0.5s cubic-bezier(0.22,1,0.36,1)';
    });
  });
};

// Premium Particle burst effect on button click
const initParticles = () => {
  const createParticle = (x, y, color) => {
    const particle = document.createElement('div');
    const angle = Math.random() * Math.PI * 2;
    const distance = 60 + Math.random() * 80;
    particle.style.cssText = `
      position:fixed;left:${x}px;top:${y}px;
      width:${4 + Math.random() * 6}px;height:${4 + Math.random() * 6}px;
      border-radius:50%;background:${color};pointer-events:none;z-index:9999;
      --tx:${Math.cos(angle) * distance}px;--ty:${Math.sin(angle) * distance}px;
      animation:particle-burst 0.8s cubic-bezier(0.22,1,0.36,1) forwards;
    `;
    document.body.appendChild(particle);
    setTimeout(() => particle.remove(), 800);
  };

  document.querySelectorAll('a.px-8, button[type="submit"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const colors = ['#6366f1','#8b5cf6','#a78bfa','#c4b5fd','#e879f9'];
      for (let i = 0; i < 12; i++) {
        setTimeout(() => {
          createParticle(e.clientX, e.clientY, colors[Math.floor(Math.random() * colors.length)]);
        }, i * 30);
      }
    });
  });
};

// Staggered text word reveal for section titles
const initTextReveal = () => {
  const headings = document.querySelectorAll('h3.section-title-line');
  headings.forEach(h => {
    if (h.dataset.revealed) return;
    h.dataset.revealed = '1';
    const words = h.textContent.trim().split(' ');
    h.innerHTML = words.map((w, i) =>
      `<span class="inline-block overflow-hidden" style="vertical-align:bottom;">
        <span class="inline-block anim-fade-up" style="transition-delay:${0.1 + i * 0.08}s">${w}</span>
      </span>${i < words.length - 1 ? ' ' : ''}`
    ).join('');
  });
};

// Subtle background Cursor glow trail
const initCursorGlow = () => {
  const glow = document.createElement('div');
  glow.id = 'cursor-glow';
  glow.style.cssText = `
    position:fixed;width:300px;height:300px;border-radius:50%;
    background:radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%);
    pointer-events:none;z-index:0;transform:translate(-50%,-50%);
    transition:left 0.15s ease,top 0.15s ease;
  `;
  document.body.appendChild(glow);
  document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });
};

// Stagger skill bar animation with premium easing delays
const initSkillBarsStagger = () => {
  const skillCards = document.querySelectorAll('.skill-card');
  skillCards.forEach((card) => {
    const bars = card.querySelectorAll('.h-2 > div');
    bars.forEach((bar, barIdx) => {
      const targetWidth = bar.style.width;
      bar.style.width = '0';
      bar.style.transition = `width 1.4s cubic-bezier(0.22,1,0.36,1) ${0.3 + barIdx * 0.15}s`;
      const obs = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          bar.style.width = targetWidth;
          obs.disconnect();
        }
      }, { threshold: 0.3 });
      obs.observe(card);
    });
  });
};

// Premium numeric counter with quartic easing
const initCounters = () => {
  document.querySelectorAll('#about .text-3xl.font-bold').forEach(el => {
    const raw = el.textContent.trim();
    const match = raw.match(/[\d.]+/);
    if (!match) return;
    const target = parseFloat(match[0]);
    const suffix = raw.replace(/[\d.]+/, '');
    const isFloat = raw.includes('.');
    if (isNaN(target)) return;

    const obs = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) return;
      obs.disconnect();
      let start = null;
      const duration = 1800;
      const step = (ts) => {
        if (!start) start = ts;
        const progress = Math.min((ts - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 4); // ease-out-quart
        const current = eased * target;
        el.textContent = (isFloat ? current.toFixed(2) : Math.ceil(current)) + suffix;
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = (isFloat ? target.toFixed(2) : target) + suffix;
      };
      requestAnimationFrame(step);
    }, { threshold: 0.5 });
    obs.observe(el);
  });
};

// Initialize All Functions
const init = () => {
  initTheme();
  initMobileMenu();
  initActiveNav();
  initScrollReveal();
  initNavbarScroll();
  initSmoothScroll();
  initContactForm();
  initHeroParallax();
  initScrollExtras();
  // Ultra premium animations
  init3DTilt();
  initMagnetic();
  initParticles();
  initTextReveal();
  initCursorGlow();
  initSkillBarsStagger();
  initCounters();
};

// Run when DOM is ready
document.addEventListener("DOMContentLoaded", init);
// Re-run on page show (handles back/forward navigation)
window.addEventListener("pageshow", () => {
  initTheme();
});

// Export functions for testing (if needed)
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    initTheme,
    initMobileMenu,
    initScrollReveal,
    initContactForm,
  };
}
