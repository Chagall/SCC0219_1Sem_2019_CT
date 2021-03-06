const btn = document.querySelector('button');

let playerOneInput = "";
let playerOneScore = 0;
let playerTwoInput = "";
let playerTwoScore = 0;

const jokenpoOptions = Object.freeze({ "PEDRA": "d", "PAPEL": "p", "TESOURA": "t" });
const InputEnum = Object.freeze({ "P1_CHOOSES": 1, "P2_CHOOSES": 2 });
const ResultEnum = Object.freeze({ "P1_WIN": 1, "P2_WIN": 2, "DRAW": 0, "INPUT_ERROR": -1 });

let whoPlays = 1;
let result = -1;

const PAPER_IMG_URL = "https://raw.githubusercontent.com/Chagall/SCC0219_1Sem_2019_CT/master/Exercicio%2011%20-%20Images/paper.png"
const SCISSOR_IMG_URL = "https://raw.githubusercontent.com/Chagall/SCC0219_1Sem_2019_CT/master/Exercicio%2011%20-%20Images/scissor.png"
const STONE_IMG_URL = "https://raw.githubusercontent.com/Chagall/SCC0219_1Sem_2019_CT/master/Exercicio%2011%20-%20Images/stone.png"

var paperImgURL = "";
var scissorImgURL = "";
var stoneImgURL = "";

function downloadImages() {
  fetch(PAPER_IMG_URL, { mode: "cors"})
  .then(response => response.blob())
  .then(myBlob => {
    paperImgURL = URL.createObjectURL(myBlob);
  })
  .catch(e => {
    console.log('There has been a problem with your fetch operation: ' + e.message);
  });

  fetch(SCISSOR_IMG_URL, { mode: "cors"})
  .then(response => response.blob())
  .then(myBlob => {
    scissorImgURL = URL.createObjectURL(myBlob);
  })
  .catch(e => {
    console.log('There has been a problem with your fetch operation: ' + e.message);
  });

  fetch(STONE_IMG_URL, { mode: "cors"})
  .then(response => response.blob())
  .then(myBlob => {
    stoneImgURL = URL.createObjectURL(myBlob);
  })
  .catch(e => {
    console.log('There has been a problem with your fetch operation: ' + e.message);
  });
}

btn.addEventListener('click', function () { startGame() });

function resetGame() {
  playerOneInput = "";
  playerTwoInput = "";
  playerOneScore = 0;
  playerTwoScore = 0;
  whoPlays = 1;
  result = -1;
  document.getElementById("player_1_score").textContent = "Score: 0";
  document.getElementById("player_2_score").textContent = "Score: 0";
  document.getElementById("whoIsChoosing").style = "visibility: visible;";
  document.getElementById("whoIsChoosing").textContent = "Vez do jogador 1";  
  document.getElementById("player_1_image").style = "visibility: hidden;";
  document.getElementById("player_2_image").style = "visibility: hidden;";
}

function startGame() {
  downloadImages();
  resetGame();
  receivePlayerInput();
}

function keydownHandler(event) {
  // Se for a vez do jogador 1, receba o input dele
  if (whoPlays === InputEnum.P1_CHOOSES) {
    if (event.key !== jokenpoOptions.PEDRA && event.key !== jokenpoOptions.PAPEL && event.key !== jokenpoOptions.TESOURA) {
      alert("Escolha uma opção válida para o jogador 1!");
    }
    else {
      playerOneInput = event.key;
      whoPlays++;
      // Mostra que e a vez do jogador 1
      document.getElementById("whoIsChoosing").textContent = "Vez do jogador 2";
    }
  }
  // Se for a vez do jogador 2, receba o input dele
  else if (whoPlays === InputEnum.P2_CHOOSES) {
    if (event.key !== jokenpoOptions.PEDRA && event.key !== jokenpoOptions.PAPEL && event.key !== jokenpoOptions.TESOURA) {
      alert("Escolha uma opção válida para o jogador 2");
    }
    else {
      playerTwoInput = event.key;
      whoPlays--;
      document.getElementById("whoIsChoosing").textContent = "Vez do jogador 1";
      showInputs();
      computeResult();
      announceResult();
    }
  }
}

function receivePlayerInput() {
  btn.textContent = "Playing";
  document.addEventListener('keydown', keydownHandler);
}

function computeResult() {
  result = compareInputs(playerOneInput, playerTwoInput);

  if (result === ResultEnum.P1_WIN) {
    playerOneScore++;
    document.getElementById("player_1_score").textContent = "Score: " + playerOneScore;
  }
  else if (result === ResultEnum.P2_WIN) {
    playerTwoScore++;
    document.getElementById("player_2_score").textContent = "Score: " + playerTwoScore;
  }
  else if (result === ResultEnum.DRAW) {
    alert("Ocorreu um empate!");
  }
  else {
    alert("Um dos jogadores selecionou uma opção inválida");
  }
}

/*
  Compara as escolhas feitas por cada um dos jogadores
  Retorna: 
  - ResultEnum.DRAW:    Se der empate
  - ResultEnum.P1_WIN:  Se o jogador 1 vencer
  - ResultEnum.P2_WIN:  Se o jogador 2 vencer
*/
function compareInputs(playerOneInput, playerTwoInput) {
  // Pedra vs Pedra
  if (playerOneInput === "d" && playerTwoInput === "d") {
    console.log("Empate");
    return ResultEnum.DRAW;
  }
  // Pedra vs Papel
  else if (playerOneInput === "d" && playerTwoInput === "p") {
    console.log("P2 vence");
    return ResultEnum.P2_WIN;
  }
  // Pedra vs Tesoura
  else if (playerOneInput === "d" && playerTwoInput === "t") {
    console.log("P1 vence");
    return ResultEnum.P1_WIN;
  }
  // Papel vs Pedra
  else if (playerOneInput === "p" && playerTwoInput === "d") {
    console.log("P1 vence");
    return ResultEnum.P1_WIN;
  }
  // Papel vs Papel
  else if (playerOneInput === "p" && playerTwoInput === "p") {
    console.log("Empate");
    return ResultEnum.DRAW;
  }
  // Papel vs Tesoura
  else if (playerOneInput === "p" && playerTwoInput === "t") {
    console.log("P2 vence");
    return ResultEnum.P2_WIN;
  }
  // Tesoura vs Pedra
  else if (playerOneInput === "t" && playerTwoInput === "d") {
    console.log("P2 vence");
    return ResultEnum.P2_WIN;
  }
  // Tesoura vs Papel
  else if (playerOneInput === "t" && playerTwoInput === "p") {
    console.log("P1 vence");
    return ResultEnum.P1_WIN;
  }
  // Tesoura vs Tesoura
  else if (playerOneInput === "t" && playerTwoInput === "t") {
    console.log("Empate");
    return ResultEnum.DRAW;
  }
  else {
    console.log("Um dos jogadores selecionou uma opção inválida");
    return ResultEnum.INPUT_ERROR;
  }
}

function announceResult() {
  if (playerOneScore >= 3) {
    btn.textContent = "Reset";
    document.getElementById("whoIsChoosing").style = "visibility: hidden;";
    alert("O jogador 1 venceu!");
    document.removeEventListener('keydown', keydownHandler);
  }
  else if (playerTwoScore >= 3) {
    btn.textContent = "Reset";
    document.getElementById("whoIsChoosing").style = "visibility: hidden;";
    alert("O jogador 2 venceu!");
    document.removeEventListener('keydown', keydownHandler);
  }
}

/*
  Mostra na pagina qual a opcao selecionada por cada jogador
*/
function showInputs() {
  if (playerOneInput === "d") {
    document.getElementById("player_1").textContent = "Player 1: PEDRA"
    document.getElementById("player_1_image").style = "visibility: visible;";
    document.getElementById("player_1_image").src = stoneImgURL;
  }
  else if (playerOneInput === "p") {
    document.getElementById("player_1").textContent = "Player 1: PAPEL"
    document.getElementById("player_1_image").style = "visibility: visible;";
    document.getElementById("player_1_image").src = paperImgURL;

  }
  else if (playerOneInput === "t") {
    document.getElementById("player_1").textContent = "Player 1: TESOURA"
    document.getElementById("player_1_image").style = "visibility: visible;";
    document.getElementById("player_1_image").src = scissorImgURL;

  }

  if (playerTwoInput === "d") {
    document.getElementById("player_2").textContent = "Player 2: PEDRA"
    document.getElementById("player_2_image").style = "visibility: visible;";
    document.getElementById("player_2_image").src = stoneImgURL;
  }
  else if (playerTwoInput === "p") {
    document.getElementById("player_2").textContent = "Player 2: PAPEL"
    document.getElementById("player_2_image").style = "visibility: visible;";
    document.getElementById("player_2_image").src = paperImgURL;
  }
  else if (playerTwoInput === "t") {
    document.getElementById("player_2").textContent = "Player 2: TESOURA"
    document.getElementById("player_2_image").style = "visibility: visible;";
    document.getElementById("player_2_image").src = scissorImgURL;
  }
}