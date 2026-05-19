document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme") || "light";
  setTheme(savedTheme);
});

document.getElementById("dark-btn").addEventListener("click", setTheme('dark'))
document.getElementById("light-btn").addEventListener("click", setTheme('light'))
document.getElementById("ocean-btn").addEventListener("click", setTheme('ocean'))
document.getElementById("forest-btn").addEventListener("click", setTheme('forest'))
document.getElementById("sunset-btn").addEventListener("click", setTheme('sunset'))

function setTheme(themeName) {
  document.documentElement.setAttribute("data-theme", themeName);
  console.log("Setting theme to:", themeName);
  localStorage.setItem("theme", themeName);
}

const userData = {
  username: "",
  password: "",
  theme: "",
};

document.getElementById("next-btn-1").addEventListener("click", () => nextQuestion(1));
document.getElementById("next-btn-2").addEventListener("click", () => nextQuestion(2));

function nextQuestion(currentQ) {
  const currentQuestion = document.getElementById(`q${currentQ}`);
  const nextQuestion = document.getElementById(`q${currentQ + 1}`);

  if (currentQ === 1) {
    userData.username = document.getElementById("username").value;
  } else if (currentQ === 2) {
    userData.password = document.getElementById("password").value;
  }

  currentQuestion.classList.remove("active");
  nextQuestion.classList.add("active");
}

document.getElementById("finish-btn").addEventListener("click", (e) => {
    window.location.href="../homepage/index.html"
})

// function finishQuiz() {
//   localStorage.setItem("userData", JSON.stringify(userData));
//   localStorage.setItem("theme", userData.theme);

//   setTheme(userData.theme);

//   window.location.href = "../homepage/index.html";
// }
