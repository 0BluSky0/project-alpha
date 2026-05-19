document.querySelectorAll(".challenge").forEach(button => {
    button.addEventListener("click", (e)=> {
        const topic = e.target.getAttribute("data-topic")
        localStorage.setItem("selectedTopic", topic)
        window.location.href="../challenge/index.html"
    })
})

document.getElementById("logout").addEventListener("click", (e) => {
    window.location.href="../login/index.html"
})

document.querySelectorAll(".practice").forEach(button => {
    button.addEventListener("click", (e)=> {
        const topic = e.target.getAttribute("data-topic")
        localStorage.setItem("selectedTopic", topic)
        window.location.href="../practice/index.html"
    })
})


document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme') || 'light';
  setTheme(savedTheme);
});

function setTheme(themeName) {
  document.documentElement.setAttribute('data-theme', themeName);
  console.log('Setting theme to:', themeName);
  localStorage.setItem('theme', themeName);
}
