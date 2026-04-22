/**
 * LAETI'BEAUTY - Script Principal
 * Gère les transitions, le menu mobile et le carrousel
 */

document.addEventListener("DOMContentLoaded", () => {
    // 1. Déclenche l'effet d'apparition (Fade-in) au chargement
    document.body.classList.add("loaded");

    // 2. Initialisation du carrousel de témoignages (si on est sur l'index)
    const slides = document.querySelectorAll('.temoignages-slide');
    if (slides.length > 0) {
        showSlide(0);
        // Change de témoignage toutes les 6 secondes
        setInterval(() => changeSlide(1), 6000);
    }
});

// --- GESTION DES TRANSITIONS DE PAGES (Fade-out) ---
// Pour éviter un changement de page trop brutal
document.querySelectorAll("a[href]").forEach(link => {
    const url = new URL(link.href, window.location.href);
    const isInternal = url.origin === window.location.origin;

    // On applique l'effet seulement sur les liens internes et sans ancres (#)
    if (isInternal && !url.hash && !link.target) {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const destination = this.href;
            
            // On retire la classe 'loaded' pour faire disparaître la page
            document.body.classList.remove("loaded");
            
            // On attend la fin de l'animation CSS (300ms) avant de changer d'URL
            setTimeout(() => {
                window.location.href = destination;
            }, 300);
        });
    }
});

// --- MENU MOBILE (Burger) ---
function toggleMenu() {
    const navLinks = document.getElementById('nav-links');
    if (navLinks) {
        // Alterne entre caché et affiché
        navLinks.classList.toggle('hidden');
        navLinks.classList.toggle('flex');
    }
}

// --- SYSTÈME DE TÉMOIGNAGES (Carrousel) ---
let current = 0;

function showSlide(index) {
    const slides = document.querySelectorAll('.temoignages-slide');
    const dots = document.querySelectorAll('.point');
    
    if (slides.length === 0) return;

    // On cache toutes les slides et on désactive les points
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (dots[i]) dots[i].classList.remove('actif');
        
        // On affiche uniquement la slide demandée
        if (i === index) {
            slide.classList.add('active');
            if (dots[i]) dots[i].classList.add('actif');
        }
    });
    current = index;
}

function changeSlide(n) {
    const slides = document.querySelectorAll('.temoignages-slide');
    if (slides.length === 0) return;
    
    // Calcul de la slide suivante (boucle de la fin vers le début)
    let newIndex = (current + n + slides.length) % slides.length;
    showSlide(newIndex);
}

function currentSlide(n) {
    // Utilisé par les points (dots) sous les témoignages
    showSlide(n - 1);
}

// --- BOUTON RETOUR EN HAUT (Optionnel) ---
window.addEventListener("scroll", () => {
    const backToTop = document.querySelector("#back-to-top");
    if (backToTop) {
        if (window.scrollY > 300) {
            backToTop.classList.remove("opacity-0");
            backToTop.classList.add("opacity-100");
        } else {
            backToTop.classList.remove("opacity-100");
            backToTop.classList.add("opacity-0");
        }
    }
});
const tarifs = {
    'soins-visage': `
        <h3 class="text-2xl italic text-stone-800 mb-6 text-center">Nos Soins du Visage</h3>
        <div class="max-w-md mx-auto space-y-4 italic">
            <div class="flex justify-between border-b pb-2"><span>Nettoyage de peau (30min)</span> <span>35€</span></div>
            <div class="flex justify-between border-b pb-2"><span>Soin Éclat Vitaminé</span> <span>55€</span></div>
            <div class="flex justify-between border-b pb-2"><span>Soin Anti-Âge Global</span> <span>75€</span></div>
        </div>`,
    'massages': `
        <h3 class="text-2xl italic text-stone-800 mb-6 text-center">Massages Bien-être</h3>
        <div class="max-w-md mx-auto space-y-4 italic">
            <div class="flex justify-between border-b pb-2"><span>Massage Californien (1h)</span> <span>60€</span></div>
            <div class="flex justify-between border-b pb-2"><span>Massage Dos Détente</span> <span>45€</span></div>
        </div>`,
    'epilations': `
        <h3 class="text-2xl italic text-stone-800 mb-6 text-center">Épilations Douceur</h3>
        <div class="max-w-md mx-auto space-y-2 italic">
            <div class="flex justify-between border-b pb-1"><span>Sourcils / Lèvres</span> <span>8€</span></div>
            <div class="flex justify-between border-b pb-1"><span>Maillot Intégral</span> <span>25€</span></div>
            <div class="flex justify-between border-b pb-1"><span>Demi-jambes</span> <span>18€</span></div>
        </div>`
};

function afficherPrestation(id) {
    const zone = document.getElementById('details-prestation');
    const contenu = document.getElementById('contenu-dynamique');
    
    contenu.innerHTML = tarifs[id] || "<p class='text-center'>Tarifs bientôt disponibles...</p>";
    zone.classList.remove('hidden');
    
    // Scroll fluide vers les détails
    zone.scrollIntoView({ behavior: 'smooth' });
}

function fermerPrestation() {
    document.getElementById('details-prestation').classList.add('hidden');
}
