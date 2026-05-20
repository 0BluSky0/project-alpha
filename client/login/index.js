function setTheme(themeName) {
  document.documentElement.setAttribute('data-theme', themeName);
  localStorage.setItem('theme', themeName);
}
document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    const options = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: form.get("email"),
            password: form.get("password")
        })
    }

    const response = await fetch("http://localhost:3000/auth/login", options);
    const data = await response.json();

    if (response.status == 200) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username);
        const topic = ["ancient_egypt", "ancient_greece"]
        const randomTopic = topic[Math.floor(Math.random() * topic.length)]
        localStorage.setItem("selectedTopic", randomTopic);
        window.location.href = `../challenge/index.html?topic=${randomTopic}`;
      } else {
        alert(data.error);
      }
})