// assets/js/view_footer.js
(function () {
  function viewFooter() {
    const footer = document.getElementById("footer");
    if (!footer) return;

    const SHOW_AFTER = 50; // px de scroll antes de mostrar

    function toggleFooter() {
      if (window.scrollY > SHOW_AFTER) {
        footer.classList.add("footer-visible");
      } else {
        footer.classList.remove("footer-visible"); // ✅ al volver arriba se oculta
      }
    }

    window.addEventListener("scroll", toggleFooter, { passive: true });
    toggleFooter(); // estado inicial
  }

  // ✅ Asegura que el footer exista antes de buscarlo
  document.addEventListener("DOMContentLoaded", viewFooter);
})();