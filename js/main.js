/* --------------------------------------------------------------------------
   GERENCIAMENTO DE TEMA (DARK / LIGHT)
   -------------------------------------------------------------------------- */
(function initTheme() {
  const STORAGE_KEY = "portfolio-theme";

  // obtém o tema preferido salvo ou a preferência do sistema
  function getPreferredTheme() {
    const savedTheme = localStorage.getItem(STORAGE_KEY);
    if (savedTheme) {
      return savedTheme;
    }
    return window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
  }

  // aplica o atributo data-theme e atualiza atributos de acessibilidade
  function applyTheme(theme) {
    if (theme === "light") {
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }

    const themeToggleBtn = document.getElementById("theme-toggle");
    if (themeToggleBtn) {
      const isLight = theme === "light";
      themeToggleBtn.setAttribute(
        "aria-label",
        isLight ? "Ativar modo escuro" : "Ativar modo claro",
      );
      themeToggleBtn.setAttribute(
        "title",
        isLight ? "Ativar modo escuro" : "Ativar modo claro",
      );
    }
  }

  // aplicação imediata
  const currentTheme = getPreferredTheme();
  applyTheme(currentTheme);

  document.addEventListener("DOMContentLoaded", () => {
    applyTheme(getPreferredTheme());

    const btn = document.getElementById("theme-toggle");
    if (!btn) return;

    btn.addEventListener("click", () => {
      const activeTheme =
        document.documentElement.getAttribute("data-theme") === "light"
          ? "dark"
          : "light";
      localStorage.setItem(STORAGE_KEY, activeTheme);
      applyTheme(activeTheme);
    });
  });
})();

/* --------------------------------------------------------------------------
   MENU MOBILE E INTERATIVIDADE
   -------------------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const mainNav = document.getElementById("main-nav");
  const navLinks = document.querySelectorAll(".nav__link");

  // alterna visibilidade do menu no celular
  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("is-open");
      menuToggle.setAttribute("aria-expanded", isOpen);
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Fechar menu de navegação" : "Abrir menu de navegação",
      );
    });

    // fecha o menu ao clicar em qualquer link de navegação
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (mainNav.classList.contains("is-open")) {
          mainNav.classList.remove("is-open");
          menuToggle.setAttribute("aria-expanded", "false");
          menuToggle.setAttribute("aria-label", "Abrir menu de navegação");
        }
      });
    });

    // fecha menu com a tecla ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && mainNav.classList.contains("is-open")) {
        mainNav.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menu de navegação");
      }
    });
  }
});
