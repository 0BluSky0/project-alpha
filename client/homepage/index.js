document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme") || "light";
  setTheme(savedTheme);
  displayWelcomeMessage()
  applyTopicLocks()
});

document.querySelectorAll(".challenge").forEach((button) => {
  button.addEventListener("click", (e) => {
    const topic = e.target.getAttribute("data-topic");
    localStorage.setItem("selectedTopic", topic);
    window.location.href = "../challenge/index.html";
  });
});


document.getElementById("logout").addEventListener("click", (e) => {
  window.location.href = "../login/index.html";
});



function displayWelcomeMessage(){
  const welcomeMessage = document.getElementById("welcome-message")
  const username = localStorage.getItem("username")

  if(username){
    welcomeMessage.textContent = `Welcome to Eureka, ${username}!`
  } else {
    welcomeMessage.textContent = "Welcome to Eureka!"
  }
}

function setTheme(themeName) {
  document.documentElement.setAttribute("data-theme", themeName);
  console.log("Setting theme to:", themeName);
  localStorage.setItem("theme", themeName);
}

const unlockedTopics = ["ancient_egypt", "ancient_greece"]


function applyTopicLocks() {
  const topics = document.querySelectorAll(".topic");

  topics.forEach((topic) => {
    const topicName = topic
      .querySelector(".challenge")
      .getAttribute("data-topic");

    if (!unlockedTopics.includes(topicName)) {
      const iconContainer = topic.querySelector(".icon-container");
      if (iconContainer) {
        iconContainer.style.filter = "grayscale(100%)";
        iconContainer.style.opacity = "0.5";
      }

      const buttons = topic.querySelectorAll("button");
      buttons.forEach((button) => {
        button.disabled = true;
        button.style.opacity = "0.5";
        button.style.cursor = "not-allowed"
      });
    }
  });
}
