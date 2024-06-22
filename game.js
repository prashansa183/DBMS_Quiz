const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
  {
    "question": "What does DBMS stand for?",
    "choice1": "Database Management Solution",
    "choice2": "Database Management System",
    "choice3": "DataBase Management Software",
    "choice4": "Data Block Management System",
    "answer": 2
  },
  {
    "question": "Which SQL statement is used to extract data from a database?",
    "choice1": "SELECT",
    "choice2": "EXTRACT",
    "choice3": "GET",
    "choice4": "OPEN",
    "answer": 1
  },
  {
    "question": "In a relational database, a table is also known as?",
    "choice1": "Field",
    "choice2": "Attribute",
    "choice3": "Relation",
    "choice4": "Row",
    "answer": 3
  },
  {
    "question": "Which of the following is a valid SQL command?",
    "choice1": "RETRIEVE",
    "choice2": "FIND",
    "choice3": "SELECT",
    "choice4": "SEARCH",
    "answer": 3
  },
  {
    "question": "Which of the following is a NoSQL database?",
    "choice1": "MySQL",
    "choice2": "PostgreSQL",
    "choice3": "MongoDB",
    "choice4": "Oracle",
    "answer": 3
  },
  {
    "question": "What is a primary key?",
    "choice1": "A key that uniquely identifies a row in a table",
    "choice2": "A key used to encrypt database",
    "choice3": "A key used to open the database",
    "choice4": "A key that connects two databases",
    "answer": 1
  },
  {
    "question": "What does ACID stand for in the context of databases?",
    "choice1": "Atomicity, Consistency, Isolation, Durability",
    "choice2": "Availability, Consistency, Integrity, Durability",
    "choice3": "Atomicity, Correctness, Isolation, Durability",
    "choice4": "Availability, Correctness, Integrity, Durability",
    "answer": 1
  },
  {
    "question": "Which of the following is not a type of join in SQL?",
    "choice1": "INNER JOIN",
    "choice2": "OUTER JOIN",
    "choice3": "CROSS JOIN",
    "choice4": "SIDE JOIN",
    "answer": 4
  },
  {
    "question": "In SQL, which command is used to remove a table from a database?",
    "choice1": "DELETE",
    "choice2": "REMOVE",
    "choice3": "DROP",
    "choice4": "TRUNCATE",
    "answer": 3
  },
  {
    "question": "What is a foreign key?",
    "choice1": "A key that uniquely identifies a row in a table",
    "choice2": "A key used to establish a link between tables",
    "choice3": "A key used to encrypt database",
    "choice4": "A key used to open the database",
    "answer": 2
  }
]
;

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    //go to the end page
    return window.location.assign("end.html");
  }
  questionCounter++;
  questionCounterText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

startGame();