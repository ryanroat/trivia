const url = 'https://opentdb.com/api.php?amount=2';

// fetch(url)
//     .then(response => response.json())
//     .then(data => console.log(data));

async function getTrivia() {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

const trivia = getTrivia();
// const trivia = async () => await getTrivia();
trivia.then(data => console.log(data));
