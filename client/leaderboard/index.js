const leaderboardList = document.querySelector("#leaderboardList");

document.addEventListener("DOMContentLoaded", loadLeaderboard);

async function loadLeaderboard() {
  leaderboardList.innerHTML = "<p>Loading leaderboard...</p>";

  try {
    const response = await fetch("http://localhost:3000/scores/leaderboard");

    if (!response.ok) {
      throw new Error(`Leaderboard request failed with status ${response.status}`);
    }

    const users = await response.json();

    const students = users.map((user, index) => ({
      rank: index + 1,
      name: user.username,
      initials: getInitials(user.username),
      level: user.level,
      points: user.total_xp
    }));

    displayStudents(students);
  } catch (error) {
    console.error("Error loading leaderboard:", error);
    leaderboardList.innerHTML = "<p>Failed to load leaderboard.</p>";
  }
}

function getInitials(name) {
  const words = name.trim().split(" ");
  let initials = "";

  for (let i = 0; i < words.length; i++) {
    if (words[i] !== "") {
      initials += words[i][0].toUpperCase();
    }
  }

  return initials.slice(0, 2);
}


function displayStudents(students) {
  leaderboardList.textContent = "";

  students.forEach(function (student) {
    const studentCard = createStudentCard(student);
    leaderboardList.appendChild(studentCard);
  });
}

function createStudentCard(student) {
  const card = document.createElement("section");
  card.classList.add("studentCard");

  const rank = document.createElement("p");
  rank.classList.add("studentRank");
  rank.textContent = student.rank;

  const initials = document.createElement("p");
  initials.classList.add("studentInitials");
  initials.textContent = student.initials;

  const details = document.createElement("section");
  details.classList.add("studentDetails");

  const name = document.createElement("h2");
  name.classList.add("studentName");
  name.textContent = student.name;

  const streak = document.createElement("p");
  streak.classList.add("studentStreak");
  streak.textContent = `Level ${student.level}`;

  const pointsSection = document.createElement("section");
  pointsSection.classList.add("studentPointsSection");

  const points = document.createElement("p");
  points.classList.add("studentPoints");
  points.textContent = student.points.toLocaleString();

  const pointsLabel = document.createElement("p");
  pointsLabel.classList.add("pointsLabel");
  pointsLabel.textContent = "points";

  details.appendChild(name);
  details.appendChild(streak);
  pointsSection.appendChild(points);
  pointsSection.appendChild(pointsLabel);

  card.appendChild(rank);
  card.appendChild(initials);
  card.appendChild(details);
  card.appendChild(pointsSection);

  if (student.rank === 1) {
    card.classList.add("firstaPlace");
  }

  if (student.rank === 2) {
    card.classList.add("secondPlace");
  }

  if (student.rank === 3) {
    card.classList.add("thirdPlace");
  }

  return card;
}
