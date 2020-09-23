/* eslint-disable linebreak-style */
const url = 'https://opentdb.com/api.php?amount=1&category=22';

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
  const option = document.querySelector('.option');
  trivia.then((data) => {
    const query = data.results[0]; // trivia object
    console.log(query);
    const queryType = query.type; // trivia type - true/false or multiple choice
    question.innerHTML = query.question; // display trivia question in DOM
    if (queryType == 'multiple') { // handle multiple choice
      let answArr = []; // new array for all possible answers
      answArr = answArr.concat(query.correct_answer); // add correct answer to array
      query.incorrect_answers.forEach((answer) => { // add all incorrect answers to array
        answArr = answArr.concat(answer);
      });
      console.log(answArr);
      // insert DOM elements for choices

      answArr.forEach((answer) => {
        // create new li & br elements
        const li = document.createElement('li');
        const br = document.createElement('br');
        li.innerHTML = answer;
        option.appendChild(li);
        option.appendChild(br);
      });
    }
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
