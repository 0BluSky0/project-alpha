const topicToId = {
  'Ancient Egypt': 1,
  'Ancient Greece': 2,
};

const topicMapping = {
  ancient_egypt: "Ancient Egypt",
  ancient_greece: "Ancient Greece",
};

const topicBase = localStorage.getItem("selectedTopic");

const dbTopicName = topicMapping[topicBase] || topicBase;


if (dbTopicName) {
  fetchQuestions(dbTopicName);
  document.getElementById("topic-title").textContent =
    dbTopicName.charAt(0).toUpperCase() + dbTopicName.slice(1);
} else document.getElementById("topic-title").textContent = "Challenge";

document.getElementById("back").addEventListener("click", (e) => {
  window.location.href = "../homepage/index.html";
});

document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme") || "light";
  setTheme(savedTheme);
});

function setTheme(themeName) {
  document.documentElement.setAttribute("data-theme", themeName);
  console.log("Setting theme to:", themeName);
  localStorage.setItem("theme", themeName);
}



async function fetchQuestions(topic) {
  try {
    const topicId = topicToId[topic];
    if (!topicId) {
      throw new Error(`couldn't find topic: ${topic}`);
    }

    const response = await fetch(
      `http://localhost:3000/game/questions/${topicId}`,
    );
    if (!response.ok) {
      throw new Error("failed to fetch questions:", response.status);
    }
    const allQuestions = await response.json();

    const shuffledQuestions = allQuestions.sort(() => 0.5 - Math.random());
    const randomQuestions = shuffledQuestions.slice(0, 10);

    const questionsContainer = document.getElementById("questions-container");
    questionsContainer.innerHTML = "";

    let index = 1;
    randomQuestions.forEach((question) => {
      const questionDiv = document.createElement("div");
      questionDiv.className = "question";
      questionDiv.dataset.questionId = question.id;
      questionDiv.dataset.questionType = question.question_type;

      let questionHTML = `<h3>Question ${index}: ${question.question_text}</h3>`;

      if (
        question.question_type === "multiple_choice" ||
        question.question_type === "true_false"
      ) {
        const options = question.answers
          ? question.answers.map((answer) => answer.answer_text)
          : [];
        const optionsHTML = options
          .map(
            (option, i) => `
  <button class="option-btn" data-option-index="${i}">
    ${option}
  </button>
`,
          )
          .join("");

        questionHTML += `
  <div class="options">
    ${optionsHTML}
  </div>
`;
      } else if (question.question_type === "input") {
        questionHTML += `
          <div class="input-answer">
            <input type="text" class="answer-input" placeholder="Your answer...">
          </div>
        `;
      }

      questionDiv.innerHTML = questionHTML;
      questionsContainer.appendChild(questionDiv);
      index++;
    });

    document.querySelectorAll(".option-btn").forEach((button) =>
      button.addEventListener("click", (e) => {
        const questionDiv = button.closest(".question");
        const questionId = questionDiv.dataset.questionId;
        const optionIndex = button.dataset.optionIndex;

        questionDiv.querySelectorAll(".option-btn").forEach((btn) => {
          btn.classList.remove("selected");
        });
        button.classList.add("selected");

        questionDiv.dataset.selectedAnswer = optionIndex;
      }),
    );
  } catch (error) {
    console.error("Error fetching questions:", error);
    document.getElementById("questions-container").innerHTML =
      `<p>Failed to load questions</p>`;
  }
}

document.getElementById("submit-btn").addEventListener("click", submitQuiz);

async function submitQuiz() {
  const questions = document.querySelectorAll(".question");
  const answers = [];

  questions.forEach((questionDiv) => {
    const questionId = questionDiv.dataset.questionId;
    const questionType = questionDiv.dataset.questionType;

    let answer;
    if (questionType === "multiple_choice" || questionType === "true_false") {
      answer = questionDiv.dataset.selectedAnswer;
      if (answer === undefined) {
        alert(
          `Please answer question ${questionDiv.querySelector("h3").textContent}`,
        );
        throw new Error("Unanswered question");
      }
    } else if (questionType === "input") {
        answer = questionDiv.querySelector('.answer-input').value.trim()
        if(!answer) {
            alert(`Please answer question ${questionDiv.querySelector('h3').textContent}`);
        throw new Error("Unanswered question");
        }
    }
    answers.push({
        question_id: questionId,
        answer:answer
    })
  });

  try{
    const response = await fetch('http://localhost:3000/game/submit',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({answers})
    })
    const data = await response.json()
    if (response.ok){
        alert(`Quiz submitted! You scores ${data.score}/${data.total} points`)
        window.location.href="../homepage/index.html"
    } else {
        alert("Failed to submit quiz")
    }
  } catch(err){
    console.error("Error submitting quiz")
  }
}