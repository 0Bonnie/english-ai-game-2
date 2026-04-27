let score = 0;
let time = 300;
let currentQuestion;
let timer;

const questions = [
  {
    q: "What does introvert mean?",
    choices: ["外向的人", "內向的人", "老師", "學生"],
    answer: 1,
    level: 1
  },
  {
    q: "reflection means?",
    choices: ["深思", "吃飯", "睡覺", "跑步"],
    answer: 0,
    level: 1
  },
  {
    q: "value A over B?",
    choices: ["比較A和B", "重視A勝過B", "放棄A", "忽略B"],
    answer: 1,
    level: 2
  },
  {
    q: "be worth ___?",
    choices: ["read", "reading", "to read", "reads"],
    answer: 1,
    level: 3
  }
];

function startGame() {
  document.getElementById("cover").classList.add("hidden");
  document.getElementById("game").classList.remove("hidden");

  nextQuestion();

  timer = setInterval(() => {
    time--;
    document.getElementById("time").textContent = time;

    if (time <= 0) {
      endGame();
    }
  }, 1000);
}

function nextQuestion() {
  currentQuestion = questions[Math.floor(Math.random() * questions.length)];

  document.getElementById("questionBox").textContent = currentQuestion.q;

  currentQuestion.choices.forEach((c, i) => {
    document.getElementById("choice" + i).textContent = c;
  });
}

function playSound(id) {
  const s = document.getElementById(id);
  s.currentTime = 0;
  s.play();
}

function answer(i) {
  if (i === currentQuestion.answer) {
    score += currentQuestion.level;
    playSound("dingSound");

    if (currentQuestion.level === 3) {
      playSound("greatSound");
    }
  } else {
    score -= 3;
    playSound("oopsSound");
  }

  document.getElementById("score").textContent = score;

  nextQuestion();
}

function endGame() {
  clearInterval(timer);

  document.getElementById("game").classList.add("hidden");
  document.getElementById("result").classList.remove("hidden");

  document.getElementById("finalScore").textContent = score;

  let best = localStorage.getItem("best") || 0;

  if (score > best) {
    localStorage.setItem("best", score);
    document.getElementById("recordMessage").textContent = "🐰 恭喜破紀錄！";
  }

  document.getElementById("bestScore").textContent = best;
}
