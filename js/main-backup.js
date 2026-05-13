// Portfolio Site JavaScript

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

  // Event listeners - ensure they exist before adding
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
  }
  if (themeToggleMobile) {
    themeToggleMobile.addEventListener("click", toggleTheme);
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
      mobileMenu.classList.toggle("active");
      const icon = mobileMenuBtn.querySelector("i");
      icon.classList.toggle("fa-bars");
      icon.classList.toggle("fa-times");
    });

    // Close menu when clicking a link
    mobileNavLinks.forEach((link) => {
      link.addEventListener("click", () => {
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

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          // Also support legacy .active class
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -60px 0px",
    },
  );

  elements.forEach((el) => observer.observe(el));
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

// Smooth Scroll for Anchor Links
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

// Contact Form Handler
const initContactForm = () => {
  const form = document.getElementById("contact-form");
  const successMessage = document.getElementById("form-success");
  const submitBtn = form?.querySelector('button[type="submit"]');

  if (form && submitBtn) {
    form.addEventListener("submit", (e) => {
      // Show loading state
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML =
        '<i class="fas fa-spinner fa-spin mr-2"></i> Sending...';
      submitBtn.disabled = true;

      // Netlify Forms will handle the actual submission
      // After successful submission, show success message
      setTimeout(() => {
        form.style.display = "none";
        successMessage.classList.remove("hidden");

        // Reset after 3 seconds
        setTimeout(() => {
          form.reset();
          form.style.display = "block";
          successMessage.classList.add("hidden");
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
        }, 3000);
      }, 1500);
    });
  }
};

// Typing Effect for Hero Section (Optional Enhancement)
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

// Parallax Effect for Hero Section
const initParallax = () => {
  const hero = document.getElementById("hero");
  if (!hero) return;

  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * 0.5;

    // Apply subtle parallax to hero elements
    const heroContent = hero.querySelector(".relative.z-10");
    if (heroContent && scrolled < window.innerHeight) {
      heroContent.style.transform = `translateY(${rate * 0.3}px)`;
    }
  });
};

// Skill Progress Bar Animation
const initSkillProgress = () => {
  const progressBars = document.querySelectorAll(".skill-card .h-2 > div");

  const progressObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const width = entry.target.style.width;
          entry.target.style.width = "0";
          setTimeout(() => {
            entry.target.style.width = width;
          }, 100);
          progressObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 },
  );

  progressBars.forEach((bar) => progressObserver.observe(bar));
};

// Counter Animation for Stats
const initCounterAnimation = () => {
  // Only target stat counters inside the about section, not section headings
  const counters = document.querySelectorAll("#about .text-3xl.font-bold");

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const originalText = counter.textContent.trim();

          // Parse float value (handles "3.45", "2+", "A" etc.)
          const numericMatch = originalText.match(/[\d.]+/);
          if (!numericMatch) return; // skip non-numeric like "A"

          const target = parseFloat(numericMatch[0]);
          const suffix = originalText.replace(/[\d.]+/, "");
          const isDecimal = originalText.includes(".");

          if (isNaN(target)) return;

          let current = 0;
          const steps = 50;
          const increment = target / steps;

          const updateCounter = () => {
            if (current < target) {
              current = Math.min(current + increment, target);
              counter.textContent = isDecimal
                ? current.toFixed(2) + suffix
                : Math.ceil(current) + suffix;
              requestAnimationFrame(updateCounter);
            } else {
              counter.textContent = isDecimal
                ? target.toFixed(2) + suffix
                : target + suffix;
            }
          };

          updateCounter();
          counterObserver.unobserve(counter);
        }
      });
    },
    { threshold: 0.5 },
  );

  counters.forEach((counter) => counterObserver.observe(counter));
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
  initParallax();
  initSkillProgress();
  initCounterAnimation();
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
