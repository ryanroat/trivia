/* eslint-disable linebreak-style */
const url = 'https://opentdb.com/api.php?amount=1';

const question = document.querySelector('.question');
const answerBtn = document.querySelector('.answerBtn');
const answer = document.querySelector('.answer');

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
    console.log(data);
    answer.innerHTML = data.results[0].correct_answer;
  });
}

const trivia = getTrivia();
// const trivia = async () => await getTrivia();
trivia.then((data) => {
  // console.log(data);
  question.innerHTML = data.results[0].question;
});

answerBtn.addEventListener('click', () => showAnswer(trivia));
