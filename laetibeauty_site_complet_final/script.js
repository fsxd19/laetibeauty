// Effet de fade-in au chargement de la page
document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("visible");
});

// Effet de transition avant de quitter une page (fade-out)
document.querySelectorAll("a[href]").forEach(link => {
  const isInternal = link.href.startsWith(window.location.origin);
  if (isInternal && !link.href.includes("#") && !link.target) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const url = this.href;
      document.body.classList.remove("visible");
      setTimeout(() => {
        window.location.href = url;
      }, 300);
    });
  }
});

// Menu burger responsive (mobile)
function toggleMenu() {
  const navLinks = document.getElementById('nav-links');
  navLinks.classList.toggle('show');
}

// Bouton "remonter en haut"
const backToTop = document.querySelector("#back-to-top");
window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    backToTop.style.display = "block";
  } else {
    backToTop.style.display = "none";
  }
});
let current = 0;
const slides = document.querySelectorAll('.temoignages-slide');
const dots = document.querySelectorAll('.point');

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    dots[i].classList.remove('actif');
    if (i === index) {
      slide.classList.add('active');
      dots[i].classList.add('actif');
    }
  });
  current = index;
}

function changeSlide(n) {
  let newIndex = (current + n + slides.length) % slides.length;
  showSlide(newIndex);
}

function currentSlide(n) {
  showSlide(n - 1);
}

// Lancer l’affichage initial
showSlide(0);
setInterval(() => changeSlide(1), 6000);
  // Ajoute la classe "loaded" une fois le DOM prêt
  window.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('loaded');
  });

  // Ajoute une transition fluide sur les liens internes
  document.querySelectorAll('a[href]').forEach(link => {
    const url = new URL(link.href);
    const isSameOrigin = url.origin === location.origin;

    // Évite les ancres internes ou liens vers d'autres sites
    if (isSameOrigin && !url.hash && !link.target) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        document.body.classList.remove('loaded');
        setTimeout(() => {
          window.location.href = this.href;
        }, 300); // temps correspondant à la transition CSS
      });
    }
  });
