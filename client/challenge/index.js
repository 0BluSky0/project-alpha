const topicToId = {
  "Ancient Egypt": 1,
  "Ancient Greece": 2,
};

const topicMapping = {
  ancient_egypt: "Ancient Egypt",
  ancient_greece: "Ancient Greece",
};

const topicBase = localStorage.getItem("selectedTopic");
const dbTopicName = topicMapping[topicBase] || topicBase;

let allQuestions = [];
let currentQuestionIndex = 0;
let userAnswers = [];

if (dbTopicName) {
  fetchQuestions(dbTopicName);
  document.getElementById("topic-title").textContent = dbTopicName;
} else {
  document.getElementById("topic-title").textContent = "Challenge";
}

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
    const token = localStorage.getItem("token");

    if (!topicId) {
      throw new Error(`couldn't find topic: ${topic}`);
    }

    const response = await fetch(
      `http://localhost:3000/game/questions/${topicId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const responseData = await response.json()

    if (!response.ok) {
      throw new Error(`failed to fetch questions: ${response.status} - ${responseData.error || 'Unknown error'}`);
    }

    allQuestions = responseData
      .sort(() => 0.5 - Math.random()).slice(0, 10)


    displayCurrentQuestion();

    document
      .getElementById("prev-btn")
      .addEventListener("click", showPreviousQuestion);
    document
      .getElementById("next-btn")
      .addEventListener("click", showNextQuestion);
    document.getElementById("submit-btn").addEventListener("click", submitQuiz);

  } catch (error) {
    console.error("Error fetching questions:", error);
    document.getElementById("current-question-container").innerHTML =
      `<p>Failed to load questions. Please log in again. Error: ${error.message}</p>`;
  }
}

function displayCurrentQuestion() {
  const container = document.getElementById("current-question-container");
  const question = allQuestions[currentQuestionIndex];

  if (!question) {
    container.innerHTML = "<p>No questions available</p>";
    return;
  }

  let questionHTML = `<div class="question" data-question-id="${question.id}" data-question-type="${question.question_type}">
      <h3>Question ${currentQuestionIndex + 1}: ${question.question_text}</h3>`;

  const savedAnswer = userAnswers[currentQuestionIndex];

  if (question.question_type === "multiple_choice" || question.question_type === "true_false") {
    const options = question.answers || question.options || [];
    const optionsHTML = options
      .map(
        (answer, i) => `
      <button class="option-btn" data-option-index="${i}">
        ${answer.option_text || answer}
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


  questionHTML += `</div>`;
  container.innerHTML = questionHTML;

  const questionDiv = document.querySelector(`.question[data-question-id="${question.id}"]`);


  if (savedAnswer !== undefined) {
    if (question.question_type === "multiple_choice" || question.question_type === "true_false") {
      const optionBtn = questionDiv.querySelector(`.option-btn[data-option-index="${savedAnswer}"]`);
      if (optionBtn) {
        optionBtn.classList.add("selected");
        questionDiv.dataset.selectedAnswer = savedAnswer;
      }
    } else if (question.question_type === "input") {
      const inputField = questionDiv.querySelector(".answer-input");
      if (inputField) {
        inputField.value = savedAnswer;
      }
    }
  }

  if (question.question_type === "multiple_choice" || question.question_type === "true_false") {
    document.querySelectorAll(".option-btn").forEach((button) => {
      button.addEventListener("click", (e) => {
        questionDiv.querySelectorAll(".option-btn").forEach((btn) => {
          btn.classList.remove("selected");
        });
        button.classList.add("selected");
        questionDiv.dataset.selectedAnswer = button.dataset.optionIndex;
        userAnswers[currentQuestionIndex] = button.dataset.optionIndex;
      });
    });
  }

  if (question.question_type === "input") {
    const inputField = questionDiv.querySelector('.answer-input');
    if (inputField) {
      inputField.addEventListener('input', (e) => {
        userAnswers[currentQuestionIndex] = e.target.value.trim();
      });
    }
  }

  updateNavigationButtons();
}

function showPreviousQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    displayCurrentQuestion();
  }
}

function showNextQuestion() {
  if (currentQuestionIndex < allQuestions.length - 1) {
    currentQuestionIndex++;
    displayCurrentQuestion();
  }
}

function updateNavigationButtons() {
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  const submitBtn = document.getElementById("submit-btn");

  prevBtn.disabled = currentQuestionIndex === 0;

  if (currentQuestionIndex === allQuestions.length - 1) {
    nextBtn.style.display = "none";
    submitBtn.style.display = "block";
  } else {
    nextBtn.style.display = "block";
    submitBtn.style.display = "none";
  }
}

async function submitQuiz() {
  const token = localStorage.getItem("token");

  for(let i = 0; i < allQuestions.length; i++) {
    if(userAnswers[i] === undefined) {
      alert(`Please answer question ${i + 1}`);
      currentQuestionIndex = i;
      displayCurrentQuestion();
      return;
    }
  }


  let score = 0;
  const results = allQuestions.forEach((question, index) => {
    const userAnswer = userAnswers[index];
    let isCorrect = false;
 if (question.question_type === "multiple_choice" || question.question_type === "true_false") {

      const selectedOption = question.options[userAnswer];
      isCorrect = selectedOption?.is_correct || false;
    } else if (question.question_type === "input") {

      const correctOption = question.options.find(opt => opt.is_correct);
      if (correctOption) {
        isCorrect = userAnswer.toLowerCase() === correctOption.option_text.toLowerCase();
      }
    }

    if (isCorrect) score++;
   
  });

  const xpEarned = score *10

  const subjectId = allQuestions[0]?.subject_id || topicToId[dbTopicName]

  const requestBody = {
    subjectId: subjectId,
    score: score,
    xpEarned: xpEarned
  };


  try {
    const response = await fetch("http://localhost:3000/game/submit", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(requestBody),
    });

    console.log(requestBody)

    const data = await response.json();
    if (response.ok) {
      alert(`Quiz submitted! You scored ${data.score}/${data.total} points`);
      window.location.href = "../homepage/index.html";
    } else {
      alert(`Failed to submit quiz: ${data.error || 'Unknown error'}`);
    }
  } catch(err) {
    console.error("Error submitting quiz:", err);
    alert("An error occurred. Please try again.");
  }
}