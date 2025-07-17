const questions = [
    {
      question: "What is the capital of France?",
      answers: ["Berlin", "Paris", "Madrid", "Rome"],
      correct: "Paris"
    },
    {
      question: "Which language runs in a web browser?",
      answers: ["Java", "C", "Python", "JavaScript"],
      correct: "JavaScript"
    },
    {
      question: "What does HTML stand for?",
      answers: ["HyperText Markup Language", "HighText Machine Language", "Hyperloop Machine Language"],
      correct: "HyperText Markup Language"
    }
  ];
  
  let currentQuestionIndex = 0;
  let score = 0;
  
  const questionEl = document.getElementById("question");
  const answersEl = document.getElementById("answers");
  const nextBtn = document.getElementById("next-btn");
  const scoreBox = document.getElementById("score-box");
  const scoreEl = document.getElementById("score");
  
  function showQuestion() {
    const q = questions[currentQuestionIndex];
    questionEl.textContent = q.question;
    answersEl.innerHTML = "";
  
    q.answers.forEach(answer => {
      const btn = document.createElement("button");
      btn.textContent = answer;
      btn.classList.add("answer-btn");
      btn.onclick = () => selectAnswer(answer, q.correct);
      answersEl.appendChild(btn);
    });
  
    nextBtn.style.display = "none"; // Hide next button until user answers
  }
  
  function selectAnswer(selected, correct) {
    const buttons = document.querySelectorAll(".answer-btn");
    buttons.forEach(btn => {
      btn.disabled = true;
      if (btn.textContent === correct) {
        btn.style.backgroundColor = "green";
      } else if (btn.textContent === selected) {
        btn.style.backgroundColor = "red";
      }
    });
  
    if (selected === correct) {
      score++;
    }
  
    nextBtn.style.display = "inline-block"; // Show next button
  }
  
  nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      endQuiz();
    }
  });
  
  function endQuiz() {
    document.getElementById("quiz-box").style.display = "none";
    scoreBox.style.display = "block";
    scoreEl.textContent = '${score} / ${questions.length}';
  }
  
  // Start quiz
  showQuestion();
  function loadLeaderboard() {
    db.collection("scores")
      .orderBy("score", "desc")
      .limit(5)
      .get()
      .then(snapshot => {
        const list = document.getElementById("leaderboard-list");
        list.innerHTML = "";
        snapshot.forEach(doc => {
          const item = document.createElement("li");
          item.textContent = $;{doc.data().user}; $;{doc.data().score};
          list.appendChild(item);
        });
      });
  }
  
  // Call this at the end of endQuiz()
  loadLeaderboard();