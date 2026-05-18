const leaderboardList = document.querySelector("#leaderboardList");

const students = [
    {
        rank: 1,
        name: "Student Name",
        initials: "SN",
        streak: 12,
        points: 2840
    },
    {
        rank: 2,
        name: "Student Name",
        initials: "SN",
        streak: 9,
        points: 2650
    },
    {
        rank: 3,
        name: "Student Name",
        initials: "SN",
        streak: 15,
        points: 2580
    },
    {
        rank: 4,
        name: "Student Name",
        initials: "SN",
        streak: 7,
        points: 2420
    },
    {
        rank: 5,
        name: "Student Name",
        initials: "SN",
        streak: 10,
        points: 2310
    },
    {
        rank: 6,
        name:"Student Name",
        initials: "SN",
        streak: 6,
        points: 2180
    },
    {
        rank: 7,
        name: "Student Name",
        initials: "SN",
        streak: 8,
        points: 2050
    },
    {
        rank: 8,
        name: "Student Name",
        initials: "SN",
        streak: 5,
        points: 1920
    }
];

displayStudents();

function displayStudents() {
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
    streak.textContent = `🔥 ${student.streak} day streak`;

    const pointsSection = document.createElement("section");
    pointsSection.classList.add("studentPointsSection");

    const points = document.createElement("p");
    points.classList.add("studentPoints");
    points.textContent = student.points.toLocaleString();

    const pointsLabel = document.createElement("p");
    pointsLabel.classList.add("pointsLabel");
    pointsLabel.textContent = "points";