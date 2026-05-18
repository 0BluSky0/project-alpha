const topic = localStorage.getItem("selectedTopic")
if (topic){
    fetchQuestions(topic)
    document.getElementById("topic-title").textContent = topic.charAt(0).toUpperCase() + topic.slice(1)
} else document.getElementById("topic-title").textContent = "Challenge"



async function fetchQuestions(topic){
    try{
        const response = await fetch(`api...${topic}`)
        const allQuestions = await response.json()

        const shuffledQuestions = allQuestions.sort(() => 0.5 - Math.random())
        const randomQuestions = shuffledQuestions.slice(0,10)

        const questionsContainer = document.getElementById("questions-container")
        questionsContainer.innerHTML = ""

        let index = 1
        randomQuestions.forEach((question)=> {
            const questionDiv = document.createElement("div")
            questionDiv.className = "question"
            questionDiv.innerHTML = `<h3>Question ${index}: ${question.text}</h3>
            <div class = "options>
            ${question.options.map(option => `<button>${option}</button>`).join('')}
            </div>`

            index++
            questionsContainer.appendChild(questionDiv)
            
        })
    } catch(error){
        console.error("Error fetching questions:", error)
        document.getElementById("questions-container").innerHTML = `<p>Failed to load questions</p>`
    }
}