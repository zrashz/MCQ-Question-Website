const quizData = [
    {
        question: "What does HTML stand for?",
        options: ["Hyper Text Markup Language", "High Text Markup Language", "Hyperlinks and Text Markup Language", "None of the above"],
        answer: "Hyper Text Markup Language"
    },
    {
        question: "Which language is used for styling web pages?",
        options: ["HTML", "CSS", "JavaScript", "PHP"],
        answer: "CSS"
    },
    {
        question: "Which is not a JavaScript data type?",
        options: ["Undefined", "Boolean", "Number", "Character"],
        answer: "Character"
    },
    {
        question: "Which HTML attribute is used to define inline styles?",
        options: ["styles", "style", "class", "font"],
        answer: "style"
    },
    {
        question: "Which of the following is a JavaScript framework?",
        options: ["React", "Django", "Laravel", "Flask"],
        answer: "React"
    },
    // Additional Questions
    {
        question: "Which tag is used to create a hyperlink in HTML?",
        options: ["<link>", "<a>", "<href>", "<url>"],
        answer: "<a>"
    },
    {
        question: "What does CSS stand for?",
        options: ["Cascading Style Sheets", "Colorful Style Sheets", "Creative Style Sheets", "Computer Style Sheets"],
        answer: "Cascading Style Sheets"
    },
    {
        question: "Which property is used to change the background color in CSS?",
        options: ["bgcolor", "background-color", "color", "background"],
        answer: "background-color"
    },
    {
        question: "How do you add a comment in CSS?",
        options: ["// This is a comment", "<!-- This is a comment -->", "/* This is a comment */", "** This is a comment **"],
        answer: "/* This is a comment */"
    },
    {
        question: "Which HTML element is used to define the footer of a document?",
        options: ["<footer>", "<bottom>", "<section>", "<aside>"],
        answer: "<footer>"
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const nextButton = document.getElementById("next-button");
const resultElement = document.getElementById("result");
const scoreElement = document.getElementById("score");
const restartButton = document.getElementById("restart-button");

// Function to load the current question
function loadQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;
    optionsElement.innerHTML = "";
    scoreElement.innerText = `Score: ${score} out of ${quizData.length}`; // Update score display

    currentQuestion.options.forEach(option => {
        const button = document.createElement("button");
        button.innerText = option;
        button.classList.add("option");
        button.addEventListener("click", () => selectOption(button, option));
        optionsElement.appendChild(button);
    });
}

// Function to handle option selection
function selectOption(button, selectedOption) {
    const currentQuestion = quizData[currentQuestionIndex];
    if (selectedOption === currentQuestion.answer) {
        button.classList.add("correct");
        score++;
    } else {
        button.classList.add("incorrect");
        // Highlight the correct answer
        const options = optionsElement.children;
        for (let option of options) {
            if (option.innerText === currentQuestion.answer) {
                option.classList.add("correct");
                break;
            }
        }
    }
    nextButton.classList.remove("hidden");
    disableOptions();
}

// Function to disable options after selection
function disableOptions() {
    const options = optionsElement.children;
    for (let option of options) {
        option.disabled = true;
    }
}

// Event listener for next button
nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
        nextButton.innerText = "Next"; // Change back to "Next" for intermediate questions
    } else {
        nextButton.innerText = "Finish"; // Change to "Finish" for last question
        showResult();
    }
});

// Function to show the result
function showResult() {
    questionElement.innerText = "Quiz Finished!";
    optionsElement.innerHTML = "";
    nextButton.classList.add("hidden");
    resultElement.classList.remove("hidden");
    scoreElement.innerText = `Final Score: ${score} out of ${quizData.length}`; // Show final score
}

// Event listener for restart button
restartButton.addEventListener("click", () => {
    currentQuestionIndex = 0;
    score = 0;
    resultElement.classList.add("hidden");
    loadQuestion();
    nextButton.classList.add("hidden");
});

// Initialize quiz
loadQuestion();
