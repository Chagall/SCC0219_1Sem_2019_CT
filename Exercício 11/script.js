const btn = document.querySelector('button');

let playerOneInput = "";
let playerTwoInput = "";
const InputEnum = Object.freeze({ "P1_CHOOSES": 1, "P2_CHOOSES": 2 });
const ResultEnum = Object.freeze({ "P1_WIN": 1, "P2_WIN": 2, "DRAW": 0, "INPUT_ERROR": -1 });
let playerCounter = 1;

btn.addEventListener('click', receivePlayerInput());

function receivePlayerInput() {

  document.addEventListener('keydown', keydownHandler);

  function keydownHandler(event) {

    console.log(event.key);

    if (playerCounter === InputEnum.P1_CHOOSES) {
      if (event.key !== "d" && event.key !== "p" && event.key !== "t") {
        alert("Escolha uma opção válida para o jogador 1");
      } else {
        playerOneInput = event.key;
        playerCounter++;
      }
    }
    else if (playerCounter === InputEnum.P2_CHOOSES) {
      if (event.key !== "d" && event.key !== "p" && event.key !== "t") {
        alert("Escolha uma opção válida para o jogador 2");
      } else {
        playerTwoInput = event.key;
        playerCounter--;
        showInputs();
        const result = compareInputs(playerOneInput, playerTwoInput);
        announceResult(result);
        btn.textContent = "Reset";
      }
    }
  };
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

function announceResult(result) {
  if (result === ResultEnum.P1_WIN) {
    alert("O jogador 1 venceu!");
  }
  else if (result === ResultEnum.P2_WIN) {
    alert("O jogador 2 venceu!");
  }
  else if (result === ResultEnum.DRAW) {
    alert("Ocorreu um empate!");
  }
  else {
    alert("Um dos jogadores selecionou uma opção inválida");
  }
}

function showInputs() {
  if (playerOneInput === "d") {
    document.getElementById("player_1").textContent = "Player 1: PEDRA"
  }
  else if (playerOneInput === "p") {
    document.getElementById("player_1").textContent = "Player 1: PAPEL"
  }
  else if (playerOneInput === "t") {
    document.getElementById("player_1").textContent = "Player 1: TESOURA"
  }

  if (playerTwoInput === "d") {
    document.getElementById("player_2").textContent = "Player 2: PEDRA"
  }
  else if (playerTwoInput === "p") {
    document.getElementById("player_2").textContent = "Player 2: PAPEL"
  }
  else if (playerTwoInput === "t") {
    document.getElementById("player_2").textContent = "Player 2: TESOURA"
  }
}

// Volta o placar para 0
function reset() {

}