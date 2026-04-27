let score = 0;
let time = 300;
let timer;
let currentQuestion;

const holes = document.querySelectorAll(".hole");

const questions = [
  {q:"introvert means?",choices:["外向","內向","老師","學生"],answer:1,level:1},
  {q:"be worth ___?",choices:["read","reading","to read","reads"],answer:1,level:3}
];

function startGame(){
  document.getElementById("cover").classList.add("hidden");
  document.getElementById("game").classList.remove("hidden");

  nextQuestion();

  timer = setInterval(()=>{
    time--;
    document.getElementById("time").textContent=time;
    if(time<=0) endGame();
  },1000);

  spawn();
}

function nextQuestion(){
  currentQuestion = questions[Math.floor(Math.random()*questions.length)];
  document.getElementById("questionBox").textContent = currentQuestion.q;
}

function spawn(){
  setInterval(()=>{
    holes.forEach(h=>h.textContent="");

    let shuffled = [...currentQuestion.choices].sort(()=>Math.random()-0.5);

    holes.forEach((h,i)=>{
      h.textContent = shuffled[i];
      h.dataset.correct = (shuffled[i]===currentQuestion.choices[currentQuestion.answer]);
    });

  },1000);
}

function hit(i){
  let h = holes[i];

  if(h.dataset.correct==="true"){
    score+=1;
    h.classList.add("glow");
  }else{
    score-=3;
  }

  document.getElementById("score").textContent=score;
}

function endGame(){
  clearInterval(timer);
  document.getElementById("game").classList.add("hidden");
  document.getElementById("result").classList.remove("hidden");

  document.getElementById("finalScore").textContent="Score: "+score;
}

function saveScore(){
  let name=document.getElementById("playerName").value;
  let board=JSON.parse(localStorage.getItem("board")||"[]");
  board.push({name,score});
  board.sort((a,b)=>b.score-a.score);
  localStorage.setItem("board",JSON.stringify(board));
}
