const wordDisplay = document.getElementById('word-display');
const userInput = document.getElementById('user-input');
const submitButton = document.getElementById('submit-button');
const feedbackMessage = document.getElementById('feedback-message');
const scoreDisplay = document.getElementById('score');
const livesDisplay = document.getElementById('lives');
const startButton = document.getElementById('start-button');
const gameModeSelect = document.getElementById('game-mode');
const numQuestionsInput = document.getElementById('num-questions');
const hintButton = document.getElementById('hint-button');
const hintDisplay = document.getElementById('hint');
const restartButton = document.getElementById('restart-button');
const wordSetSelect = document.getElementById('word-set');
const progressBar = document.getElementById('progress-bar');
const translationDisplay = document.getElementById('translation-display');
const nextButton = document.getElementById('next-button');
const inputContainer = document.getElementById('input-container');
const flashcardContainer = document.getElementById('flashcard-container');
const flashcard = document.getElementById('flashcard');
const quizContainer = document.getElementById('quiz-container');
const toggleFlashcardModeButton = document.getElementById('toggle-flashcard-mode');
const toggleIcon = document.getElementById('toggle-icon');
const flashcardWordDisplay = document.getElementById('flashcard-word-display');

let words = [];
let currentWordIndex;
let score = 0;
let lives = 3;
let gameActive = false;
let numQuestions;
let questionsAsked = 0;
let mode;
let currentWord;
let isFlashcardMode = false;

const wordSets = {
    set1: [
        { spanish: 'Me llamo', english: 'My name is' },
        { spanish: '¿Cómo te llamas?', english: 'What is your name? (informal)' },
        { spanish: '¿Cómo se llama usted?', english: 'What is your name? (formal)' },
        { spanish: 'Mucho gusto', english: 'Nice to meet you' },
        { spanish: 'Igualmente', english: 'Likewise' },
        { spanish: 'Lo mismo digo', english: 'Same to you' },
        { spanish: '¿Cómo estás?', english: 'How are you? (informal)' },
        { spanish: '¿Cómo está usted?', english: 'How are you? (formal)' },
        { spanish: 'Estoy bien', english: 'I am good' },
        { spanish: 'Muy bien', english: 'Very good' },
        { spanish: 'Así, así', english: 'So-so' },
        { spanish: 'Mal/enfermo', english: 'Bad/sick' },
        { spanish: '¿Y tú?', english: 'And you? (informal)' },
        { spanish: '¿Y usted?', english: 'And you? (formal)' },
        { spanish: 'Gracias', english: 'Thank you' },
        { spanish: '¿De dónde eres?', english: 'Where are you from? (informal)' },
        { spanish: '¿De dónde es usted?', english: 'Where are you from? (formal)' },
        { spanish: 'Soy de', english: 'I am from' }
    ],
    set2: [],
    set3: [],
    set4: [],
    set5: []
};

function loadWordSet(setName) {
    words = wordSets[setName] || [];
    if (words.length > 0) {
        wordDisplay.textContent = "Ready?";
        flashcardWordDisplay.textContent = "Ready?";
    } else {
        wordDisplay.textContent = "No words available in this set";
        flashcardWordDisplay.textContent = "No words available in this set";
    }
    userInput.disabled = true;
    submitButton.disabled = true;
}

function startGame() {
    hintButton.style.display = isFlashcardMode ? 'none' : 'inline-block';
    if (!isFlashcardMode) {
        const selectedSet = wordSetSelect.value;
        loadWordSet(selectedSet);
        mode = gameModeSelect.value;
        numQuestions = Math.max(1, parseInt(numQuestionsInput.value) || 1);
        questionsAsked = 0;
        gameActive = true;
        score = 0;
        lives = 3;
        scoreDisplay.textContent = score;
        livesDisplay.textContent = lives;
        feedbackMessage.textContent = "";
        hintDisplay.textContent = "";
        startButton.style.display = 'none';
        restartButton.style.display = 'inline-block';
        userInput.value = '';
        userInput.disabled = false;
        submitButton.disabled = false;
        shuffleArray(words);
        currentWordIndex = 0;
        updateProgressBar();

        inputContainer.style.display = 'flex';
        flashcardContainer.style.display = 'none';
        nextButton.style.display = 'none';
        translationDisplay.textContent = '';

        if (words.length > 0) {
            displayWord();
        }
    } else {
        inputContainer.style.display = 'none';
        flashcardContainer.style.display = 'flex';
        nextButton.style.display = 'inline-block';
        translationDisplay.textContent = '';
        flashcard.classList.remove('flipped');
        startButton.style.display = 'none';
        restartButton.style.display = 'inline-block';

        const selectedSet = wordSetSelect.value;
        words = wordSets[selectedSet] || [];
        shuffleArray(words);
        currentWordIndex = 0;
        questionsAsked = 0;

        if (words.length > 0) {
            nextWord();
        } else {
            wordDisplay.textContent = "No words available in this set";
            flashcardWordDisplay.textContent = "No words available in this set";
        }
    }
}

function nextWord() {
    if (isFlashcardMode) {
        if (words.length === 0) return;

        if (currentWordIndex >= words.length) {
            currentWordIndex = 0;
            shuffleArray(words);
        }

        currentWord = words[currentWordIndex];
        flashcardWordDisplay.textContent = currentWord.spanish;
        translationDisplay.textContent = '';
        flashcard.classList.remove('flipped');
        questionsAsked++;
        currentWordIndex++;
        animateElement(flashcardWordDisplay, 'bounce');
    } else {
        if (questionsAsked < numQuestions && lives > 0) {
            displayWord();
        } else {
            endGame();
        }
    }
}

function displayWord() {
    if (words.length === 0) {
        wordDisplay.textContent = "No words available";
        return;
    }

    let wordObj = words[currentWordIndex % words.length];
    currentWord = wordObj;
    questionsAsked++;

    wordDisplay.textContent = mode === 'es' ? wordObj.english : wordObj.spanish;
    translationDisplay.textContent = '';
    nextButton.style.display = 'none';

    currentWordIndex++;
    animateElement(wordDisplay, 'bounce');
    updateProgressBar();
}

function flipCard() {
    if (isFlashcardMode) {
        flashcard.classList.toggle('flipped');
        if (flashcard.classList.contains('flipped')) {
            translationDisplay.textContent = currentWord.english;
        } else {
            translationDisplay.textContent = '';
        }
    }
}

function checkAnswer() {
    if (!gameActive || isFlashcardMode) return;

    const userAnswer = userInput.value.trim().toLowerCase();
    const correctAnswer = mode === 'es'
        ? currentWord.spanish.toLowerCase()
        : currentWord.english.toLowerCase();
    const displayedWord = mode === 'es'
        ? currentWord.english
        : currentWord.spanish;

    feedbackMessage.classList.remove('correct', 'incorrect');

    if (userAnswer === correctAnswer) {
        feedbackMessage.textContent = "Correct!";
        feedbackMessage.classList.add('correct');
        score++;
        scoreDisplay.textContent = score;
        nextWord();
    } else {
        feedbackMessage.textContent = `Incorrect. The correct answer for "${displayedWord}" is: ${correctAnswer}`;
        feedbackMessage.classList.add('incorrect');
        lives--;
        livesDisplay.textContent = lives;
        if (lives === 0) endGame();
    }

    userInput.value = '';
    updateProgressBar();
}

function endGame() {
    gameActive = false;
    wordDisplay.textContent = "Game Over!";
    flashcardWordDisplay.textContent = "Game Over!";
    feedbackMessage.textContent = `Final Score: ${score} out of ${questionsAsked}`;
    startButton.style.display = 'inline-block';
    restartButton.style.display = 'none';
    hintButton.style.display = 'none';
    userInput.disabled = true;
    submitButton.disabled = true;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function resetGame() {
    gameActive = false;
    score = 0;
    lives = 3;
    questionsAsked = 0;
    scoreDisplay.textContent = score;
    livesDisplay.textContent = lives;
    feedbackMessage.textContent = "";
    hintDisplay.textContent = "";
    wordDisplay.textContent = "Ready?";
    flashcardWordDisplay.textContent = "Ready?";
    startButton.style.display = 'inline-block';
    restartButton.style.display = 'none';
    userInput.value = '';
    userInput.disabled = true;
    submitButton.disabled = true;
    progressBar.style.width = '0%';
    translationDisplay.textContent = '';
    flashcard.classList.remove('flipped');
    hintButton.style.display = 'none';
}

function updateProgressBar() {
    const percentage = (questionsAsked / numQuestions) * 100;
    progressBar.style.width = percentage + '%';
}

function animateElement(element, animationName) {
    element.classList.add(animationName);
    setTimeout(() => element.classList.remove(animationName), 500);
}

function toggleFlashcardMode() {
    isFlashcardMode = !isFlashcardMode;
    toggleIcon.classList.toggle('fa-book');
    toggleIcon.classList.toggle('fa-gamepad');
    quizContainer.style.display = isFlashcardMode ? 'none' : 'flex';
    flashcardContainer.style.display = isFlashcardMode ? 'flex' : 'none';
    resetGame();
}

// Initialization
loadWordSet('set1');

// Event Listeners
wordSetSelect.addEventListener('change', () => loadWordSet(wordSetSelect.value));
startButton.addEventListener('click', startGame);
submitButton.addEventListener('click', checkAnswer);
hintButton.addEventListener('click', () => {
    if (!gameActive || isFlashcardMode) return;
    const hint = mode === 'es'
        ? `Starts with: ${currentWord.spanish.charAt(0)}`
        : `Starts with: ${currentWord.english.charAt(0)}`;
    hintDisplay.textContent = hint;
});
restartButton.addEventListener('click', resetGame);
nextButton.addEventListener('click', nextWord);
userInput.addEventListener('keypress', e => e.key === 'Enter' && checkAnswer());
flashcard.addEventListener('click', flipCard);
toggleFlashcardModeButton.addEventListener('click', toggleFlashcardMode);