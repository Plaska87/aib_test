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
}

// Modern intersection observer for animations
function setupScrollAnimations() {
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

// Enhanced smooth scrolling with easing
function smoothScrollTo(target, duration = 1000) {
  const navbar = document.querySelector(".navbar");
  const navbarHeight = navbar ? navbar.offsetHeight : 120;
  const targetPosition = target.offsetTop - navbarHeight - 20;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  function easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(animation);
}

// Modern page initialization
document.addEventListener("DOMContentLoaded", function () {
  // Store original products content for restoration
  storeOriginalContent();

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

    // Scroll to the products section smoothly with proper offset
    const navbar = document.querySelector(".navbar");
    const navbarHeight = navbar ? navbar.offsetHeight : 120;
    const targetPosition = productsSection.offsetTop - navbarHeight - 20; // Extra 20px padding

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
  }
}

// Store original products content when page loads
let originalProductsContent = null;

// Function to store original content on page load
function storeOriginalContent() {
  const productsSection = document.querySelector(".py-5.bg-light");
  if (productsSection && !originalProductsContent) {
    originalProductsContent = productsSection.innerHTML;
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
