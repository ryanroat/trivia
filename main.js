/* eslint-disable linebreak-style */
const url = 'https://opentdb.com/api.php?amount=1';

const question = document.querySelector('.question');
const answerBtn = document.querySelector('.answerBtn');
const answer = document.querySelector('.answer');
const nextBtn = document.querySelector('.nextBtn');

// fetch(url)
//     .then(response => response.json())
//     .then(data => console.log(data));

async function getTrivia() {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

function showAnswer(trivia) {
  trivia.then((data) => {
    answer.innerHTML = data.results[0].correct_answer;
  });
}

function showQuestion(trivia) {
  trivia.then((data) => {
    question.innerHTML = data.results[0].question;
  });
}

let trivia = getTrivia();
showQuestion(trivia);

nextBtn.addEventListener('click', () => {
  answer.innerHTML = '';
  trivia = getTrivia();
  showQuestion(trivia);
});

answerBtn.addEventListener('click', () => showAnswer(trivia));
