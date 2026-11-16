// Apply the theme before the stylesheet and React load. The old key stored
// automatic defaults as well as user choices, so only use the new choice key.
(function () {
  var theme = "dark";
  try {
    if (window.localStorage.getItem("portfolio-theme-choice") === "light") {
      theme = "light";
    }
  } catch (_) {}
  document.documentElement.dataset.theme = theme;
})();
