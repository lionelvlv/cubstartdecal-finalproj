// Output GPT responses here
const responseboxElem = document.getElementById('response-box');

const inputElem = document.getElementById('input');

function appendResponse(response) {
    responseboxElem.innerHTML += response + '<br>';
}

appendResponse('Hello, World!');
appendResponse('line 2');
appendResponse('line 3!!!!!1');