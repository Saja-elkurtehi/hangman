const words = ["rizz", "ohio", "skibidi", "sigma", "fanumtax"];
let selectedWord = words[Math.floor(Math.random() * words.length)];
let guessedLetters = [];
let wrongGuesses = 0;
const maxWrong = 8;

const wordDisplay = document.getElementById("wordDisplay");
const letterBank = document.getElementById("letterBank");
const hangmanCanvas = document.getElementById("hangmanCanvas");
const ctx = hangmanCanvas.getContext("2d");


function updateWordDisplay() {
    wordDisplay.textContent = selectedWord
        .split("")
        .map(letter => (guessedLetters.includes(letter) ? letter : "_"))
        .join(" ");
}

function createLetterButtons() {
    const alphabet = "qwertyuiopasdfghjklzxcvbnm".split("");
    alphabet.forEach(letter => {
        const btn = document.createElement("button");
        btn.textContent = letter;
        btn.addEventListener("click", () => handleGuess(letter, btn));
        letterBank.appendChild(btn);
    });
}


function showResult(message) {
    document.getElementById("resultMessage").textContent = message;
    document.getElementById("resultBox").classList.remove("hidden");
}

function restartGame() {

    selectedWord = words[Math.floor(Math.random() * words.length)];
    guessedLetters = [];
    wrongGuesses = 0;

    ctx.clearRect(0, 0, hangmanCanvas.width, hangmanCanvas.height);

    letterBank.innerHTML = "";
    createLetterButtons();

    updateWordDisplay();

    document.getElementById("resultBox").classList.add("hidden");
}


function handleGuess(letter, button) {
    button.disabled = true;

    if (selectedWord.includes(letter)) {
        guessedLetters.push(letter);
        updateWordDisplay();

        if (!wordDisplay.textContent.includes("_")) {
            showResult(`🎉 You win! The word was: ${selectedWord}`);
        } 
    } else {
        wrongGuesses++;
        drawHangman(wrongGuesses);

        if (wrongGuesses >= maxWrong) {
            showResult(`💀 Game over! The word was: ${selectedWord}`);
        }
    }
}

function drawHangman(step) {
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#d63384";

    if (step === 1) { // Base
        ctx.beginPath();
        ctx.moveTo(10, 190);
        ctx.lineTo(150, 190);
        ctx.stroke();
    } else if (step === 2) { // Pole
        ctx.beginPath();
        ctx.moveTo(40, 190);
        ctx.lineTo(40, 20);
        ctx.lineTo(120, 20);
        ctx.lineTo(120, 40);
        ctx.stroke();
    } else if (step === 3) { // Head
        ctx.beginPath();
        ctx.arc(120, 55, 15, 0, Math.PI * 2);
        ctx.stroke();
    } else if (step === 4) { // Body
        ctx.beginPath();
        ctx.moveTo(120, 70);
        ctx.lineTo(120, 120);
        ctx.stroke();
    } else if (step === 5) { // Left Arm
        ctx.beginPath();
        ctx.moveTo(120, 80);
        ctx.lineTo(100, 100);
        ctx.stroke();
    } else if (step === 6) { // Right Arm
        ctx.beginPath();
        ctx.moveTo(120, 80);
        ctx.lineTo(140, 100);
        ctx.stroke();
    } else if (step === 7) { // Left Leg
        ctx.beginPath();
        ctx.moveTo(120, 120);
        ctx.lineTo(100, 150);
        ctx.stroke();
    } else if (step === 8) { // Right Leg
        ctx.beginPath();
        ctx.moveTo(120, 120);
        ctx.lineTo(140, 150);
        ctx.stroke();
    }
    
}

updateWordDisplay();
createLetterButtons();



