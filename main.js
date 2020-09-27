/* eslint-disable linebreak-style */
/* eslint-disable no-plusplus */
const requestSessionToken = 'https://opentdb.com/api_token.php?command=request';
const catUrl = 'https://opentdb.com/api_category.php';
const url = 'https://opentdb.com/api.php?amount=1';
// const url = 'https://opentdb.com/api.php?amount=1&category=22'; // geography

const categories = document.querySelector('.categories');
const question = document.querySelector('.question');
const answerBtn = document.querySelector('.answerBtn');
const answer = document.querySelector('.answer');
const nextBtn = document.querySelector('.nextBtn');
let apiRequest;

async function createRequestURL() {
  // TODO: move local storage I/O to separate function
  let token;
  const storedToken = window.localStorage.getItem('trivia_token');
  if (!storedToken) {
    const response = await fetch(requestSessionToken);
    const tokenObj = await response.json();
    token = tokenObj.token;
    window.localStorage.setItem('trivia_token', token);
  } else {
    token = storedToken;
  }
  const requestURL = `${url}&token=${token}`;
  // return apiURL;
}

// fetch(url)
//     .then(response => response.json())
//     .then(data => console.log(data));

async function getCategories() {
  let catArr = [];
  const response = await fetch(catUrl);
  const data = await response.json();
  catArr = data.trivia_categories;
  return catArr;
}

function chooseCategory() {
  // categories.innerHTML = 'display categories here';
  const catHTML = '';
  const catObj = getCategories();
  catObj.then((categoriesArray) => {
    categoriesArray.forEach((catItem) => {
      const btn = document.createElement('button');
      btn.setAttribute('name', catItem.name);
      btn.setAttribute('value', catItem.id);
      btn.innerHTML = `${catItem.name}`;
      categories.appendChild(btn);
    });
  });
}

async function getTrivia() {
  const response = await fetch(url);
  const data = await response.json();
  if (data.response_code === 3) {
    // request new session token here
    window.localStorage.removeItem('trivia_token');
    apiRequest = createRequestURL();
    return getTrivia();
  }
  if (data.response_code === 0) {
    return data;
  }
}

function showAnswer(trivia) {
  trivia.then((data) => {
    answer.innerHTML = data.results[0].correct_answer;
  });
}

function showQuestion(trivia) {
  const option = document.querySelector('.option');
  option.innerHTML = '';
  trivia.then((data) => {
    const query = data.results[0]; // trivia object
    const queryType = query.type; // trivia type - true/false or multiple choice
    if (queryType === 'multiple') { // handle multiple choice
      question.innerHTML = query.question; // display trivia question in DOM
      let answArr = []; // new array for all possible answers
      answArr = answArr.concat(query.correct_answer); // add correct answer to array
      query.incorrect_answers.forEach((incAnswer) => { // add all incorrect answers to array
        answArr = answArr.concat(incAnswer);
      });

      // randomize array with Fisher Yates/Knuth shuffle

      for (let i = answArr.length - 1; i > 0; i--) {
        const randIndex = Math.floor(Math.random() * i);
        const swapItem = answArr[i];
        answArr[i] = answArr[randIndex];
        answArr[randIndex] = swapItem;
      }

      // insert DOM elements for choices

      answArr.forEach((choice) => {
        // create new li & br elements
        const li = document.createElement('li');
        const br = document.createElement('br');
        li.innerHTML = ` - ${choice}`;
        option.appendChild(li);
        option.appendChild(br);
      });
    } else if (queryType === 'boolean') {
      question.innerHTML = `True or False: ${query.question}`; // display trivia question in DOM

      let answArr = []; // new array for all possible answers
      answArr = answArr.concat(query.correct_answer); // add correct answer to array
    }
  });
}

chooseCategory();
apiRequest = createRequestURL();
let trivia = getTrivia();
showQuestion(trivia);

nextBtn.addEventListener('click', () => {
  question.innerHTML = '';
  answer.innerHTML = '';
  trivia = getTrivia();
  showQuestion(trivia);
});

answerBtn.addEventListener('click', () => showAnswer(trivia));
