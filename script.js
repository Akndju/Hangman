const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');

// fetch('https://random-word-api.herokuapp.com/word?number=25')
//   .then((res) => res.json())
//   .then((data) => words.concat(data));

let words = [
  'antelope',
  'kitten',
  'mouse',
  'elephant',
  'monkey',
  'goat',
  'python',
  'zebra',
  'lizard',
  'rhinoceros',
  'cat',
  'dog',
  'cockroach',
  'tiger',
  'lion',
  'dragonfly',
  'grasshopper',
  'wolf',
  'scorpion',
  'hyena',
  'jaguar',
  'panther',
  'giraffe',
  'porcupine',
  'sardine',
  'tilapia',
  'goldfish',
  'cheetah',
  'eel',
];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

function updateWrongLetters() {
  wrongLettersEl.innerHTML = `${wrongLetters.length > 0 ? '<p>Wrong<p>' : ''}
    ${wrongLetters.map((letter) => `<span>${letter}</span>`)}`;

  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;

    if (index < errors) {
      part.style.display = 'block';
    } else {
      part.style.display = 'none';
    }
  });

  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = 'Hangy is dead 😢';
    popup.style.display = 'flex';
  }
}

function showNotificaton() {
  notification.classList.add('show');

  setTimeout(() => {
    notification.classList.remove('show');
  }, 2000);
}

function displayWord() {
  wordEl.innerHTML = `${selectedWord
    .split('')
    .map(
      (letter) =>
        `<span class = "letter">${
          correctLetters.includes(letter) ? letter : ''
        }</span>`
    )
    .join('')}`;

  const innerWord = wordEl.innerText.replace(/\n/g, '');

  if (innerWord === selectedWord) {
    finalMessage.innerText = 'Congratulations! You won! 😃';
    popup.style.display = 'flex';
  }
}

window.addEventListener('keydown', (e) => {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key.toLocaleLowerCase();

    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);

        displayWord();
      } else {
        showNotificaton();
      }
    } else if (!wrongLetters.includes(letter)) {
      wrongLetters.push(letter);

      updateWrongLetters();
    } else {
      showNotificaton();
    }
  }
});

playAgainBtn.addEventListener('click', () => {
  correctLetters.splice(0);
  wrongLetters.splice(0);

  selectedWord = words[Math.floor(Math.random() * words.length)];

  displayWord();

  popup.style.display = 'none';

  updateWrongLetters();
});

displayWord();
