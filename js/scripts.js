// Modern Hero slideshow functionality
let currentHeroSlide = 0;
let isHeroTransitioning = false;
let heroSlides = [];
let totalHeroSlides = 0;

function showHeroSlide(index) {
  if (isHeroTransitioning || totalHeroSlides === 0) return;

  isHeroTransitioning = true;
  const currentActiveHero = document.querySelector(".hero-slide.active");
  const nextHeroSlide = heroSlides[index];

  if (
    currentActiveHero &&
    nextHeroSlide &&
    currentActiveHero !== nextHeroSlide
  ) {
    // Fade out current slide
    currentActiveHero.classList.remove("active");

    // Fade in next slide
    setTimeout(() => {
      nextHeroSlide.classList.add("active");
      isHeroTransitioning = false;
    }, 100);
  } else if (nextHeroSlide && !currentActiveHero) {
    // First slide
    nextHeroSlide.classList.add("active");
    isHeroTransitioning = false;
  } else {
    isHeroTransitioning = false;
  }
}

function nextHeroSlide() {
  currentHeroSlide = (currentHeroSlide + 1) % totalHeroSlides;
  showHeroSlide(currentHeroSlide);
}

// Modern About section carousel functionality
let currentSlide = 0;
let isTransitioning = false;
const slides = document.querySelectorAll(".about-slide");
const totalSlides = slides.length;

function showSlide(index) {
  // Prevent multiple transitions at once
  if (isTransitioning) return;

  isTransitioning = true;
  const currentActiveSlide = document.querySelector(".about-slide.active");
  const nextSlide = slides[index];

  if (currentActiveSlide && nextSlide && currentActiveSlide !== nextSlide) {
    // Start fade out of current slide
    currentActiveSlide.classList.add("fade-out");
    currentActiveSlide.classList.remove("active");

    // After fade out completes, show new slide
    setTimeout(() => {
      // Remove fade-out class and reset position
      currentActiveSlide.classList.remove("fade-out");

      // Show new slide
      nextSlide.classList.add("active");

      // Reset transition flag after new slide is fully visible
      setTimeout(() => {
        isTransitioning = false;
      }, 600); // Match the CSS transition duration
    }, 300); // Half the fade-out duration
  } else if (nextSlide && !currentActiveSlide) {
    // First slide or no current slide
    nextSlide.classList.add("active");
    setTimeout(() => {
      isTransitioning = false;
    }, 600);
  } else {
    isTransitioning = false;
  }
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  showSlide(currentSlide);
}

// Modern scroll-based navbar effects
function handleNavbarScroll() {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 100) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  // Update active navigation link based on current section
  updateActiveNavLink();
}

// Function to update active navigation link based on current section
function updateActiveNavLink() {
  const sections = document.querySelectorAll("section[id], .hero-section");
  const navLinks = document.querySelectorAll(".nav-link[data-section]");
  const scrollPosition = window.scrollY + 150; // Offset for navbar height

  let currentSection = "home"; // Default to home

  // Check which section is currently in view
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      if (section.classList.contains("hero-section")) {
        currentSection = "home";
      } else {
        currentSection = section.id;
      }
    }
  });

  // Update active class on navigation links
  navLinks.forEach((link) => {
    const linkSection = link.getAttribute("data-section");
    if (linkSection === currentSection) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

// Enhanced scroll-based section animations
function setupScrollAnimations() {
  // Setup section-based animations
  setupSectionAnimations();

  // Setup existing element animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");

        // Add staggered animation for product cards
        if (
          entry.target.classList.contains("product-card") ||
          entry.target.classList.contains("product-card-horizontal")
        ) {
          const cards = document.querySelectorAll(
            ".product-card, .product-card-horizontal"
          );
          cards.forEach((card, index) => {
            setTimeout(() => {
              card.classList.add("slide-up");
            }, index * 100);
          });
        }
      }
    });
  }, observerOptions);

  // Observe elements for animation
  document
    .querySelectorAll(
      ".product-card, .product-card-horizontal, .about-slide, .feature-card"
    )
    .forEach((el) => {
      observer.observe(el);
    });
}

// Section-based scroll animations
function setupSectionAnimations() {
  const sections = document.querySelectorAll(
    ".hero-section, #about, #news, #products, #contact"
  );

  // Add animation class to all sections
  sections.forEach((section) => {
    section.classList.add("section-animated");
  });

  // Create intersection observer for center detection
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const section = entry.target;
        const rect = section.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const sectionCenter = rect.top + rect.height / 2;
        const viewportCenter = viewportHeight / 2;

        // Skip hero section - it should always be visible
        if (section.classList.contains("hero-section")) {
          return;
        }

        // Calculate distance from viewport center
        const distanceFromCenter = Math.abs(sectionCenter - viewportCenter);
        const centerThreshold = viewportHeight * 0.25; // 25% of viewport height for better coverage
        const visibleThreshold = viewportHeight * 0.4; // 40% for visible state

        // Remove all animation classes first
        section.classList.remove(
          "section-visible",
          "section-center",
          "section-hidden"
        );

        if (entry.isIntersecting) {
          if (distanceFromCenter <= centerThreshold) {
            // Section is in the center area
            section.classList.add("section-center");
          } else if (distanceFromCenter <= visibleThreshold) {
            // Section is visible but not in center
            section.classList.add("section-visible");
          } else {
            // Section is far from center
            section.classList.add("section-hidden");
          }
        } else {
          // Section is not visible or barely visible
          section.classList.add("section-hidden");
        }
      });
    },
    {
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
      rootMargin: "-10% 0px -10% 0px",
    }
  );

  // Observe all sections
  sections.forEach((section) => {
    sectionObserver.observe(section);
  });

  // Add scroll listener for more precise center detection
  let scrollTimeout;
  window.addEventListener("scroll", () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      updateSectionStates();
    }, 10);
  });
}

// Update section states based on scroll position
function updateSectionStates() {
  const sections = document.querySelectorAll(".section-animated");
  const viewportHeight = window.innerHeight;
  const viewportCenter = viewportHeight / 2;
  const centerThreshold = viewportHeight * 0.25; // 25% of viewport height for better coverage
  const visibleThreshold = viewportHeight * 0.4; // 40% for visible state

  sections.forEach((section) => {
    // Skip hero section - it should always be visible
    if (section.classList.contains("hero-section")) {
      return;
    }

    const rect = section.getBoundingClientRect();
    const sectionCenter = rect.top + rect.height / 2;
    const distanceFromCenter = Math.abs(sectionCenter - viewportCenter);

    // Remove all animation classes first
    section.classList.remove(
      "section-visible",
      "section-center",
      "section-hidden"
    );

    // Check if section is in viewport
    const isInViewport = rect.top < viewportHeight && rect.bottom > 0;

    if (isInViewport) {
      if (distanceFromCenter <= centerThreshold) {
        // Section is in the center area
        section.classList.add("section-center");
      } else if (distanceFromCenter <= visibleThreshold) {
        // Section is visible but not in center
        section.classList.add("section-visible");
      } else {
        // Section is far from center
        section.classList.add("section-hidden");
      }
    } else {
      // Section is not visible
      section.classList.add("section-hidden");
    }
  });
}

// Enhanced smooth scrolling with easing - optimized for section animations
function smoothScrollTo(target, duration = 1000) {
  const navbar = document.querySelector(".navbar");
  const navbarHeight = navbar ? navbar.offsetHeight : 120;
  const viewportHeight = window.innerHeight;
  const viewportCenter = viewportHeight / 2;

  // Calculate the position where the section center will be at viewport center
  // This ensures the section gets the "section-center" animation state
  const sectionHeight = target.offsetHeight;
  const sectionCenter = sectionHeight / 2;

  // Position the section so its center aligns with viewport center
  let targetPosition =
    target.offsetTop + sectionCenter - viewportCenter - navbarHeight;

  // Add small offset to ensure we're well within the center threshold (25% of viewport)
  targetPosition += 20;

  // Ensure we don't scroll past the bottom of the page
  const maxScroll = document.documentElement.scrollHeight - viewportHeight;
  targetPosition = Math.min(targetPosition, maxScroll);

  // Ensure we don't scroll above the top
  targetPosition = Math.max(targetPosition, 0);

  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);

    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
      // Force update section states during animation
      updateSectionStates();
    } else {
      // Animation complete - final update to ensure proper state
      setTimeout(() => {
        updateSectionStates();
      }, 50);
    }
  }

  function easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(animation);
}

// Enhanced dropdown functionality
function initializeDropdowns() {
  const dropdowns = document.querySelectorAll(".navbar-nav .dropdown");

  dropdowns.forEach((dropdown) => {
    const dropdownMenu = dropdown.querySelector(".dropdown-menu");
    let hideTimeout;

    // Show dropdown on hover
    dropdown.addEventListener("mouseenter", () => {
      clearTimeout(hideTimeout);
      dropdownMenu.classList.add("show");
    });

    // Hide dropdown with delay when leaving
    dropdown.addEventListener("mouseleave", () => {
      hideTimeout = setTimeout(() => {
        dropdownMenu.classList.remove("show");
      }, 150); // 150ms delay before hiding
    });

    // Keep dropdown open when hovering over the menu itself
    dropdownMenu.addEventListener("mouseenter", () => {
      clearTimeout(hideTimeout);
      dropdownMenu.classList.add("show");
    });

    // Hide when leaving the menu
    dropdownMenu.addEventListener("mouseleave", () => {
      hideTimeout = setTimeout(() => {
        dropdownMenu.classList.remove("show");
      }, 150);
    });

    // Handle click events for dropdown items
    const dropdownItems = dropdownMenu.querySelectorAll(".dropdown-item");
    dropdownItems.forEach((item) => {
      item.addEventListener("click", () => {
        // Hide dropdown immediately when item is clicked
        dropdownMenu.classList.remove("show");
      });
    });
  });
}

// Modern page initialization
document.addEventListener("DOMContentLoaded", function () {
  // Store original products content for restoration
  storeOriginalContent();

  // Initialize enhanced dropdowns
  initializeDropdowns();

  // Initialize hero slideshow
  heroSlides = document.querySelectorAll(".hero-slide");
  totalHeroSlides = heroSlides.length;

  if (totalHeroSlides > 0) {
    // Ensure first hero slide is active
    if (!document.querySelector(".hero-slide.active")) {
      heroSlides[0].classList.add("active");
    }
    // Set interval for automatic hero sliding (5 seconds)
    setInterval(nextHeroSlide, 5000);
  }

  // Initialize first about slide if no slide is active
  if (slides.length > 0 && !document.querySelector(".about-slide.active")) {
    slides[0].classList.add("active");
  }

  // Set interval for automatic about sliding (10 seconds)
  setInterval(nextSlide, 10000);

  // Setup scroll animations
  setupScrollAnimations();

  // Add scroll listener for navbar effects
  window.addEventListener("scroll", handleNavbarScroll);

  // Initialize active navigation link
  updateActiveNavLink();

  // Initialize horizontal product scrolling
  initializeProductScrolling();

  // Enhanced smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      // Skip if it's just "#" or if it has onclick handler (like product links)
      if (href === "#" || this.hasAttribute("onclick")) {
        return;
      }

      e.preventDefault();
      const target = document.querySelector(href);

      if (target) {
        smoothScrollTo(target);
      }
    });
  });

  // Add modern hover effects to buttons
  document.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-3px)";
    });

    btn.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });

  // Add parallax effect to hero section
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector(".hero-section");
    if (hero) {
      hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
  });
});

// Enhanced function to show specific product content
async function showProductPage(productType, event) {
  // Prevent default anchor behavior to avoid unwanted navigation
  if (event) {
    event.preventDefault();
  }

  // Find the products section
  const productsSection = document.querySelector(".py-5.bg-light");

  if (productsSection) {
    try {
      // Load the HTML file for the specific product
      const response = await fetch(`products/${productType}.html`);
      if (response.ok) {
        const content = await response.text();
        productsSection.innerHTML = content;
      } else {
        // Fallback content if file not found
        productsSection.innerHTML = `
          <div class="container">
            <div class="text-center py-5">
              <h2 class="mb-4 text-danger">Błąd ładowania</h2>
              <p class="lead text-light">Nie można załadować strony produktu.</p>
              <button onclick="restoreProducts()" class="btn btn-outline-light">
                <i class="fas fa-arrow-left me-2"></i>Powrót do produktów
              </button>
            </div>
          </div>
        `;
      }
    } catch (error) {
      console.error("Error loading product page:", error);
      // Fallback content on error
      productsSection.innerHTML = `
        <div class="container">
          <div class="text-center py-5">
            <h2 class="mb-4 text-danger">Błąd ładowania</h2>
            <p class="lead text-light">Wystąpił błąd podczas ładowania strony produktu.</p>
            <button onclick="restoreProducts()" class="btn btn-outline-light">
              <i class="fas fa-arrow-left me-2"></i>Powrót do produktów
            </button>
          </div>
        </div>
      `;
    }

    // Scroll to the products section using the enhanced smooth scroll function
    smoothScrollTo(productsSection);
  }
}

// Store original products content when page loads
let originalProductsContent = null;
let originalAboutContent = null;

// Function to store original content on page load
function storeOriginalContent() {
  const productsSection = document.querySelector(".py-5.bg-light");
  if (productsSection && !originalProductsContent) {
    originalProductsContent = productsSection.innerHTML;
  }

  const aboutSection = document.querySelector("#about");
  if (aboutSection && !originalAboutContent) {
    originalAboutContent = aboutSection.innerHTML;
  }
}

// Function to restore original products content
function restoreProducts() {
  const productsSection = document.querySelector(".py-5.bg-light");

  if (productsSection && originalProductsContent) {
    productsSection.innerHTML = originalProductsContent;
    // Re-initialize product scrolling after restoration
    setTimeout(() => {
      initializeProductScrolling();
    }, 100);
  }
}

// Enhanced function to show specific about content
async function showAboutPage(aboutType, event) {
  // Prevent default anchor behavior to avoid unwanted navigation
  if (event) {
    event.preventDefault();
  }

  // Find the about section
  const aboutSection = document.querySelector("#about");

  if (aboutSection) {
    try {
      // Load the HTML file for the specific about page
      const response = await fetch(`about/${aboutType}.html`);
      if (response.ok) {
        const content = await response.text();
        aboutSection.innerHTML = content;
      } else {
        // Fallback content if file not found
        aboutSection.innerHTML = `
          <div class="container">
            <div class="text-center py-5">
              <h2 class="mb-4 text-danger">Błąd ładowania</h2>
              <p class="lead text-light">Nie można załadować strony o firmie.</p>
              <button onclick="restoreAbout()" class="btn btn-outline-light">
                <i class="fas fa-arrow-left me-2"></i>Powrót do sekcji O Firmie
              </button>
            </div>
          </div>
        `;
      }
    } catch (error) {
      console.error("Error loading about page:", error);
      // Fallback content on error
      aboutSection.innerHTML = `
        <div class="container">
          <div class="text-center py-5">
            <h2 class="mb-4 text-danger">Błąd ładowania</h2>
            <p class="lead text-light">Wystąpił błąd podczas ładowania strony o firmie.</p>
            <button onclick="restoreAbout()" class="btn btn-outline-light">
              <i class="fas fa-arrow-left me-2"></i>Powrót do sekcji O Firmie
            </button>
          </div>
        </div>
      `;
    }

    // Scroll to the about section using the enhanced smooth scroll function
    smoothScrollTo(aboutSection);
  }
}

// Function to restore original about content
function restoreAbout() {
  const aboutSection = document.querySelector("#about");

  if (aboutSection && originalAboutContent) {
    aboutSection.innerHTML = originalAboutContent;
    // Re-initialize about carousel after restoration
    setTimeout(() => {
      // Re-initialize about slides
      const slides = document.querySelectorAll(".about-slide");
      if (slides.length > 0 && !document.querySelector(".about-slide.active")) {
        slides[0].classList.add("active");
      }
    }, 100);
  }
}

// Initialize horizontal product scrolling functionality
function initializeProductScrolling() {
  const scrollWrapper = document.querySelector(".products-scroll-wrapper");
  const scrollHint = document.querySelector(".scroll-hint");

  if (!scrollWrapper) return;

  // Add smooth scrolling behavior for mouse wheel
  scrollWrapper.addEventListener("wheel", (e) => {
    if (e.deltaY !== 0) {
      e.preventDefault();
      scrollWrapper.scrollLeft += e.deltaY;
    }
  });

  // Add touch/swipe support for mobile
  let isDown = false;
  let startX;
  let scrollLeft;

  scrollWrapper.addEventListener("mousedown", (e) => {
    isDown = true;
    scrollWrapper.classList.add("active");
    startX = e.pageX - scrollWrapper.offsetLeft;
    scrollLeft = scrollWrapper.scrollLeft;
  });

  scrollWrapper.addEventListener("mouseleave", () => {
    isDown = false;
    scrollWrapper.classList.remove("active");
  });

  scrollWrapper.addEventListener("mouseup", () => {
    isDown = false;
    scrollWrapper.classList.remove("active");
  });

  scrollWrapper.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - scrollWrapper.offsetLeft;
    const walk = (x - startX) * 2;
    scrollWrapper.scrollLeft = scrollLeft - walk;
  });

  // Hide scroll hint after user interacts
  if (scrollHint) {
    const hideScrollHint = () => {
      scrollHint.style.opacity = "0";
      setTimeout(() => {
        scrollHint.style.display = "none";
      }, 300);
    };

    scrollWrapper.addEventListener("scroll", hideScrollHint, { once: true });
    scrollWrapper.addEventListener("touchstart", hideScrollHint, {
      once: true,
    });
    scrollWrapper.addEventListener("mousedown", hideScrollHint, { once: true });
  }

  // Add keyboard navigation
  scrollWrapper.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      scrollWrapper.scrollLeft -= 200;
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      scrollWrapper.scrollLeft += 200;
    }
  });

  // Make scrollable container focusable
  scrollWrapper.setAttribute("tabindex", "0");
}
