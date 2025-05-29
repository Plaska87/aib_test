// About section carousel functionality
let currentSlide = 0;
const slides = document.querySelectorAll(".about-slide");
const totalSlides = slides.length;

function showSlide(index) {
  // Remove active class from all slides
  slides.forEach((slide) => slide.classList.remove("active"));

  // Add active class to current slide
  if (slides[index]) {
    slides[index].classList.add("active");
  }
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  showSlide(currentSlide);
}

// Start automatic carousel when page loads
document.addEventListener("DOMContentLoaded", function () {
  // Set interval for automatic sliding (5 seconds)
  setInterval(nextSlide, 10000);

  // Add smooth scrolling to all anchor links
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
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
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

    // Scroll to the products section smoothly
    productsSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

// Function to restore original products content
function restoreProducts() {
  const productsSection = document.querySelector(".py-5.bg-light");

  if (productsSection) {
    // Restore modern products content
    productsSection.innerHTML = `
      <div class="container">
        <div class="text-center mb-5">
          <h2 class="display-5 fw-bold mb-3">Nasza Oferta</h2>
          <p class="lead text-light">Kompleksowe rozwiązania dla budownictwa od ponad 30 lat</p>
        </div>

        <!-- Main Products Grid -->
        <div class="row g-4 mb-5">
          <!-- Uszczelki -->
          <div class="col-lg-6">
            <div class="product-card h-100">
              <div class="row g-0 h-100">
                <div class="col-md-5">
                  <img src="images/product1.jpg" class="img-fluid h-100 object-cover rounded-start" alt="Uszczelki TPE">
                </div>
                <div class="col-md-7">
                  <div class="card-body h-100 d-flex flex-column">
                    <div class="product-badge">TPE</div>
                    <h4 class="card-title text-primary mb-3">Uszczelki</h4>
                    <p class="card-text text-light mb-3">
                      Ponad 100 typów uszczelek wykonanych ze specjalnie opracowanych materiałów: TPS, TPA, TPG.
                      Nowoczesne termoplastyczne elastomery (TPE) wypierają wulkanizowaną gumę (EPDM).
                    </p>
                    <div class="product-features mb-3">
                      <span class="feature-tag">Okna drewniane</span>
                      <span class="feature-tag">Drzwi</span>
                      <span class="feature-tag">Systemy PVC</span>
                      <span class="feature-tag">Aluminium</span>
                    </div>
                    <div class="mt-auto">
                      <div class="d-flex justify-content-between align-items-center">
                        <small class="text-muted">Zakres pracy: -45°C do +120°C</small>
                        <a href="#" onclick="showProductPage('uszczelki', event)" class="btn btn-primary btn-sm">
                          Zobacz więcej <i class="fas fa-arrow-right ms-1"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Butyl -->
          <div class="col-lg-6">
            <div class="product-card h-100">
              <div class="row g-0 h-100">
                <div class="col-md-5">
                  <img src="images/product2.jpg" class="img-fluid h-100 object-cover rounded-start" alt="Taśmy Butylowe">
                </div>
                <div class="col-md-7">
                  <div class="card-body h-100 d-flex flex-column">
                    <div class="product-badge">IIR/PIB</div>
                    <h4 class="card-title text-primary mb-3">Butyl</h4>
                    <p class="card-text text-light mb-3">
                      Wstęgi, sznury, beczki i laminaty butylowe. Wysoka paroszczelność, doskonałe przyleganie,
                      elastyczność przez lata, tłumienie hałasu i odporność na grzyby.
                    </p>
                    <div class="product-features mb-3">
                      <span class="feature-tag">Dekarstwo</span>
                      <span class="feature-tag">Budownictwo</span>
                      <span class="feature-tag">Motoryzacja</span>
                      <span class="feature-tag">Wygłuszanie</span>
                    </div>
                    <div class="mt-auto">
                      <div class="d-flex justify-content-between align-items-center">
                        <small class="text-muted">Maks. szerokość: 600mm</small>
                        <a href="#" onclick="showProductPage('butyle', event)" class="btn btn-primary btn-sm">
                          Zobacz więcej <i class="fas fa-arrow-right ms-1"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Profile -->
          <div class="col-lg-6">
            <div class="product-card h-100">
              <div class="row g-0 h-100">
                <div class="col-md-5">
                  <img src="images/product3.jpg" class="img-fluid h-100 object-cover rounded-start" alt="Profile PVC">
                </div>
                <div class="col-md-7">
                  <div class="card-body h-100 d-flex flex-column">
                    <div class="product-badge">PVC</div>
                    <h4 class="card-title text-primary mb-3">Profile</h4>
                    <p class="card-text text-light mb-3">
                      Profile do drzwi wewnętrznych i zewnętrznych, bram garażowych, okien dachowych.
                      Materiały odporne na starzenie oraz środki myjące i konserwujące.
                    </p>
                    <div class="product-features mb-3">
                      <span class="feature-tag">Drzwi zewnętrzne</span>
                      <span class="feature-tag">Bramy garażowe</span>
                      <span class="feature-tag">Okna dachowe</span>
                      <span class="feature-tag">Zatrzask</span>
                    </div>
                    <div class="mt-auto">
                      <div class="d-flex justify-content-between align-items-center">
                        <small class="text-muted">Folie ozdobne dostępne</small>
                        <a href="#" onclick="showProductPage('profile', event)" class="btn btn-primary btn-sm">
                          Zobacz więcej <i class="fas fa-arrow-right ms-1"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Integra System -->
          <div class="col-lg-6">
            <div class="product-card h-100">
              <div class="row g-0 h-100">
                <div class="col-md-5">
                  <img src="images/product4.jpg" class="img-fluid h-100 object-cover rounded-start" alt="Integra System">
                </div>
                <div class="col-md-7">
                  <div class="card-body h-100 d-flex flex-column">
                    <div class="product-badge">SYSTEM</div>
                    <h4 class="card-title text-primary mb-3">Integra System</h4>
                    <p class="card-text text-light mb-3">
                      Nowoczesny system uszczelnień okiennych. Minimalizuje mostki termiczne,
                      chroni przed przepływem powietrza i zawilgoceniem.
                    </p>
                    <div class="product-features mb-3">
                      <span class="feature-tag">Integra Inside</span>
                      <span class="feature-tag">Integra Outside</span>
                      <span class="feature-tag">Integra Vario</span>
                      <span class="feature-tag">Finger Lift</span>
                    </div>
                    <div class="mt-auto">
                      <div class="d-flex justify-content-between align-items-center">
                        <small class="text-muted">Szczelniej wewnątrz niż na zewnątrz</small>
                        <a href="#" onclick="showProductPage('integra', event)" class="btn btn-primary btn-sm">
                          Zobacz więcej <i class="fas fa-arrow-right ms-1"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- New Product - Integra Simplex -->
        <div class="row">
          <div class="col-12">
            <div class="new-product-banner">
              <div class="row align-items-center">
                <div class="col-md-8">
                  <div class="new-badge">NOWOŚĆ</div>
                  <h3 class="text-white mb-3">Integra Simplex</h3>
                  <p class="text-light mb-3">
                    Eliminuje mostki termiczne, lepsza izolacja termiczna, wodoszczelność i większa stabilność.
                    Współczynnik przenikalności cieplnej poprawiony z 0,3 W/mK do ok. 0,15 W/mK!
                  </p>
                  <div class="d-flex flex-wrap gap-2 mb-3">
                    <span class="spec-tag">Pianka poliuretanowa</span>
                    <span class="spec-tag">Drobiny aluminium</span>
                    <span class="spec-tag">0,076 W/mk</span>
                    <span class="spec-tag">Klasa B2</span>
                  </div>
                </div>
                <div class="col-md-4 text-center">
                  <div class="coming-soon-badge">
                    <i class="fas fa-rocket fa-2x mb-2"></i>
                    <div>Wkrótce w ofercie</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
