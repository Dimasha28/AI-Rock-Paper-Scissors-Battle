let playerHistory = [];
let gameActive = false;
let playerScore = 0;
let aiScore = 0;

document.getElementById('startBtn').addEventListener('click', startGame);
document.getElementById('pauseBtn').addEventListener('click', pauseGame);
document.getElementById('restartBtn').addEventListener('click', restartGame);

function startGame() {
  gameActive = true;
  document.getElementById('game').style.display = 'block';
  document.getElementById('status').textContent = "Game Started! Choose Rock, Paper, or Scissors!";
}

function pauseGame() {
  gameActive = false;
  document.getElementById('status').textContent = "Game Paused.";
}

function restartGame() {
  playerScore = 0;
  aiScore = 0;
  playerHistory = [];
  document.getElementById('score').textContent = "Your Score: 0 | AI Score: 0";
  document.getElementById('result').textContent = "";
  document.getElementById('aiChoice').textContent = "";
  startGame();
}

function playerMove(move) {
  if (!gameActive) return;

  playerHistory.push(move);
  const aiMove = aiPredict();
  document.getElementById('aiChoice').textContent = "AI chose: " + aiMove;

  let result = "";

  if (move === aiMove) {
    result = "It's a Draw!";
  } else if (
    (move === "rock" && aiMove === "scissors") ||
    (move === "paper" && aiMove === "rock") ||
    (move === "scissors" && aiMove === "paper")
  ) {
    result = "You Win!";
    playerScore++;
  } else {
    result = "AI Wins!";
    aiScore++;
  }

  document.getElementById('result').textContent = result;
  document.getElementById('score').textContent = `Your Score: ${playerScore} | AI Score: ${aiScore}`;
}

function aiPredict() {
  if (playerHistory.length < 3) {
    return randomChoice();
  } else {
    const counts = { rock: 0, paper: 0, scissors: 0 };
    playerHistory.forEach(m => counts[m]++);
    const mostCommon = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
    if (mostCommon === "rock") return "paper";
    if (mostCommon === "paper") return "scissors";
    if (mostCommon === "scissors") return "rock";
  }
}

function randomChoice() {
  const choices = ["rock", "paper", "scissors"];
  return choices[Math.floor(Math.random() * choices.length)];
}
