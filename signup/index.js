document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme") || "light";
  setTheme(savedTheme);
});

function setTheme(themeName) {
  document.documentElement.setAttribute("data-theme", themeName);
  console.log("Setting theme to:", themeName);
  localStorage.setItem("theme", themeName);
}