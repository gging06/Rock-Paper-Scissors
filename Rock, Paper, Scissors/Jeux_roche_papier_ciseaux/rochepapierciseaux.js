// Variables
const p1 = document.getElementById("testId");

const victoiresUtilisateur = document.getElementById("victoiresUtilisateur");
const defaitesUtilisateur = document.getElementById("defaitesUtilisateur");
const nullesUtilisateur = document.getElementById("nullesUtilisateur");

const victoiresOrdinateur = document.getElementById("victoiresOrdinateur");
const defaitesOrdinateur = document.getElementById("defaitesOrdinateur");
const nullesOrdinateur = document.getElementById("nullesOrdinateur");

const images = ["ciseaux.png", "roche.png", "papier.png"];

//Images qui bougent
let currentIndex = 0;

function changeImage() {
  const imageElement = document.getElementById("gameImage");
  currentIndex++;
  if (currentIndex >= images.length) {
    currentIndex = 0;
  }
  imageElement.src = images[currentIndex];
}

let intervalId;
function startImageRotation() {
  intervalId = setInterval(changeImage, 500);
}

function stopImageRotation() {
  clearInterval(intervalId);
}

setTimeout(stopImageRotation, 3000);

let resultats = {
  utilisateurVic: 0,
  utilisateurDef: 0,
  utilisateurNul: 0,
  ordinateurVic: 0,
  ordinateurDef: 0,
  ordinateurNul: 0,
};


function saveBoard() {
  localStorage.setItem("resultats", JSON.stringify(resultats));
}

function loadBoard() {
  const savedResultats = JSON.parse(localStorage.getItem("resultats"));
  if (savedResultats) {
    resultats = savedResultats;
    updateScoreboard();
  }
}

function updateScoreboard() {
  nullesOrdinateur.innerHTML = resultats.ordinateurNul;
  nullesUtilisateur.innerHTML = resultats.utilisateurNul;
  victoiresOrdinateur.innerHTML = resultats.ordinateurVic;
  defaitesUtilisateur.innerHTML = resultats.utilisateurDef;
  defaitesOrdinateur.innerHTML = resultats.ordinateurDef;
  victoiresUtilisateur.innerHTML = resultats.utilisateurVic;
}

// Fonction nulle
function nulle() {
  resultats.ordinateurNul++;
  resultats.utilisateurNul++;
  updateScoreboard();
  displayMessage("Damn, that's a draw!");
}

// Fonction victoire de l'utilisateur
function vicUtilisateur() {
  resultats.utilisateurVic++;
  resultats.ordinateurDef++;
  updateScoreboard();
  displayMessage("🎉Yeahh, you won!🎉");
}

// Fonction défaite de l'utilisateur
function defUtilisateur() {
  resultats.utilisateurDef++;
  resultats.ordinateurVic++;
  updateScoreboard();
  displayMessage("Aww, you lost...😢");
}

function startCountdown(imageName) {
  let countdownElement = document.getElementById("countdown");
  countdownElement.innerHTML = "Rock.";

  startImageRotation(); // Start image rotation

  // Function to update the image based on the word displayed in the countdown
  function updateImage(word) {
    const imageElementRock = document.getElementById("gameImageRock");
    const imageElementScissors = document.getElementById("gameImageScissors");
    const imageElementPaper = document.getElementById("gameImagePaper");

    imageElementRock.style.display = "none";
    imageElementScissors.style.display = "none";
    imageElementPaper.style.display = "none";

    switch (word) {
      case "Rock.":
        imageElementRock.style.display = "block";
        break;
      case "Paper..":
        imageElementPaper.style.display = "block";
        break;
      case "Scissors...":
        imageElementScissors.style.display = "block";
        break;
    }
  }

  switch (imageName) {
    case "rock":
      countdownElement.innerHTML = "Rock.";
      updateImage("Rock.");
      break;
    case "scissors":
      countdownElement.innerHTML = "Scissors...";
      updateImage("Scissors...");
      break;
    case "paper":
      countdownElement.innerHTML = "Paper..";
      updateImage("Paper..");
      break;
  }

  setTimeout(function () {
    countdownElement.innerHTML = "Shoot!!";
    setTimeout(function () {
      countdownElement.innerHTML = "";
      updateImage(""); // Hide the image at the end of the countdown
      action(imageName);
      stopImageRotation(); // Stop image rotation at the end of the countdown
    }, 1000);
  }, 1000);
}



function action(nombreUtilisateur) {
  let nombreOrdinateur = Math.floor(Math.random() * 3) + 1;

  // Switch + détermine si gagné, perdu ou nul
  switch (nombreUtilisateur) {
    case 1:
      if (nombreOrdinateur === 1) {
        console.log("Nulle");
        nulle();
      } else if (nombreOrdinateur === 2) {
        console.log("Gagné");
        vicUtilisateur();
      } else if (nombreOrdinateur === 3) {
        console.log("Perdu");
        defUtilisateur();
      }
      break;

    case 2:
      if (nombreOrdinateur === 1) {
        console.log("Perdu");
        defUtilisateur();
      } else if (nombreOrdinateur === 2) {
        console.log("Nulle");
        nulle();
      } else if (nombreOrdinateur === 3) {
        console.log("Gagné");
        vicUtilisateur();
      }
      break;

    case 3:
      if (nombreOrdinateur === 1) {
        console.log("Gagné");
        vicUtilisateur();
      } else if (nombreOrdinateur === 2) {
        console.log("Perdu");
        defUtilisateur();
      } else if (nombreOrdinateur === 3) {
        console.log("Nulle");
        nulle();
      }
      break;

    case 4:
      resultats.utilisateurVic = 0;
      resultats.utilisateurDef = 0;
      resultats.utilisateurNul = 0;
      resultats.ordinateurVic = 0;
      resultats.ordinateurDef = 0;
      resultats.ordinateurNul = 0;
      updateScoreboard();
  
      stopImageRotation();
      break;
  }
  

// Charge les résultats sauvegardés au chargement de la page
loadBoard();

function displayMessage(message) {
  const messageElement = document.getElementById("messageFinManche");
  messageElement.innerHTML = message;
  messageElement.style.display = "block";

  setTimeout(function() {
    messageElement.style.display = "none";
  }, 3000); }
}

function displayMessage(message) {
  const messageElement = document.getElementById("messageDefaite");
  messageElement.innerHTML = message;
  messageElement.style.display = "block";

  setTimeout(function() {
    messageElement.style.display = "none";
  }, 3000); }

function displayMessage(message) {
  const messageElement = document.getElementById("messageNulle");
  messageElement.innerHTML = message;
  messageElement.style.display = "block";

  setTimeout(function() {
    messageElement.style.display = "none";
  }, 3000); }
