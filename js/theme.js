/* Gerenciamento do Tema Dark/Light */

(function initTheme() {
  const STORAGE_KEY = "portfolio-theme";
  const themeToggleBtn = document.getElementById("theme-toggle");

  // obtém o tema salvo
  function getPreferredTheme() {
    const savedTheme = localStorage.getItem(STORAGE_KEY);
    if (savedTheme) {
      return savedTheme;
    }
    // caso não haja salvo, verifica preferência do sistema operacional
    return window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
  }

  // aplica o tema no elemento html
  function applyTheme(theme) {
    if (theme === "light") {
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }

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

  // aplicação imediata do tema
  const currentTheme = getPreferredTheme();
  applyTheme(currentTheme);

  // listener do botão de alternância
  document.addEventListener("DOMContentLoaded", () => {
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
