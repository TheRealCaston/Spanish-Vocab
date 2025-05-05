// --- DOM Elements ---
// Header & Mode Toggles
const toggleDarkModeButton = document.getElementById('toggle-dark-mode');
const toggleFlashcardModeButton = document.getElementById('toggle-flashcard-mode');
const toggleIcon = document.getElementById('toggle-icon'); // Quiz/Flashcard icon
const sunIcon = toggleDarkModeButton.querySelector('.fa-sun');
const moonIcon = toggleDarkModeButton.querySelector('.fa-moon');

// Sidebar Settings
const wordSetSelect = document.getElementById('word-set');
const gameModeSelect = document.getElementById('game-mode');
const numQuestionsInput = document.getElementById('num-questions');
const difficultySelect = document.getElementById('difficulty');
const instructionsButton = document.getElementById('instructions-button'); // Moved to header
const addCustomWordButton = document.getElementById('add-custom-word-button'); // Moved to header

// Game Containers & Areas
const gameContainer = document.getElementById('game-container');
const quizContainer = document.getElementById('quiz-container');
const flashcardContainer = document.getElementById('flashcard-container');

// Quiz Mode Elements
const quizWordDisplay = document.getElementById('word-display');
const hintDisplay = document.getElementById('hint');
const userInput = document.getElementById('user-input');
const submitButton = document.getElementById('submit-button');
const feedbackMessage = document.getElementById('feedback-message');
const scoreDisplay = document.getElementById('score');
const livesDisplay = document.getElementById('lives');
const questionCounterDisplay = document.getElementById('question-counter');
const totalQuestionsDisplay = document.getElementById('total-questions');
const streakDisplay = document.getElementById('streak');
const timerDisplay = document.getElementById('timer');
const highScoreDisplay = document.getElementById('high-score');
const progressBar = document.getElementById('progress-bar');
const pronounceButtonQuiz = document.getElementById('pronounce-button-quiz');

// Flashcard Mode Elements
const flashcard = document.getElementById('flashcard');
const flashcardWordDisplay = document.getElementById('flashcard-word-display');
const translationDisplay = document.getElementById('translation-display');
const pronounceButtonFlashcardFront = document.getElementById('pronounce-button-flashcard-front');
const pronounceButtonFlashcardBack = document.getElementById('pronounce-button-flashcard-back');

// Control Buttons
const startButton = document.getElementById('start-button');
const inGameControls = document.getElementById('in-game-controls');
const quizControls = document.getElementById('quiz-controls');         // Container for quiz buttons
const flashcardControls = document.getElementById('flashcard-controls'); // Container for flashcard button(s)
const pauseButton = document.getElementById('pause-button');
const pauseIcon = pauseButton.querySelector('i'); // Get icon within pause button
const pauseText = pauseButton.querySelector('span'); // Get text within pause button
const hintButton = document.getElementById('hint-button');
const showAnswerButton = document.getElementById('show-answer-button');
const skipButton = document.getElementById('skip-button');
const nextButton = document.getElementById('next-button'); // Flashcard next
const backButton = document.getElementById('back-button'); // *** FLASHCARD BACK BUTTON ***
const restartButton = document.getElementById('restart-button');

// Modal Elements
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalBody = document.getElementById('modal-body');
const modalClose = modal.querySelector('.close-btn');

// --- Audio Effects ---
const correctSound = new Audio('https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg');
const incorrectSound = new Audio('https://actions.google.com/sounds/v1/cartoon/boing.ogg');

// --- Game Constants & State Variables ---
const GAME_CONSTANTS = {
  INITIAL_LIVES: 3,
  MIN_QUESTIONS: 1,
  MAX_QUESTIONS: 50,
  ANIMATION_DURATION: 500,
  FEEDBACK_DELAY: 1500,
  HINT_PENALTY: 1,
};

const difficultyMapping = {
  easy: 30,
  medium: 20,
  hard: 10
};

// Word Sets
const wordSets = {
  set1: [
    { spanish: 'Me llamo', english: 'My name is' },
    { spanish: '¿Cómo te llamas?', english: 'What is your name? (informal)' },
    { spanish: '¿Cómo se llama usted?', english: 'What is your name? (formal)' },
    { spanish: 'Mucho gusto', english: 'Nice to meet you' },
    { spanish: 'Igualmente', english: 'Likewise' },
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
    { spanish: 'el pez', english: 'fish' }
  ],
  set3: [
    { spanish: 'la familia', english: 'family' },
    { spanish: 'la madre / la mamá', english: 'mother / mom' },
    { spanish: 'el padre / el papá', english: 'father / dad' },
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
    { spanish: 'la media hermana', english: 'half-sister' },
    { spanish: 'el medio hermano', english: 'half-brother' },
    { spanish: 'la madrastra', english: 'step-mother' },
    { spanish: 'el padrastro', english: 'step-father' },
    { spanish: 'el hermanastro', english: 'step-brother' },
    { spanish: 'la hermanastra', english: 'step-sister' },
    { spanish: 'el bisabuelo', english: 'great-grandfather' },
    { spanish: 'la bisabuela', english: 'great-grandmother' },
    { spanish: 'los bisabuelos', english: 'great-grandparents' },
    { spanish: 'el tatarabuelo', english: 'great-great-grandfather' },
    { spanish: 'la tatarabuela', english: 'great-great-grandmother' },
    { spanish: 'los tatarabuelos', english: 'great-great-grandparents' },
    { spanish: 'la nuera / el yerno', english: 'daughter-in-law / son-in-law' },
    { spanish: 'la mascota', english: 'pet' },
    { spanish: 'el perro', english: 'dog' },
    { spanish: 'el gato', english: 'cat' },
    { spanish: 'el pez', english: 'fish' },
    { spanish: 'bueno/a/e', english: 'good' },
    { spanish: 'malo/a/e', english: 'bad' },
    { spanish: 'simpático/a/e', english: 'nice' },
    { spanish: 'antipático/a/e', english: 'not nice' },
    { spanish: 'amable', english: 'kind' },
    { spanish: 'joven / jóvenes', english: 'young' },
    { spanish: 'chistoso/a/e, cómico/a/e', english: 'funny' },
    { spanish: 'paciente', english: 'patient' },
    { spanish: 'impaciente', english: 'impatient' },
    { spanish: 'inteligente', english: 'smart' },
    { spanish: 'trabajador/a (e)', english: 'hard-working' },
    { spanish: 'aburrido/a (e)', english: 'boring' },
    { spanish: 'divertido/a (e)', english: 'fun' },
    { spanish: 'serio/a (e)', english: 'serious' },
    { spanish: 'ambicioso/a (e)', english: 'ambitious' },
    { spanish: 'perezoso/a (e)', english: 'lazy' },
    { spanish: 'comprensivo/a (e)', english: 'understanding' },
    { spanish: 'sencillo/a (e)', english: 'simple' },
    { spanish: 'callado/a (e)', english: 'quiet' },
    { spanish: 'alto/a (e)', english: 'tall' },
    { spanish: 'bajo/a (e)', english: 'short' },
    { spanish: 'bonito/a (e)', english: 'pretty' },
    { spanish: 'guapo/a (e)', english: 'good-looking' },
    { spanish: 'pequeño/a (e)', english: 'small' },
    { spanish: 'grande', english: 'big; large' },
    { spanish: 'rubio/a (e)', english: 'blonde' },
    { spanish: 'pelirrojo/a (e)', english: 'red-haired' },
    { spanish: 'moreno/a (e)', english: 'dark-haired' },
    { spanish: 'gordo/a (e)', english: 'fat' },
    { spanish: 'flaco/a (e)', english: 'skinny' },
    { spanish: 'el amigo / la amiga', english: 'friend' },
    { spanish: 'la gente', english: 'people' },
    { spanish: 'la persona', english: 'person' },
    { spanish: 'el novio / la novia', english: 'boyfriend / girlfriend' },
    { spanish: 'la pareja', english: 'partner' },
    { spanish: 'el compañero / la compañera', english: 'partner (or classmate)' },
    { spanish: 'el muchacho / la muchacha', english: 'boy / girl' },
    { spanish: 'el niño / la niña', english: 'child' }
  ],
  set4: [],
  set5: [],
  custom: []
};


let customWords = JSON.parse(localStorage.getItem('customWords')) || [];
wordSets.custom = customWords;

// Game State
let words = [];
let currentWord = null;
let availableWords = [];
let currentWordIndex = 0; // Represents the index of the word currently being displayed/attempted
let score = 0;
let lives = GAME_CONSTANTS.INITIAL_LIVES;
let questionsAsked = 0; // Visual counter for display
let numQuestions = parseInt(numQuestionsInput.value) || 10;
let currentStreak = 0;
let timerInterval = null;
let timerDuration = difficultyMapping[difficultySelect.value];
let timerRemaining = timerDuration;
let isFlashcardMode = false;
let isPaused = false;
let gameActive = false;
let mode = gameModeSelect.value;

// High Score
let highScore = parseInt(localStorage.getItem('highScore') || '0');
highScoreDisplay.textContent = highScore;


// --- Utility Functions ---

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function updateProgressBar() {
  const total = numQuestions > 0 ? numQuestions : 1;
  const progress = Math.min(numQuestions, currentWordIndex);
  const percentage = Math.min(100, (progress / total) * 100);
  progressBar.style.width = percentage + '%';
}


function animateElement(element, animationName) {
    if (element) {
        element.classList.add(animationName);
        element.addEventListener('animationend', () => {
            element.classList.remove(animationName);
        }, { once: true });
    }
}

function playSound(sound) {
    sound.currentTime = 0;
    sound.play().catch(error => console.error("Error playing sound:", error));
}

// --- UI Update Functions ---

function updateDisplay() {
  scoreDisplay.textContent = score;
  livesDisplay.textContent = lives;
  questionCounterDisplay.textContent = Math.min(currentWordIndex + 1, numQuestions);
  totalQuestionsDisplay.textContent = numQuestions;
  streakDisplay.textContent = currentStreak;
  timerDisplay.textContent = timerRemaining;
  highScoreDisplay.textContent = highScore;
  feedbackMessage.textContent = '\u00A0';
  feedbackMessage.className = 'feedback-message';
  hintDisplay.textContent = '';
  updateProgressBar();

  if (flashcard) flashcard.classList.remove('flipped');
  translationDisplay.textContent = '';
  document.body.classList.remove('game-over');
  gameContainer.classList.remove('game-over-effect', 'paused-effect');
}


function setInitialScreen() {
    quizWordDisplay.textContent = "Ready?";
    flashcardWordDisplay.textContent = "Ready?";
    timerDisplay.textContent = difficultyMapping[difficultySelect.value];

    inGameControls.classList.add('hidden');
    pronounceButtonQuiz.style.display = 'none';
    pronounceButtonFlashcardFront.style.display = 'none';
    pronounceButtonFlashcardBack.style.display = 'none';

    startButton.style.display = 'inline-flex';

    userInput.disabled = true;
    submitButton.disabled = true;

    progressBar.style.width = '0%';
    feedbackMessage.textContent = '\u00A0';
    feedbackMessage.className = 'feedback-message';

    toggleModeUI(isFlashcardMode);
}

// --- Timer Functions ---

function startTimer() {
  stopTimer();
  timerRemaining = timerDuration;
  timerDisplay.textContent = timerRemaining;
  timerInterval = setInterval(() => {
    if (!isPaused && gameActive) {
      timerRemaining--;
      timerDisplay.textContent = timerRemaining;
      if (timerRemaining < 0) {
        timeOut();
      }
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

function timeOut() {
    if (!gameActive) return;
    stopTimer();
    const correctAnswer = getCorrectAnswer();
    feedbackMessage.textContent = `Time's up! Correct: ${correctAnswer}`;
    feedbackMessage.className = 'feedback-message incorrect';
    playSound(incorrectSound);
    lives--;
    livesDisplay.textContent = lives;
    currentStreak = 0;
    streakDisplay.textContent = currentStreak;
    currentWordIndex++; // Increment index as the question was attempted

    userInput.disabled = true;
    submitButton.disabled = true;

    if (lives <= 0 || currentWordIndex >= numQuestions) {
       setTimeout(() => endGame(lives <= 0 ? "Ran out of lives!" : "Finished Questions!"), GAME_CONSTANTS.FEEDBACK_DELAY / 2);
    } else {
        setTimeout(() => {
           if (gameActive) displayCurrentWord(); // Use displayCurrentWord
        }, GAME_CONSTANTS.FEEDBACK_DELAY);
    }
    updateProgressBar();
}


// --- Game Logic Functions ---

function loadWordSet() {
    const setName = wordSetSelect.value;
    words = (setName === 'custom') ? wordSets.custom : (wordSets[setName] || []);
    addCustomWordButton.style.display = (setName === 'custom') ? 'inline-flex' : 'none';

    if (words.length === 0) {
        showModal("Empty Set", `<p>The selected word set "${wordSetSelect.options[wordSetSelect.selectedIndex].text}" is empty.</p><p>Please select another set or add words to the custom set.</p>`);
        setInitialScreen();
        startButton.disabled = true;
        return false;
    } else {
         startButton.disabled = false;
         return true;
    }
}

function startGame() {
  if (!loadWordSet()) return;

  score = 0;
  lives = GAME_CONSTANTS.INITIAL_LIVES;
  currentStreak = 0;
  isPaused = false;
  currentWordIndex = 0; // Start at the first word (index 0)
  numQuestions = Math.min(GAME_CONSTANTS.MAX_QUESTIONS, Math.max(GAME_CONSTANTS.MIN_QUESTIONS, parseInt(numQuestionsInput.value) || 10));
  timerDuration = difficultyMapping[difficultySelect.value];
  mode = gameModeSelect.value;

  availableWords = [...words];
  shuffleArray(availableWords);
  numQuestions = Math.min(numQuestions, availableWords.length);

  updateDisplay();

  // *** BUG FIX: Set gameActive = true *before* updating UI ***
  gameActive = true;

  startButton.style.display = 'none';
  inGameControls.classList.remove('hidden');
  userInput.disabled = false;
  submitButton.disabled = false;
  hintButton.disabled = false;

  toggleModeUI(isFlashcardMode); // Now uses correct gameActive state

  if (isFlashcardMode) {
      updateFlashcardButtonStates(); // Set initial button states
  } else {
      userInput.focus(); // Only focus input in quiz mode
  }

  displayCurrentWord(); // Display the first word/card (at index 0)
}


// Displays the word at the current `currentWordIndex`
function displayCurrentWord() {
    if (!gameActive || currentWordIndex < 0 || currentWordIndex >= availableWords.length) {
        console.error("Attempted to display word at invalid index or inactive game.");
        if (gameActive) endGame("Error displaying word.");
        return;
    }

    currentWord = availableWords[currentWordIndex];
    stopTimer(); // Stop timer before setting up word

    feedbackMessage.textContent = '\u00A0';
    feedbackMessage.className = 'feedback-message';
    hintDisplay.textContent = '';
    hintButton.disabled = false;

    questionCounterDisplay.textContent = Math.min(currentWordIndex + 1, numQuestions); // Update visual counter

    if (isFlashcardMode) {
        flashcardWordDisplay.textContent = getQuestionWord();
        translationDisplay.textContent = '';
        if (flashcard) flashcard.classList.remove('flipped');
        pronounceButtonFlashcardFront.style.display = 'inline-flex';
        pronounceButtonFlashcardBack.style.display = 'inline-flex';
        animateElement(flashcard, 'bounce');
    } else { // Quiz Mode
        quizWordDisplay.textContent = getQuestionWord();
        userInput.value = '';
        userInput.disabled = false;
        submitButton.disabled = false;
        pronounceButtonQuiz.style.display = 'inline-flex';
        animateElement(quizWordDisplay, 'bounce');
        startTimer(); // Start timer specifically for quiz mode question
        userInput.focus();
    }
    updateProgressBar();
}



function getQuestionWord() {
  if (!currentWord) return "?";
  if (mode === 'mix') {
    return (currentWordIndex % 2 === 0) ? currentWord.spanish : currentWord.english;
  }
  return (mode === 'es') ? currentWord.english : currentWord.spanish;
}

function getCorrectAnswer() {
  if (!currentWord) return "";
   if (mode === 'mix') {
        return (currentWordIndex % 2 === 0) ? currentWord.english : currentWord.spanish;
   }
  return (mode === 'es') ? currentWord.spanish : currentWord.english;
}

function checkAnswer() {
  if (!gameActive || isPaused || isFlashcardMode || !currentWord) return;

  stopTimer();
  const userAnswer = userInput.value.trim();
  const correctAnswer = getCorrectAnswer();
  const isCorrect = userAnswer.toLowerCase() === correctAnswer.toLowerCase();

  userInput.disabled = true;
  submitButton.disabled = true;
  hintButton.disabled = true;

  if (isCorrect) {
    feedbackMessage.textContent = "Correct!";
    feedbackMessage.className = 'feedback-message correct';
    playSound(correctSound);
    score++;
    currentStreak++;
    scoreDisplay.textContent = score;
    streakDisplay.textContent = currentStreak;
    animateElement(userInput, 'input-correct');
  } else {
    feedbackMessage.textContent = `Incorrect. Correct: ${correctAnswer}`;
    feedbackMessage.className = 'feedback-message incorrect';
    playSound(incorrectSound);
    lives--;
    livesDisplay.textContent = lives;
    currentStreak = 0;
    streakDisplay.textContent = currentStreak;
     animateElement(userInput, 'input-incorrect');
  }

   currentWordIndex++; // Increment index AFTER checking answer

  setTimeout(() => {
      if (!gameActive) return;
      if (lives <= 0 || currentWordIndex >= numQuestions) {
           endGame(lives <= 0 ? "Ran out of lives!" : "Finished Questions!");
      } else {
          displayCurrentWord(); // Proceed to display the next word
      }
  }, GAME_CONSTANTS.FEEDBACK_DELAY);

  updateProgressBar();
}


function skipQuestion() {
    if (!gameActive || isPaused || isFlashcardMode || !currentWord) return;
    stopTimer();
    const correctAnswer = getCorrectAnswer();
    feedbackMessage.textContent = `Skipped! Correct: ${correctAnswer}`;
    feedbackMessage.className = 'feedback-message skipped';

    currentStreak = 0;
    streakDisplay.textContent = currentStreak;
    userInput.value = '';
    userInput.disabled = true;
    submitButton.disabled = true;
    hintButton.disabled = true;
    currentWordIndex++; // Increment index as question was skipped

    setTimeout(() => {
         if (!gameActive) return;
         if (currentWordIndex >= numQuestions) {
              endGame("Finished Questions!");
         } else {
             displayCurrentWord(); // Proceed to display the next word
         }
     }, GAME_CONSTANTS.FEEDBACK_DELAY / 2);

    updateProgressBar();
}


function showHint() {
    if (!gameActive || isPaused || isFlashcardMode || !currentWord) return;
    const answer = getCorrectAnswer();
    hintDisplay.textContent = `Hint: Starts with "${answer.charAt(0)}", ${answer.length} letters`;
    if (score > 0 && GAME_CONSTANTS.HINT_PENALTY > 0) {
        score = Math.max(0, score - GAME_CONSTANTS.HINT_PENALTY);
        scoreDisplay.textContent = score;
    }
    hintButton.disabled = true;
}

function showAnswer() {
  if (!gameActive || isPaused || isFlashcardMode || !currentWord) return;
  stopTimer();
  const correctAnswer = getCorrectAnswer();
  feedbackMessage.textContent = `Answer: ${correctAnswer}`;
  feedbackMessage.className = 'feedback-message answer-shown';

  lives--;
  livesDisplay.textContent = lives;
  currentStreak = 0;
  streakDisplay.textContent = currentStreak;
  currentWordIndex++; // Increment index as question is revealed

  userInput.disabled = true;
  submitButton.disabled = true;
  hintButton.disabled = true;

   setTimeout(() => {
       if (!gameActive) return;
        if (lives <= 0 || currentWordIndex >= numQuestions) {
             endGame(lives <= 0 ? "Ran out of lives!" : "Finished Questions!");
        } else {
            displayCurrentWord(); // Proceed to display the next word
        }
    }, GAME_CONSTANTS.FEEDBACK_DELAY);

    updateProgressBar();
}

// --- Flashcard Specific Functions ---

function updateFlashcardButtonStates() {
    if (!gameActive || !isFlashcardMode) return;
    // Check bounds using the current index (word being shown)
    backButton.disabled = (currentWordIndex <= 0);
    nextButton.disabled = (currentWordIndex >= availableWords.length - 1);
}

function handleFlashcardNext() {
    if (!gameActive || currentWordIndex >= availableWords.length - 1) return;
    currentWordIndex++;
    displayCurrentWord(); // Display the new current word
    updateFlashcardButtonStates(); // Update buttons based on the new index
}

function handleFlashcardBack() {
    if (!gameActive || currentWordIndex <= 0) return;
    currentWordIndex--;
    displayCurrentWord(); // Display the new current word
    updateFlashcardButtonStates(); // Update buttons based on the new index
}


function flipCard() {
  if (!isFlashcardMode || !flashcard || !gameActive) return;
  flashcard.classList.toggle('flipped');
    if (flashcard.classList.contains('flipped')) {
        translationDisplay.textContent = getCorrectAnswer();
    } else {
        translationDisplay.textContent = '';
    }
}

// --- General Game Flow ---

function endGame(reason = "Game Over!") {
  if (!gameActive) return;
  gameActive = false;
  isPaused = false;
  stopTimer();
  updateHighScore();

  quizWordDisplay.textContent = reason;
  flashcardWordDisplay.textContent = reason;
  feedbackMessage.textContent = `Final Score: ${score}`;
  feedbackMessage.className = 'feedback-message game-over';
  startButton.style.display = 'inline-flex';
  inGameControls.classList.add('hidden');
  userInput.disabled = true;
  submitButton.disabled = true;
  pronounceButtonQuiz.style.display = 'none';
  pronounceButtonFlashcardFront.style.display = 'none';
  pronounceButtonFlashcardBack.style.display = 'none';
  document.body.classList.add('game-over');
  gameContainer.classList.add('game-over-effect');

  setTimeout(() => showGameOverModal(reason), 500);
}

function resetGame() {
  gameActive = false;
  isPaused = false;
  stopTimer();
  score = 0;
  lives = GAME_CONSTANTS.INITIAL_LIVES;
  questionsAsked = 0;
  currentStreak = 0;
  currentWord = null;
  availableWords = [];
  currentWordIndex = 0;
  timerRemaining = difficultyMapping[difficultySelect.value];

  updateDisplay();
  setInitialScreen();
  loadWordSet();
}

function updateHighScore() {
  if (score > highScore) {
    highScore = score;
    localStorage.setItem('highScore', highScore.toString());
    highScoreDisplay.textContent = highScore;
     animateElement(highScoreDisplay.parentElement, 'bounce');
  }
}

// --- Mode & Theme Toggles ---

function toggleModeUI(flashcardMode) {
     isFlashcardMode = flashcardMode;

     quizContainer.classList.toggle('hidden', isFlashcardMode);
     flashcardContainer.classList.toggle('hidden', !isFlashcardMode);

     if (isFlashcardMode) {
        toggleIcon.className = 'fas fa-question-circle';
        toggleFlashcardModeButton.setAttribute('aria-label', 'Switch to Quiz Mode');
        toggleFlashcardModeButton.title = 'Switch to Quiz Mode';
     } else {
        toggleIcon.className = 'fas fa-layer-group';
        toggleFlashcardModeButton.setAttribute('aria-label', 'Switch to Flashcard Mode');
        toggleFlashcardModeButton.title = 'Switch to Flashcard Mode';
     }

     const showQuizControls = gameActive && !isFlashcardMode;
     const showFlashcardControls = gameActive && isFlashcardMode;

     quizControls.classList.toggle('hidden', !showQuizControls);
     flashcardControls.classList.toggle('hidden', !showFlashcardControls);

     // Pronounce buttons visibility handled by displayCurrentWord and endGame now
     // Only show them if game is active AND it's the correct mode
     pronounceButtonQuiz.style.display = showQuizControls ? 'inline-flex' : 'none';
     pronounceButtonFlashcardFront.style.display = showFlashcardControls ? 'inline-flex' : 'none';
     pronounceButtonFlashcardBack.style.display = showFlashcardControls ? 'inline-flex' : 'none';

}


function toggleFlashcardMode() {
    const wasGameActive = gameActive;
    toggleModeUI(!isFlashcardMode);

    if (wasGameActive) {
        resetGame();
    } else {
        setInitialScreen();
        loadWordSet();
    }
}


function togglePause() {
  if (!gameActive || isFlashcardMode) return;
  isPaused = !isPaused;
  if (isPaused) {
    pauseIcon.className = 'fas fa-play';
    pauseText.textContent = 'Resume';
    pauseButton.setAttribute('aria-label', 'Resume Game');
    pauseButton.title = 'Resume Game';
    userInput.disabled = true;
    submitButton.disabled = true;
    gameContainer.classList.add('paused-effect');
    stopTimer();
  } else {
    pauseIcon.className = 'fas fa-pause';
    pauseText.textContent = 'Pause';
    pauseButton.setAttribute('aria-label', 'Pause Game');
    pauseButton.title = 'Pause Game';
    userInput.disabled = false;
    submitButton.disabled = false;
    gameContainer.classList.remove('paused-effect');
    startTimer();
    userInput.focus();
  }
}

function toggleDarkMode() {
  const isDark = document.body.classList.toggle('dark-mode');
  document.body.classList.toggle('light-mode', !isDark);

  if (sunIcon && moonIcon) {
    sunIcon.style.display = isDark ? 'inline-block' : 'none';
    moonIcon.style.display = isDark ? 'none' : 'inline-block';
  }

  toggleDarkModeButton.setAttribute('aria-label', isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode');
   toggleDarkModeButton.title = isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode';

  localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
}

function applyInitialDarkMode() {
    const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedMode = localStorage.getItem('darkMode');
    if ((savedMode === 'enabled') || (savedMode === null && prefersDarkMode)) {
        if (!document.body.classList.contains('dark-mode')) {
             toggleDarkMode();
        }
    } else {
         document.body.classList.add('light-mode');
         document.body.classList.remove('dark-mode');
         if (sunIcon && moonIcon) {
             sunIcon.style.display = 'none';
             moonIcon.style.display = 'inline-block';
         }
         toggleDarkModeButton.setAttribute('aria-label', 'Switch to Dark Mode');
         toggleDarkModeButton.title = 'Switch to Dark Mode';
    }
}


// --- Speech Synthesis ---

function pronounceWord(wordToSpeak = null, lang = null) {
    let textToSpeak = '';
    let languageCode = '';

    // Prioritize explicitly provided word and language
    if (wordToSpeak) {
        textToSpeak = wordToSpeak;
        languageCode = lang;
    }
    // If no explicit word, determine from game state
    else if (currentWord) {
        const questionWord = getQuestionWord(); // Word displayed as the question
        const answerWord = getCorrectAnswer(); // Word expected as the answer
        const questionIsSpanish = (mode === 'se') || (mode === 'mix' && questionWord === currentWord?.spanish);

        if (isFlashcardMode) {
            const cardFlipped = flashcard && flashcard.classList.contains('flipped');
            textToSpeak = cardFlipped ? answerWord : questionWord;
            languageCode = cardFlipped ? (questionIsSpanish ? 'en-US' : 'es-ES') : (questionIsSpanish ? 'es-ES' : 'en-US');
        } else { // Quiz mode
            textToSpeak = questionWord;
             languageCode = questionIsSpanish ? 'es-ES' : 'en-US';
        }
    }

    if (!languageCode && textToSpeak) {
         // Basic guess if language wasn't determined (e.g., word passed directly without lang)
         // This is rudimentary; a better approach would be language detection if needed.
         languageCode = (textToSpeak.match(/[áéíóúñ¿¡]/)) ? 'es-ES' : 'en-US';
         console.warn("Pronounce language code inferred:", languageCode);
    }

    if (!textToSpeak || typeof speechSynthesis === 'undefined') {
        console.warn("Speech synthesis not available or no text to speak.");
        return;
    }

    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = languageCode;
    utterance.rate = 0.9;

    utterance.onerror = (event) => {
        console.error('SpeechSynthesisUtterance error:', event.error);
         showModal("Pronunciation Error", `<p>Sorry, could not pronounce the word. Error: ${event.error}</p>`);
    };

    speechSynthesis.speak(utterance);
}


// --- Modal Functions ---

function showModal(title, contentHtml) {
    modalTitle.textContent = title;
    modalBody.innerHTML = contentHtml;
    modal.classList.remove('hidden');
     const firstFocusable = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (firstFocusable) {
        setTimeout(() => firstFocusable.focus(), 50);
    } else {
         setTimeout(() => modalClose.focus(), 50);
    }
}


function hideModal() {
    modal.classList.add('hidden');
}

function showGameOverModal(reason) {
  showModal("Game Over!", `
    <p>${reason}</p>
    <p>Your final score: <strong>${score} / ${numQuestions}</strong></p>
    <p>High Score: ${highScore}</p>
    <button id="modal-restart" class="btn btn-primary">Play Again</button>
  `);
  const modalRestartButton = document.getElementById('modal-restart');
  if (modalRestartButton) {
       modalRestartButton.addEventListener('click', () => {
            hideModal();
            resetGame();
       }, { once: true });
  }
}


function showInstructions() {
  showModal("Instructions", `
    <p>Welcome to Spanish Vocab Pro!</p>
    <ul>
      <li>Select a <strong>Word Set</strong> and other settings from the sidebar.</li>
      <li>Choose <strong>Quiz Mode</strong> (<i class="fas fa-layer-group"></i>) or <strong>Flashcard Mode</strong> (<i class="fas fa-question-circle"></i>) using the header button.</li>
      <li><strong>Quiz Mode:</strong> Type the translation and press Enter or click Check before the timer runs out. Use Hint, Show Answer, or Skip if needed.</li>
      <li><strong>Flashcard Mode:</strong> Click the card to flip it. Use the <strong>Back</strong> and <strong>Next</strong> buttons to navigate between cards.</li>
      <li>Use the <i class="fas fa-volume-up"></i> button to hear the word pronounced.</li>
      <li>You can pause/resume the game in Quiz Mode.</li>
      <li>Select the "Custom Words" set and use the <i class="fas fa-plus-circle"></i> button in the header to add your own vocabulary.</li>
       <li>Toggle <i class="fas fa-moon"></i> / <i class="fas fa-sun"></i> for Dark/Light mode.</li>
    </ul>
    <button id="modal-close-btn" class="btn btn-secondary">Got it!</button>
  `);
   const modalCloseBtn = document.getElementById('modal-close-btn');
   if (modalCloseBtn) {
       modalCloseBtn.addEventListener('click', hideModal, { once: true });
   }
}

function showAddCustomWordModal() {
    showModal("Add Custom Word", `
        <form id="custom-word-form" novalidate>
          <div class="form-group">
             <label for="custom-spanish">Spanish:</label>
             <input type="text" id="custom-spanish" required>
             <p class="error-message" id="error-spanish" aria-live="polite"></p>
          </div>
          <div class="form-group">
            <label for="custom-english">English:</label>
            <input type="text" id="custom-english" required>
             <p class="error-message" id="error-english" aria-live="polite"></p>
           </div>
          <button type="submit" class="btn btn-primary">Add Word</button>
        </form>
    `);

    const customWordForm = document.getElementById('custom-word-form');
    if (customWordForm) {
        customWordForm.addEventListener('submit', handleAddCustomWord);
    }
}


function handleAddCustomWord(event) {
    event.preventDefault();

    const spanishInput = document.getElementById('custom-spanish');
    const englishInput = document.getElementById('custom-english');
    const spanishError = document.getElementById('error-spanish');
    const englishError = document.getElementById('error-english');
    const spanish = spanishInput.value.trim();
    const english = englishInput.value.trim();
    let isValid = true;

    spanishError.textContent = '';
    englishError.textContent = '';
    if (!spanish) {
        spanishError.textContent = 'Spanish word cannot be empty.';
        isValid = false;
    }
    if (!english) {
        englishError.textContent = 'English translation cannot be empty.';
        isValid = false;
    }
    if (!isValid) return;

    const exists = customWords.some(word => word.spanish.toLowerCase() === spanish.toLowerCase() || word.english.toLowerCase() === english.toLowerCase());

    if (exists) {
         englishError.textContent = 'This word or translation might already exist.';
    } else {
        customWords.push({ spanish, english });
        localStorage.setItem('customWords', JSON.stringify(customWords));
        wordSets.custom = customWords;
        hideModal();
        if (wordSetSelect.value === 'custom') {
            loadWordSet();
        }
    }
}


// --- Event Listeners ---

pronounceButtonQuiz.addEventListener('click', () => pronounceWord());
pronounceButtonFlashcardFront.addEventListener('click', () => pronounceWord());
pronounceButtonFlashcardBack.addEventListener('click', () => {
    const questionWord = getQuestionWord();
    const questionIsSpanish = (mode === 'se') || (mode === 'mix' && questionWord === currentWord?.spanish);
    const answerLang = questionIsSpanish ? 'en-US' : 'es-ES';
    pronounceWord(getCorrectAnswer(), answerLang);
});


userInput.addEventListener('keyup', (event) => {
  if (event.key === 'Enter' && gameActive && !isPaused && !isFlashcardMode) {
    event.preventDefault();
    checkAnswer();
  }
});

wordSetSelect.addEventListener('change', () => {
    if (!gameActive) {
        loadWordSet();
        setInitialScreen();
    } else {
        const activeSetKey = Object.keys(wordSets).find(key => key !== 'custom' && wordSets[key] === availableWords);
        wordSetSelect.value = activeSetKey || 'custom';
        showModal("Game Active", "<p>Cannot change word set while a game is in progress. Please restart the game first.</p>");
    }
});

difficultySelect.addEventListener('change', () => {
    timerDuration = difficultyMapping[difficultySelect.value];
    if (!gameActive) {
         timerRemaining = timerDuration;
         timerDisplay.textContent = timerRemaining;
    }
});
numQuestionsInput.addEventListener('input', () => {
     let value = parseInt(numQuestionsInput.value);
     let correctedValue = value;

     if (isNaN(value) || value < GAME_CONSTANTS.MIN_QUESTIONS) {
         correctedValue = GAME_CONSTANTS.MIN_QUESTIONS;
     } else if (value > GAME_CONSTANTS.MAX_QUESTIONS) {
         correctedValue = GAME_CONSTANTS.MAX_QUESTIONS;
     }

     if (correctedValue !== value) {
        numQuestionsInput.value = correctedValue;
     }

     if (!gameActive) {
         numQuestions = correctedValue;
         totalQuestionsDisplay.textContent = numQuestions;
     }
});


startButton.addEventListener('click', startGame);
submitButton.addEventListener('click', checkAnswer);
hintButton.addEventListener('click', showHint);
restartButton.addEventListener('click', () => {
    if (gameActive) {
        resetGame();
    }
});
skipButton.addEventListener('click', skipQuestion);
showAnswerButton.addEventListener('click', showAnswer);
pauseButton.addEventListener('click', togglePause);

// Flashcard specific
flashcardContainer.addEventListener('click', (event) => {
    if (event.target.closest('.btn-pronounce-minimal')) {
        return;
    }
    flipCard();
});
nextButton.addEventListener('click', handleFlashcardNext); // Use new handler
backButton.addEventListener('click', handleFlashcardBack); // Use new handler


// Header buttons
toggleFlashcardModeButton.addEventListener('click', toggleFlashcardMode);
toggleDarkModeButton.addEventListener('click', toggleDarkMode);
instructionsButton.addEventListener('click', showInstructions);
addCustomWordButton.addEventListener('click', showAddCustomWordModal);

// Modal close listeners
modalClose.addEventListener('click', hideModal);
modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    hideModal();
  }
});
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !modal.classList.contains('hidden')) {
        hideModal();
    }
});

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    applyInitialDarkMode();
    setInitialScreen();
    loadWordSet();
});
