function toggleJobDetails(button) {
    const details = button.nextElementSibling;
    if (details.classList.contains("show")) {
        details.classList.remove("show");
        button.textContent = "Show Description";
    } else {
        details.classList.add("show");
        button.textContent = "Hide Description";
    }
}

// Enhanced smooth scrolling with easing
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });

            // Add ripple effect
            const ripple = document.createElement("div");
            ripple.className = "nav-ripple";
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        }
    });
});

const contactBtn = document.querySelector(".contact-btn");
const contactPopup = document.getElementById("contact-popup");
const closePopupBtn = document.querySelector(".close-popup");
if (contactBtn && contactPopup && closePopupBtn) {
    contactBtn.addEventListener("click", () => {
        contactPopup.classList.add("show");
    });
    closePopupBtn.addEventListener("click", () => {
        contactPopup.classList.remove("show");
    });
    contactPopup.addEventListener("click", (e) => {
        if (e.target === contactPopup) {
            contactPopup.classList.remove("show");
        }
    });
}

// Enhanced scroll-based animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.animationDelay = "0s";
            entry.target.classList.add("animate-in");
        }
    });
}, observerOptions);

// Observe all sections and cards
document
    .querySelectorAll(
        ".section, .skill-item, .job-card, .certification-card",
    )
    .forEach((el) => {
        observer.observe(el);
    });

// Parallax effect for hero section
window.addEventListener("scroll", function() {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    const heroSection = document.querySelector(".hero-section");
    if (heroSection) {
        heroSection.style.transform = `translateY(${rate}px)`;
    }

    // Update active navigation with smooth transitions
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(
        ".nav-links a, .sidebar-nav a",
    );

    let current = "";
    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});

// Add CSS for additional animations
const additionalCSS = `
    .nav-ripple {
      position: absolute;
      border-radius: 50%;
      background: rgba(128, 128, 128, 0.3);
      transform: scale(0);
      animation: ripple 0.6s linear;
      pointer-events: none;
      top: 50%;
      left: 50%;
      width: 20px;
      height: 20px;
      margin-left: -10px;
      margin-top: -10px;
    }

    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }

    .animate-in {
      animation: slideInScale 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
    }

    @keyframes slideInScale {
      0% {
        opacity: 0;
        transform: translateY(30px) scale(0.8);
      }
      100% {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    .skill-item, .job-card, .certification-card {
      opacity: 0;
      transform: translateY(30px) scale(0.8);
      transition: all 0.3s ease;
    }

    .skill-item.animate-in, .job-card.animate-in, .certification-card.animate-in {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  `;

const style = document.createElement("style");
style.textContent = additionalCSS;
document.head.appendChild(style);

// Skill Popup functionality
const skillPopup = document.getElementById('skill-popup');
const popupIcon = document.getElementById('popup-icon');
const popupText = document.getElementById('popup-text');
let hoverTimeout;

function positionPopup(skillItem) {
    const rect = skillItem.getBoundingClientRect();
    const popupRect = skillPopup.getBoundingClientRect();

    // Start with popup centered over the skill item
    let left = rect.left + (rect.width / 2) - (popupRect.width / 2);
    let top = rect.top + (rect.height / 2) - (popupRect.height / 2);

    // Adjust if popup would go off screen edges
    const margin = 10;

    // Check horizontal bounds
    if (left < margin) {
        left = margin;
    } else if (left + popupRect.width > window.innerWidth - margin) {
        left = window.innerWidth - popupRect.width - margin;
    }

    // Check vertical bounds
    if (top < margin) {
        top = margin;
    } else if (top + popupRect.height > window.innerHeight - margin) {
        top = window.innerHeight - popupRect.height - margin;
    }

    skillPopup.style.left = left + 'px';
    skillPopup.style.top = top + 'px';
}

function showPopup(skillItem) {
    const icon = skillItem.querySelector('.skill-icon i');
    const text = skillItem.querySelector('.skill-text');
    const fullText = skillItem.dataset.fullText || text.textContent.trim();

    popupIcon.className = icon.className;
    popupText.textContent = fullText;

    skillPopup.classList.add('show');

    // Position popup after it's shown so we can get its dimensions
    setTimeout(() => {
        positionPopup(skillItem);
    }, 10);
}

function hidePopup() {
    clearTimeout(hoverTimeout);
    hoverTimeout = setTimeout(() => {
        skillPopup.classList.remove('show');
    }, 100); // Small delay to allow mouse movement between elements
}

function cancelHide() {
    clearTimeout(hoverTimeout);
}

document.querySelectorAll('.skill-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        cancelHide();
        showPopup(item);
    });

    item.addEventListener('mouseleave', () => {
        hidePopup();
    });
});

// Keep popup open when hovering over the popup itself
skillPopup.addEventListener('mouseenter', () => {
    cancelHide();
});

skillPopup.addEventListener('mouseleave', () => {
    hidePopup();
});

// Hide popup when clicking anywhere
document.addEventListener('click', () => {
    clearTimeout(hoverTimeout);
    skillPopup.classList.remove('show');
});

// Mobile menu functionality
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const sidebarNavLinks = document.querySelectorAll('.sidebar-nav a');

// Close mobile menu when clicking navigation links
sidebarNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (mobileMenuToggle) {
            mobileMenuToggle.checked = false;
        }
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    const sidebar = document.querySelector('.sidebar-nav');
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    
    if (mobileMenuToggle && mobileMenuToggle.checked) {
        if (!sidebar.contains(e.target) && !hamburgerBtn.contains(e.target)) {
            mobileMenuToggle.checked = false;
        }
    }
});
