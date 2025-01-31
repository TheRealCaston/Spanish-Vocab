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

const GAME_CONSTANTS = {
    INITIAL_LIVES: 3,
    MIN_QUESTIONS: 1,
    ANIMATION_DURATION: 500
};

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
    set2: [
        { spanish: 'la familia', english: 'family' },
        { spanish: 'la madre/la mamá', english: 'mother/mom' },
        { spanish: 'el padre/el papá', english: 'father/dad' },
        { spanish: 'los padres', english: 'parents' },
        { spanish: 'el hermano', english: 'brother' },
        { spanish: 'la hermana', english: 'sister' },
        { spanish: 'los hermanos', english: 'siblings' },
        { spanish: 'el hijo', english: 'son' },
        { spanish: 'la hija', english: 'daughter' },
        { spanish: 'los hijos', english: 'children' },
        { spanish: 'la abuela', english: 'grandmother' },
        { spanish: 'el abuelo', english: 'grandfather' },
        { spanish: 'los abuelos', english: 'grandparents' },
        { spanish: 'el nieto', english: 'grandson' },
        { spanish: 'la nieta', english: 'granddaughter' },
        { spanish: 'los nietos', english: 'grandchildren' },
        { spanish: 'los parientes', english: 'relatives' },
        { spanish: 'la tía', english: 'aunt' },
        { spanish: 'el tío', english: 'uncle' },
        { spanish: 'el primo', english: 'cousin (male)' },
        { spanish: 'la prima', english: 'cousin (female)' },
        { spanish: 'el sobrino', english: 'nephew' },
        { spanish: 'la sobrina', english: 'niece' },
        { spanish: 'el esposo', english: 'husband' },
        { spanish: 'la esposa', english: 'wife' },
        { spanish: 'el gemelo', english: 'twin (male)' },
        { spanish: 'la gemela', english: 'twin (female)' },
        { spanish: 'la mascota', english: 'pet' },
        { spanish: 'el perro', english: 'dog' },
        { spanish: 'el gato', english: 'cat' },
        { spanish: 'el pez', english: 'fish' },
        { spanish: 'el medio hermano', english: 'half brother' },
        { spanish: 'la media hermana', english: 'half sister' },
        { spanish: 'la madrastra', english: 'stepmother' },
        { spanish: 'el padrastro', english: 'stepfather' },
        { spanish: 'la hermanastra', english: 'stepsister' },
        { spanish: 'el hermanastro', english: 'stepbrother' },
        { spanish: 'el bisabuelo', english: 'great-grandfather' },
        { spanish: 'la bisabuela', english: 'great-grandmother' },
        { spanish: 'los bisabuelos', english: 'great-grandparents' },
        { spanish: 'el suegro', english: 'father-in-law' },
        { spanish: 'la suegra', english: 'mother-in-law' },
        { spanish: 'el cuñado', english: 'brother-in-law' },
        { spanish: 'la cuñada', english: 'sister-in-law' },
        { spanish: 'el amigo', english: 'friend (male)' },
        { spanish: 'la amiga', english: 'friend (female)' },
        { spanish: 'la gente', english: 'people' },
        { spanish: 'la persona', english: 'person' },
        { spanish: 'el novio', english: 'boyfriend' },
        { spanish: 'la novia', english: 'girlfriend' },
        { spanish: 'la pareja', english: 'partner' },
        { spanish: 'el chico', english: 'boy' },
        { spanish: 'la chica', english: 'girl' },
        { spanish: 'el niño', english: 'child (male)' },
        { spanish: 'la niña', english: 'child (female)' },
        { spanish: 'bueno', english: 'good' },
        { spanish: 'malo', english: 'bad' },
        { spanish: 'simpático', english: 'nice' },
        { spanish: 'antipático', english: 'not nice' },
        { spanish: 'agradable', english: 'nice' },
        { spanish: 'amable', english: 'kind' },
        { spanish: 'joven', english: 'young' },
        { spanish: 'viejo', english: 'old' },
        { spanish: 'cómico', english: 'funny' },
        { spanish: 'paciente', english: 'patient' },
        { spanish: 'perezoso', english: 'lazy' },
        { spanish: 'generoso', english: 'generous' },
        { spanish: 'inteligente', english: 'smart' },
        { spanish: 'trabajador', english: 'hard-working' },
        { spanish: 'atrevido', english: 'daring' },
        { spanish: 'divertido', english: 'fun' },
        { spanish: 'sociable', english: 'social' },
        { spanish: 'ambicioso', english: 'ambitious' },
        { spanish: 'hablador', english: 'talkative' },
        { spanish: 'tímido', english: 'shy' },
        { spanish: 'comprensivo', english: 'understanding' },
        { spanish: 'serio', english: 'serious' },
        { spanish: 'callado', english: 'quiet' },
        { spanish: 'alto', english: 'tall' },
        { spanish: 'bajo', english: 'short' },
        { spanish: 'bonito', english: 'pretty' },
        { spanish: 'guapo', english: 'good-looking' },
        { spanish: 'pequeño', english: 'small' },
        { spanish: 'grande', english: 'big' },
        { spanish: 'rubio', english: 'blonde' },
        { spanish: 'pelirrojo', english: 'red-haired' },
        { spanish: 'atlético', english: 'athletic' },
        { spanish: 'gordo', english: 'fat' },
        { spanish: 'feo', english: 'ugly' },
        { spanish: 'moreno', english: 'dark-haired' },
        { spanish: 'él', english: 'he' },
        { spanish: 'ella', english: 'she' },
        { spanish: 'ellos', english: 'they (masculine or mixed)' },
        { spanish: 'ellas', english: 'they (feminine)' },
        { spanish: 'es', english: 'is' },
        { spanish: 'son', english: 'are' },
        { spanish: 'muy', english: 'very' },
        { spanish: 'Yo soy', english: 'I am' },
        { spanish: 'Nosotros somos', english: 'We are' },
        { spanish: 'Ellos son', english: 'They are' },
        { spanish: '¿Cómo eres (tú)?', english: 'What are you like?' },
        { spanish: '¿Cómo es él/ella?', english: 'What is he/she like?' },
        { spanish: 'ayudar', english: 'to help' },
        { spanish: 'bailar', english: 'to dance' },
        { spanish: 'caminar', english: 'to walk' },
        { spanish: 'cantar', english: 'to sing' },
        { spanish: 'descansar', english: 'to rest' },
        { spanish: 'dibujar', english: 'to draw' },
        { spanish: 'escuchar', english: 'to listen' },
        { spanish: 'necesitar', english: 'to need' },
        { spanish: 'estudiar', english: 'to study' },
        { spanish: 'hablar', english: 'to talk' },
        { spanish: 'mirar', english: 'to watch' },
        { spanish: 'practicar', english: 'to practice' },
        { spanish: 'jugar', english: 'to play' },
        { spanish: 'tomar', english: 'to take' },
        { spanish: 'trabajar', english: 'to work' },
        { spanish: 'viajar', english: 'to travel' }
    ],
    set3: [],
    set4: [],
    set5: []
};

let words = [];
let currentWordIndex;
let score = 0;
let lives = GAME_CONSTANTS.INITIAL_LIVES;
let gameActive = false;
let numQuestions;
let questionsAsked = 0;
let mode;
let currentWord;
let isFlashcardMode = false;

// Function to initialize the game state
function initializeGame() {
    score = 0;
    lives = GAME_CONSTANTS.INITIAL_LIVES;
    questionsAsked = 0;
    gameActive = false;
    updateDisplay();
}

// Function to update the display elements
function updateDisplay() {
    scoreDisplay.textContent = score;
    livesDisplay.textContent = lives;
    feedbackMessage.textContent = "";
    hintDisplay.textContent = "";
    wordDisplay.textContent = "Ready?";
    flashcardWordDisplay.textContent = "Ready?";
    progressBar.style.width = '0%';
    translationDisplay.textContent = '';
    flashcard.classList.remove('flipped');
}

// Function to handle the end of the game
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

// Function to load a word set
function loadWordSet(setName) {
    words = wordSets[setName] || [];
    if (words.length === 0) {
        wordDisplay.textContent = "No words available in this set";
        flashcardWordDisplay.textContent = "No words available in this set";
    }
    userInput.disabled = true;
    submitButton.disabled = true;
}

// Function to start the game
function startGame() {
    initializeGame();
    const selectedSet = wordSetSelect.value;
    loadWordSet(selectedSet);
    mode = gameModeSelect.value;
    numQuestions = Math.max(GAME_CONSTANTS.MIN_QUESTIONS, parseInt(numQuestionsInput.value) || GAME_CONSTANTS.MIN_QUESTIONS);

    startButton.style.display = 'none';
    restartButton.style.display = 'inline-block';
    hintButton.style.display = 'inline-block';
    userInput.disabled = false;
    submitButton.disabled = false;
    shuffleArray(words);
    currentWordIndex = 0;
    updateProgressBar();

    if (!isFlashcardMode) {
        gameActive = true;
        inputContainer.style.display = 'flex';
        flashcardContainer.style.display = 'none';
        nextButton.style.display = 'none';
        if (words.length > 0) {
            displayWord();
        }
    } else {
        inputContainer.style.display = 'none';
        flashcardContainer.style.display = 'flex';
        nextButton.style.display = 'inline-block';
        if (words.length > 0) {
            nextWord();
        }
    }
}

// Function to display the next word
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

// Function to display a word
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

// Function to check the user's answer
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

// Function to flip the flashcard
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

// Function to reset the game
function resetGame() {
    initializeGame();
    startButton.style.display = 'inline-block';
    restartButton.style.display = 'none';
    userInput.value = '';
    userInput.disabled = true;
    submitButton.disabled = true;
    hintButton.style.display = 'none';
}

// Utility function to shuffle an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Utility function to update the progress bar
function updateProgressBar() {
    const percentage = (questionsAsked / numQuestions) * 100;
    progressBar.style.width = percentage + '%';
}

// Utility function to animate an element
function animateElement(element, animationName) {
    element.classList.add(animationName);
    setTimeout(() => element.classList.remove(animationName), GAME_CONSTANTS.ANIMATION_DURATION);
}

// Function to toggle between flashcard and quiz mode
function toggleFlashcardMode() {
    isFlashcardMode = !isFlashcardMode;
    toggleIcon.classList.toggle('fa-book');
    toggleIcon.classList.toggle('fa-gamepad');
    quizContainer.style.display = isFlashcardMode ? 'none' : 'flex';
    flashcardContainer.style.display = isFlashcardMode ? 'flex' : 'none';
    resetGame();
}

// Event listener for the 'Enter' key on user input
userInput.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent form submission or other default behavior
        if (gameActive && !isFlashcardMode) {
            checkAnswer();
        }
    }
});

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
flashcard.addEventListener('click', flipCard);
toggleFlashcardModeButton.addEventListener('click', toggleFlashcardMode);
