document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const header = document.querySelector(".js-site-header");
  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");

  const syncHeader = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 10);
  };

  const closeMenu = () => {
    if (!menuToggle || !mobileMenu) return;
    menuToggle.setAttribute("aria-expanded", "false");
    mobileMenu.classList.remove("is-open");
    mobileMenu.setAttribute("aria-hidden", "true");
    body.classList.remove("menu-open");
  };

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!isOpen));
      mobileMenu.classList.toggle("is-open", !isOpen);
      mobileMenu.setAttribute("aria-hidden", String(isOpen));
      body.classList.toggle("menu-open", !isOpen);
    });

    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    window.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth >= 1024) closeMenu();
    });
  }

  syncHeader();
  window.addEventListener("scroll", syncHeader, { passive: true });

  const revealTargets = document.querySelectorAll(
    ".hero-surface, section[id], .card, footer"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal", "is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
  );

  revealTargets.forEach((element) => {
    element.classList.add("reveal");
    observer.observe(element);
  });

  const ctx = document.getElementById("revenueChart");
  if (ctx && window.Chart) {
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["2024 (факт)", "2025 (факт)", "Сценарий роста"],
        datasets: [
          {
            label: "Центры",
            data: [7.96, 10.95, 25.0],
            backgroundColor: "#191b22",
            borderRadius: 8,
            stack: "combined",
          },
          {
            label: "Школа",
            data: [0.0, 4.6, 13.44],
            backgroundColor: "#8f6a43",
            borderRadius: 8,
            stack: "combined",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              usePointStyle: true,
              pointStyle: "rectRounded",
              boxWidth: 12,
              padding: 20,
              font: {
                size: 11,
                weight: "600",
              },
            },
          },
          tooltip: {
            callbacks: {
              label(context) {
                return `${context.dataset.label}: ${Number(context.raw).toFixed(2)} млн ₽`;
              },
            },
          },
        },
        scales: {
          x: {
            stacked: true,
            grid: { display: false },
            ticks: {
              color: "#5a6472",
              font: {
                size: 11,
                weight: "600",
              },
            },
          },
          y: {
            stacked: true,
            beginAtZero: true,
            grid: { color: "#efe7dc" },
            ticks: {
              color: "#5a6472",
              callback(value) {
                return `${value} млн`;
              },
            },
          },
        },
      },
    });
  }
});
