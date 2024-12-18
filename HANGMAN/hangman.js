const words = {
    fruits: ['apple', 'banana', 'cherry', 'date', 'fig'],
    animals: ['cat', 'dog', 'elephant', 'giraffe', 'kangaroo'],
    countries: ['canada', 'brazil', 'india', 'japan', 'mexico']
};
let selectedWord = '';
let correctLetters = [];
let wrongLetters = [];
const wordElement = document.getElementById('word');
const wrongLettersElement = document.getElementById('wrong-letters');
const messageContainer = document.getElementById('message-container');
const messageElement = document.getElementById('message');
const playAgainButton = document.getElementById('play-again');
const letterButtonsContainer = document.getElementById('letter-buttons');
const hangmanCanvas = document.getElementById('hangman-canvas');
const ctx = hangmanCanvas.getContext('2d');
const categoryContainer = document.getElementById('category-container');
const gameArea = document.getElementById('game-area');

const hangmanParts = [
    () => { ctx.moveTo(10, 390); ctx.lineTo(190, 390); }, // base
    () => { ctx.moveTo(100, 390); ctx.lineTo(100, 10); }, // vertical pole
    () => { ctx.moveTo(100, 10); ctx.lineTo(180, 10); }, // horizontal pole
    () => { ctx.moveTo(180, 10); ctx.lineTo(180, 50); }, // rope
    () => { ctx.arc(180, 80, 30, 0, Math.PI * 2); }, // head
    () => { ctx.moveTo(180, 110); ctx.lineTo(180, 240); }, // body
    () => { ctx.moveTo(180, 140); ctx.lineTo(150, 200); }, // left arm
    () => { ctx.moveTo(180, 140); ctx.lineTo(210, 200); }, // right arm
    () => { ctx.moveTo(180, 240); ctx.lineTo(150, 320); }, // left leg
    () => { ctx.moveTo(180, 240); ctx.lineTo(210, 320); } // right leg
];

function drawHangman() {
    ctx.clearRect(0, 0, hangmanCanvas.width, hangmanCanvas.height);
    ctx.beginPath();
    hangmanParts.slice(0, wrongLetters.length).forEach(part => part());
    ctx.stroke();
}

function displayWord() {
    wordElement.innerHTML = selectedWord.split('').map(letter => 
        `<span>${correctLetters.includes(letter) ? letter : '_'}</span>`
    ).join('');
    
    if (wordElement.innerText.replace(/\n/g, '') === selectedWord) {
        messageElement.innerText = 'Congratulations! You won!';
        messageContainer.style.display = 'block';
        messageElement.style.color = 'green';
    }
}

function updateWrongLetters() {
    wrongLettersElement.innerHTML = `
        ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
        ${wrongLetters.join(', ')}
    `;
    
    if (wrongLetters.length === hangmanParts.length) {
        messageElement.innerText = 'Unfortunately, you lost.';
        messageContainer.style.display = 'block';
        messageElement.style.color = 'red';
    }
    
    drawHangman();
}

function showNotification() {
    messageContainer.classList.add('show');
    setTimeout(() => {
        messageContainer.classList.remove('show');
    }, 2000);
}

function resetGame() {
    correctLetters = [];
    wrongLetters = [];
    selectCategory(selectedCategory);
    displayWord();
    updateWrongLetters();
    letterButtonsContainer.querySelectorAll('button').forEach(button => {
        button.disabled = false;
    });
    messageContainer.style.display = 'none';
}

function initGame() {
    displayWord();
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    letterButtonsContainer.innerHTML = alphabet.map(letter => 
        `<button>${letter}</button>`
    ).join('');
    letterButtonsContainer.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const letter = e.target.innerText;
            if (selectedWord.includes(letter)) {
                if (!correctLetters.includes(letter)) {
                    correctLetters.push(letter);
                    displayWord();
                } else {
                    showNotification();
                }
            } else {
                if (!wrongLetters.includes(letter)) {
                    wrongLetters.push(letter);
                    updateWrongLetters();
                } else {
                    showNotification();
                }
            }
            e.target.disabled = true;
        }
    });
}

let selectedCategory = '';

function selectCategory(category) {
    selectedCategory = category;
    selectedWord = words[category][Math.floor(Math.random() * words[category].length)];
    categoryContainer.style.display = 'none';
    gameArea.style.display = 'block';
    initGame();
    drawHangman();
}

playAgainButton.addEventListener('click', resetGame);
