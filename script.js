/* ================================
   English Game 2 - Final Version
   作者：林姵彣 Bonnie
   學號：414170534
================================ */

let score = 0;
let time = 300;
let timer = null;
let spawnTimer = null;
let currentQuestion = null;
let usedQuestions = [];
let gameStarted = false;

const holes = document.querySelectorAll(".hole");
const hammerCursor = document.getElementById("hammerCursor");

/* Optional Firebase:
   If you paste Firebase config in firebase-config.js and create functions there,
   this game will use cloud leaderboard. Otherwise it uses localStorage.
*/

// ================================
// Question Bank
// level 1 = +1, level 2 = +2, level 3 = +3
// ================================
const questions = [
  {q:"introvert means?",choices:["外向的人","內向的人","名人","領導者"],answer:1,level:1},
  {q:"extrovert means?",choices:["內向的人","外向的人","害羞的人","孤單的人"],answer:1,level:1},
  {q:"reflection means?",choices:["深思/反思","忽視","發展","文化"],answer:0,level:1},
  {q:"promote means?",choices:["阻止","推廣/促進","隱藏","破壞"],answer:1,level:1},
  {q:"ignore means?",choices:["注意","忽視","幫助","理解"],answer:1,level:1},
  {q:"solitary means?",choices:["喜歡熱鬧的","喜歡獨處的","很吵的","很忙的"],answer:1,level:1},
  {q:"enthusiastic means?",choices:["冷漠的","熱情的","難過的","無聊的"],answer:1,level:1},
  {q:"average means?",choices:["普通的","傑出的","最差的","奇怪的"],answer:0,level:1},
  {q:"outstanding means?",choices:["普通的","傑出的","糟糕的","困難的"],answer:1,level:1},
  {q:"merely means?",choices:["很多","只是/僅僅","非常","幾乎"],answer:1,level:1},
  {q:"contribute means?",choices:["破壞","貢獻","忽略","逃避"],answer:1,level:1},
  {q:"development means?",choices:["發展","停止","下降","毀滅"],answer:0,level:1},
  {q:"innovative means?",choices:["傳統的","創新的","舊的","慢的"],answer:1,level:1},
  {q:"famed means?",choices:["無名的","著名的","孤單的","害羞的"],answer:1,level:1},
  {q:"crucial means?",choices:["不重要的","非常重要的","簡單的","無聊的"],answer:1,level:1},
  {q:"isolated means?",choices:["開心的","孤立的","忙碌的","活潑的"],answer:1,level:1},
  {q:"positive means?",choices:["負面的","正面的","困難的","普通的"],answer:1,level:1},
  {q:"overcome means?",choices:["放棄","克服","增加","忽略"],answer:1,level:1},
  {q:"expect means?",choices:["忘記","預期","避免","躲避"],answer:1,level:1},
  {q:"aspect means?",choices:["面向","工具","人物","地方"],answer:0,level:1},
  {q:"celebrity means?",choices:["名人","學生","老師","朋友"],answer:0,level:1},
  {q:"chapter means?",choices:["章節","句子","單字","段落"],answer:0,level:1},
  {q:"movement means?",choices:["社會運動/活動","停止","錯誤","問題"],answer:0,level:1},
  {q:"civil rights means?",choices:["公民權利","軍事","學校規定","交通規則"],answer:0,level:1},
  {q:"quiet means?",choices:["安靜的","吵的","大聲的","忙的"],answer:0,level:1},
  {q:"loud means?",choices:["安靜的","大聲的","慢的","快的"],answer:1,level:1},
  {q:"alone means?",choices:["一起","獨自","團隊","很多人"],answer:1,level:1},
  {q:"team means?",choices:["個人","團隊","敵人","錯誤"],answer:1,level:1},
  {q:"energy means?",choices:["能量","時間","地點","人物"],answer:0,level:1},
  {q:"recharge means?",choices:["消耗","充電/恢復精力","停止","丟棄"],answer:1,level:1},

  {q:"value A over B means?",choices:["比較A和B","重視A勝過B","放棄A","忽略B"],answer:1,level:2},
  {q:"put the spotlight on means?",choices:["隱藏","忽略","讓……成為焦點","刪除"],answer:2,level:2},
  {q:"introduce A to B means?",choices:["A介紹B","B介紹A","把A介紹給B","A和B分開"],answer:2,level:2},
  {q:"manage to V means?",choices:["嘗試","成功做到","放棄","避免"],answer:1,level:2},
  {q:"sum up means?",choices:["開始","總結","逃跑","增加"],answer:1,level:2},
  {q:"be worth ___?",choices:["read","reading","to read","reads"],answer:1,level:2},
  {q:"contribute to ___?",choices:["原形動詞","名詞或V-ing","形容詞","副詞"],answer:1,level:2},
  {q:"prefer A to B means?",choices:["比較","喜歡A勝過B","討厭A","避免B"],answer:1,level:2},
  {q:"rather than means?",choices:["和","而不是","因為","但是"],answer:1,level:2},
  {q:"known as means?",choices:["被稱為","看到","知道","記住"],answer:0,level:2},
  {q:"famous for means?",choices:["因……著名","討厭","避免","隱藏"],answer:0,level:2},
  {q:"be good at means?",choices:["擅長","討厭","避免","不知道"],answer:0,level:2},
  {q:"throughout means?",choices:["結束","遍及/貫穿","開始","中間"],answer:1,level:2},
  {q:"tips for means?",choices:["給……的建議","關於……的錯誤","一個故事","一個答案"],answer:0,level:2},
  {q:"self-promotion means?",choices:["自我否定","自我宣傳","自我放棄","自我逃避"],answer:1,level:2},
  {q:"instead of means?",choices:["代替/而不是","一起","因為","但是"],answer:0,level:2},
  {q:"in order to means?",choices:["為了","因為","但是","所以"],answer:0,level:2},
  {q:"such as means?",choices:["例如","因為","所以","但是"],answer:0,level:2},
  {q:"as well as means?",choices:["或","以及/也","但是","因為"],answer:1,level:2},
  {q:"both A and B means?",choices:["A或B","A和B","兩個都不","只有A"],answer:1,level:2},
  {q:"either A or B means?",choices:["A和B","A或B","兩個都不","全部"],answer:1,level:2},
  {q:"neither A nor B means?",choices:["兩個都","兩個都不","其中一個","全部"],answer:1,level:2},
  {q:"too...to means?",choices:["太……而不能","可以","應該","必須"],answer:0,level:2},
  {q:"so...that means?",choices:["如此……以至於","因為","所以","但是"],answer:0,level:2},
  {q:"look forward to means?",choices:["期待","害怕","避免","忽略"],answer:0,level:2},
  {q:"interested in means?",choices:["對……有興趣","討厭","避免","忽略"],answer:0,level:2},
  {q:"tired of means?",choices:["厭倦","喜歡","期待","知道"],answer:0,level:2},
  {q:"be busy V-ing means?",choices:["忙於做……","停止做……","避免做……","完成做……"],answer:0,level:2},
  {q:"keep V-ing means?",choices:["停止","持續做……","避免","完成"],answer:1,level:2},
  {q:"finish V-ing means?",choices:["完成做……","開始做……","避免做……","討厭做……"],answer:0,level:2},

  {q:"Which is correct?",choices:["This book is worth read.","This book is worth reading.","This book worth to read.","This book is worth to reading."],answer:1,level:3},
  {q:"Which is correct?",choices:["contribute to develop","contribute developing","contribute to developing","contribute develop"],answer:2,level:3},
  {q:"Which is correct?",choices:["known for the Mother of...","known as the Mother of...","known with the Mother of...","known at the Mother of..."],answer:1,level:3},
  {q:"Which is correct?",choices:["famous of","famous for","famous with","famous at"],answer:1,level:3},
  {q:"Which is correct?",choices:["good in English","good at English","good on English","good to English"],answer:1,level:3},
  {q:"Which is correct?",choices:["value A than B","value A over B","value A with B","value A on B"],answer:1,level:3},
  {q:"Which is correct?",choices:["rather than","rather then","rather that","rather this"],answer:0,level:3},
  {q:"Which is correct?",choices:["prefer A than B","prefer A to B","prefer A with B","prefer A at B"],answer:1,level:3},
  {q:"Which is correct?",choices:["manage V","manage to V","manage V-ing","manage for V"],answer:1,level:3},
  {q:"Which is correct?",choices:["introduce A for B","introduce A to B","introduce A with B","introduce A at B"],answer:1,level:3},
  {q:"Which is correct?",choices:["put spotlight on","put the spotlight on","put spotlight to","put the spotlight to"],answer:1,level:3},
  {q:"Which is correct?",choices:["interested on","interested in","interested at","interested for"],answer:1,level:3},
  {q:"Which is correct?",choices:["afraid at","afraid of","afraid on","afraid in"],answer:1,level:3},
  {q:"Which is correct?",choices:["busy to do homework","busy doing homework","busy do homework","busy does homework"],answer:1,level:3},
  {q:"Which is correct?",choices:["stop to eating","stop eating","stop eat","stop eats"],answer:1,level:3},
  {q:"Which is correct?",choices:["enjoy to play","enjoy playing","enjoy play","enjoy plays"],answer:1,level:3},
  {q:"Which is correct?",choices:["finish to read","finish reading","finish read","finish reads"],answer:1,level:3},
  {q:"Which is correct?",choices:["keep to study","keep studying","keep study","keep studies"],answer:1,level:3},
  {q:"Which is correct?",choices:["look forward to eat","look forward to eating","look forward eat","look forward eats"],answer:1,level:3},
  {q:"Which is correct?",choices:["be used to eat alone","be used to eating alone","be used eat alone","be used eats alone"],answer:1,level:3},
  {q:"Which is correct?",choices:["used to eating alone","used to eat alone","used eat alone","used eats alone"],answer:1,level:3},
  {q:"Choose the sentence with a relative clause.",choices:["I like English.","People who speak loudly may get attention.","She is tired.","He runs fast."],answer:1,level:3},
  {q:"Which sentence uses 'rather than' correctly?",choices:["I listen rather than talk.","I listen rather that talk.","I listen rather then talk.","I listen rather to talk."],answer:0,level:3},
  {q:"Which sentence is correct?",choices:["Introverts contribute to society.","Introverts contribute society to.","Introverts contribute for society.","Introverts contribute at society."],answer:0,level:3},
  {q:"Which sentence is correct?",choices:["She is too tired study.","She is too tired to study.","She is too tired studying.","She is too tired studies."],answer:1,level:3}
];

// add extra generated review questions to increase variety
const extraWords = [
  ["shy","害羞的"],["focus","專注"],["success","成功"],["failure","失敗"],["leader","領導者"],
  ["listen","聽"],["talk","說話"],["rest","休息"],["example","例子"],["volume","音量/聲量"],
  ["silence","安靜"],["brilliant","傑出的"],["ability","能力"],["careful","仔細的"],["creative","有創意的"],
  ["thoughtful","深思熟慮的"],["social","社交的"],["culture","文化"],["society","社會"],["attention","注意力"]
];
extraWords.forEach(([word, meaning]) => {
  const wrongs = ["放棄", "破壞", "非常吵", "不重要"].sort(() => Math.random() - 0.5);
  const choices = [meaning, ...wrongs].slice(0,4).sort(() => Math.random() - 0.5);
  questions.push({q:`${word} means?`, choices, answer: choices.indexOf(meaning), level: 1});
});

const extraPatterns = [
  ["after a preposition, use ___", "V-ing"],
  ["be worth + ___", "V-ing"],
  ["contribute to + ___", "Noun / V-ing"],
  ["look forward to + ___", "V-ing"],
  ["prefer A ___ B", "to"],
  ["value A ___ B", "over"],
  ["known ___", "as"],
  ["famous ___", "for"],
  ["good ___", "at"],
  ["rather ___", "than"]
];
extraPatterns.forEach(([q, ans]) => {
  const wrongs = ["to V", "bare V", "on", "with", "than"].filter(x => x !== ans).sort(() => Math.random() - 0.5);
  const choices = [ans, ...wrongs].slice(0,4).sort(() => Math.random() - 0.5);
  questions.push({q, choices, answer: choices.indexOf(ans), level: 2});
});

// ================================
// Opening type animation
// ================================
const introLines = [
  "Hi... I'm a shy rabbit 🐰",
  "Welcome to Introverts: Quietly Brilliant!",
  "Hit the correct answer like a whack-a-mole game.",
  "Let's learn English together!"
];

let lineIndex = 0;
let charIndex = 0;

function typeEffect() {
  const box = document.getElementById("dialogue");
  if (!box) return;

  if (lineIndex < introLines.length) {
    if (charIndex < introLines[lineIndex].length) {
      box.textContent += introLines[lineIndex][charIndex];
      charIndex++;
      setTimeout(typeEffect, 45);
    } else {
      setTimeout(() => {
        box.textContent = "";
        charIndex = 0;
        lineIndex++;
        typeEffect();
      }, 700);
    }
  } else {
    document.getElementById("title").classList.remove("hidden");
    document.getElementById("startBtn").classList.remove("hidden");
  }
}

// ================================
// Game logic
// ================================
function startGame() {
  if (gameStarted) return;
  gameStarted = true;

  document.getElementById("cover").classList.add("hidden");
  document.getElementById("game").classList.remove("hidden");

  playSoftStartSound();
  nextQuestion();
  renderChoices();

  timer = setInterval(() => {
    time--;
    document.getElementById("time").textContent = time;
    if (time <= 0) endGame();
  }, 1000);

  spawnTimer = setInterval(renderChoices, 1600);
}

function nextQuestion() {
  if (usedQuestions.length >= questions.length) usedQuestions = [];

  let index;
  do {
    index = Math.floor(Math.random() * questions.length);
  } while (usedQuestions.includes(index) && usedQuestions.length < questions.length);

  usedQuestions.push(index);
  currentQuestion = questions[index];

  document.getElementById("questionBox").textContent = currentQuestion.q;

  const badge = document.getElementById("levelBadge");
  const label = currentQuestion.level === 1 ? "Easy +1" : currentQuestion.level === 2 ? "Medium +2" : "Boss +3";
  badge.textContent = label;
}

function renderChoices() {
  if (!currentQuestion) return;

  const shuffled = currentQuestion.choices
    .map((text, originalIndex) => ({ text, correct: originalIndex === currentQuestion.answer }))
    .sort(() => Math.random() - 0.5);

  holes.forEach((hole, i) => {
    const item = shuffled[i];
    hole.textContent = item.text;
    hole.dataset.correct = item.correct ? "true" : "false";
    hole.classList.remove("wrong", "glow", "hit");

    if (!item.correct) {
      hole.classList.add("wrong");
    }
  });
}

function hit(index) {
  if (!gameStarted || !currentQuestion) return;

  const hole = holes[index];
  const anim = document.getElementById("animation");

  if (!hole.textContent) return;

  swingHammer();
  hole.classList.add("hit");
  setTimeout(() => hole.classList.remove("hit"), 220);

  if (hole.dataset.correct === "true") {
    score += currentQuestion.level;
    playDing();

    if (currentQuestion.level === 3) {
      playVoiceGreat();
      showPopup("🐰 GREAT! Boss +3");
    } else {
      showPopup("✨ Correct!");
    }

    hole.classList.add("glow");
    anim.textContent = "🔨🥕 Ding Dong!";
    nextQuestion();
    renderChoices();
  } else {
    score -= 3;
    playVoiceOops();

    anim.textContent = "🔨🐰 Oops! 好痛！";
    showPopup("🐰 Oops! -3");

    setTimeout(() => {
      showPopup("✔ " + currentQuestion.choices[currentQuestion.answer]);
      nextQuestion();
      renderChoices();
    }, 850);
  }

  document.getElementById("score").textContent = score;
}

// ================================
// Sound effects without audio files
// ================================
let audioCtx = null;

function getAudioCtx() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioCtx;
}

function beep(freq, duration, type = "sine", gain = 0.07) {
  const ctx = getAudioCtx();
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  g.gain.value = gain;
  osc.connect(g);
  g.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + duration);
}

function playDing() {
  beep(880, 0.08);
  setTimeout(() => beep(1175, 0.1), 90);
}

function playSoftStartSound() {
  beep(523, 0.08);
  setTimeout(() => beep(659, 0.08), 100);
  setTimeout(() => beep(784, 0.12), 200);
}

// Browser speech voice
function speak(text, pitch = 1.1, rate = 1.0) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "en-US";
  u.pitch = pitch;
  u.rate = rate;
  window.speechSynthesis.speak(u);
}

function playVoiceGreat() {
  speak("Great!", 1.25, 0.95);
}

function playVoiceOops() {
  speak("Oops!", 0.85, 0.95);
}

// ================================
// Popup, cursor, fireworks
// ================================
function showPopup(text) {
  const popup = document.getElementById("popup");
  popup.textContent = text;
  popup.classList.remove("hidden");

  setTimeout(() => {
    popup.classList.add("hidden");
  }, 900);
}

function swingHammer() {
  hammerCursor.classList.add("swing");
  setTimeout(() => hammerCursor.classList.remove("swing"), 120);
}

document.addEventListener("mousemove", (e) => {
  if (!hammerCursor) return;
  hammerCursor.style.left = e.clientX + "px";
  hammerCursor.style.top = e.clientY + "px";
});

function launchFireworks() {
  const canvas = document.getElementById("fireworks");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let particles = [];
  const colors = ["#66ccff", "#ffffff", "#ffcc66", "#ff8aa1", "#9affc8"];

  for (let burst = 0; burst < 4; burst++) {
    const cx = canvas.width * (0.25 + Math.random() * 0.5);
    const cy = canvas.height * (0.18 + Math.random() * 0.35);

    for (let i = 0; i < 70; i++) {
      particles.push({
        x: cx,
        y: cy,
        dx: (Math.random() - 0.5) * 9,
        dy: (Math.random() - 0.5) * 9,
        life: 70,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      ctx.fillStyle = p.color;
      ctx.globalAlpha = Math.max(p.life / 70, 0);
      ctx.beginPath();
      ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
      ctx.fill();

      p.x += p.dx;
      p.y += p.dy;
      p.dy += 0.05;
      p.life--;
    });

    ctx.globalAlpha = 1;
    particles = particles.filter(p => p.life > 0);

    if (particles.length > 0) {
      requestAnimationFrame(animate);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  animate();
}

// ================================
// Leaderboard
// ================================
async function saveScore() {
  const input = document.getElementById("playerName");
  const name = input.value.trim() || "Player";

  const record = {
    name,
    score,
    date: new Date().toLocaleString()
  };

  if (window.cloudSaveScore) {
    await window.cloudSaveScore(record);
  } else {
    const board = JSON.parse(localStorage.getItem("leaderboard") || "[]");
    board.push(record);
    board.sort((a, b) => b.score - a.score);
    localStorage.setItem("leaderboard", JSON.stringify(board.slice(0, 10)));
  }

  showPopup("Saved!");
  loadLeaderboard();
}

async function loadLeaderboard() {
  const list = document.getElementById("leaderboard");
  list.innerHTML = "";

  let board = [];

  if (window.cloudLoadLeaderboard) {
    board = await window.cloudLoadLeaderboard();
  } else {
    board = JSON.parse(localStorage.getItem("leaderboard") || "[]");
  }

  board
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .forEach((p, index) => {
      const li = document.createElement("li");
      li.textContent = `${p.name} - ${p.score}`;
      if (index === 0) li.textContent = "🥇 " + li.textContent;
      list.appendChild(li);
    });
}

function endGame() {
  clearInterval(timer);
  clearInterval(spawnTimer);
  gameStarted = false;

  document.getElementById("game").classList.add("hidden");
  document.getElementById("result").classList.remove("hidden");
  document.getElementById("finalScore").textContent = score;

  const localBoard = JSON.parse(localStorage.getItem("leaderboard") || "[]");
  const best = localBoard.length ? Math.max(...localBoard.map(x => x.score)) : -999999;

  if (score > best) {
    showPopup("🐰 New Record!");
    launchFireworks();
  }

  loadLeaderboard();
}

// ================================
// Init
// ================================
window.onload = () => {
  typeEffect();
};
