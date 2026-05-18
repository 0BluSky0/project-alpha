document.querySelectorAll(".challenge").forEach(button => {
    button.addEventListener("click", (e)=> {
        const topic = e.target.getAttribute("data-topic")
        localStorage.setItem("selectedTopic", topic)
        window.location.href="../challenge/index.html"
    })
})