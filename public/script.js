let numero = ["_", "_"];

let voto1 = ["0", "1"];
let voto2 = ["0", "2"];
let voto3 = ["0", "3"];
let voto4 = ["0", "4"];

let CHAPA1 = 0; // 01: Jovens Visionários - Rosa
let CHAPA2 = 0; // 02: Maktub - Azul
let CHAPA3 = 0; // 03: RDA - Verde
let CHAPA4 = 0; // 04: Visão Coletiva - Lilás

function exibir() {
  const elementoChapa = document.getElementById("CHAPA");
  if (numero.toString() == voto1.toString()) {
    elementoChapa.innerText = "Jovens Visionários";
    elementoChapa.style.color = "hotpink";
  } else if (numero.toString() == voto2.toString()) {
    elementoChapa.innerText = "Maktub";
    elementoChapa.style.color = "blue";
  } else if (numero.toString() == voto3.toString()) {
    elementoChapa.innerText = "RDA";
    elementoChapa.style.color = "green";
  } else if (numero.toString() == voto4.toString()) {
    elementoChapa.innerText = "Visão Coletiva";
    elementoChapa.style.color = "darkorchid";
  } else {
    elementoChapa.innerText = "";
    elementoChapa.style.color = "black";
  }
}

function registrar_num(num_voto) {
  if (numero[0] == "_") {
    numero.shift();
    numero.unshift(num_voto);
    document.getElementById("num").innerText = numero.join(" ");
  } else {
    numero.pop();
    numero.push(num_voto);
    document.getElementById("num").innerText = numero.join(" ");
  }
  exibir();
}

function limpar() {
  numero = ["_", "_"];
  document.getElementById("num").innerText = numero.join(" ");
  document.getElementById("CHAPA").innerText = " ";
}

async function enviarVoto(numero, chapa) {
  const response = await fetch("/api/votos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ numero, chapa }),
  });

  if (response.ok) {
    console.log("Voto enviado com sucesso!");
  } else {
    console.error("Erro ao enviar voto");
  }
}

function playConfirmSound() {
  const audio = new Audio("confirm-sound.mp3");
  audio.play();
}

function finalizar() {
  alert("VOTO COMPUTADO COM SUCESSO!");
}

function confirmar() {
  let isValid = false;
  let chapa = "";

  if (numero.toString() === voto1.toString()) {
    CHAPA1 += 1;
    isValid = true;
    chapa = "Visão Coletiva";
  } else if (numero.toString() === voto2.toString()) {
    CHAPA2 += 1;
    isValid = true;
    chapa = "Maktub";
  } else if (numero.toString() === voto3.toString()) {
    CHAPA3 += 1;
    isValid = true;
    chapa = "RDA";
  } else if (numero.toString() === voto4.toString()) {
    CHAPA4 += 1;
    isValid = true;
    chapa = "Jovens Visionários";
  }

  if (isValid) {
    numero = ["_", "_"];
    document.getElementById("CHAPA").innerText = " ";
    document.getElementById("num").innerText = numero.join(" ");
    playConfirmSound();
    enviarVoto(numero.join(""), chapa);
    finalizar();
  } else {
    alert(
      "Número digitado inválido. Por favor, insira um número válido (01, 02, 03 ou 04)."
    );
    limpar();
  }
}

document.addEventListener("keydown", function (event) {
  const keyPressed = event.key;
  if (
    !isNaN(parseInt(keyPressed)) &&
    parseInt(keyPressed) >= 0 &&
    parseInt(keyPressed) <= 9
  ) {
    registrar_num(keyPressed);
  } else if (keyPressed === "Enter") {
    confirmar();
  } else if (keyPressed === "Backspace") {
    limpar();
  }
});
