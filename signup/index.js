
const userData = {
  username: "",
  password: "",
  theme: "",
};

document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme") || "light";
  setTheme(savedTheme);
});

document.getElementById("dark-btn").addEventListener("click", () => {setTheme('dark'); userData.theme = 'dark'})
document.getElementById("light-btn").addEventListener("click", () => {setTheme('light'); userData.theme = 'light'})
document.getElementById("ocean-btn").addEventListener("click", () => {setTheme('ocean'); userData.theme = 'ocean'})
document.getElementById("forest-btn").addEventListener("click", () => {setTheme('forest'); userData.theme = 'forest'})
document.getElementById("sunset-btn").addEventListener("click", () => {setTheme('sunset'); userData.theme = 'sunset'})

function setTheme(themeName) {
  document.documentElement.setAttribute("data-theme", themeName);
  console.log("Setting theme to:", themeName);
  localStorage.setItem("theme", themeName);
}


document.getElementById("next-btn-1").addEventListener("click", () => nextQuestion(1));
document.getElementById("next-btn-2").addEventListener("click", () => nextQuestion(2));
document.getElementById("next-btn-3").addEventListener("click", () => nextQuestion(3));


function nextQuestion(currentQ) {
  const currentQuestion = document.getElementById(`q${currentQ}`);
  const nextQuestion = document.getElementById(`q${currentQ + 1}`);

  if (currentQ === 1) {
    userData.username = document.getElementById("username").value.trim();
  } else if (currentQ === 2) {
    userData.password = document.getElementById("password").value.trim();
  }

  if (currentQ === 1 && !userData.username) {
    alert("Please enter a username!");
    document.getElementById("username").focus();
    return;
  } else if (currentQ === 2 && !userData.password) {
    alert("Please enter a password!");
    document.getElementById("password").focus();
    return;
  }

  currentQuestion.classList.remove("active");
  nextQuestion.classList.add("active");
}


document.getElementById("finish-btn").addEventListener("click", (e)=> finishQuiz());

function finishQuiz() {
  try {
    localStorage.setItem("userData", JSON.stringify(userData));
    localStorage.setItem("theme", userData.theme);
    setTheme(userData.theme);
    window.location.href = "/client/homepage/index.html";
  } catch (e) {
    console.error("Error in finishQuiz:", e);
    alert("An error occurred. Please try again.");
  }
}

document.getElementById("login-btn").addEventListener("click", ()=> window.location.href="/client/login/index.html")
