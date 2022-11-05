const openModalButton = document.querySelector('#btnOpenModal');
const modal = document.querySelector('#modalBlock');
const closeModal = document.querySelector('#closeModal');
const questionTitle = document.querySelector('#question');
const formAnswers = document.querySelector('#formAnswers');
const nextButton = document.querySelector('#next');
const prevButton = document.querySelector('#prev');
const sendButton = document.querySelector('#send');

let questions = [];
let page = 0;
let finalAnswers = [];
let numberQuestion = null;

closeModal.addEventListener('click', onCloseModalClick);
openModalButton.addEventListener('click', onOpenModalBtnClick);
nextButton.addEventListener('click', onNextBtnClick);
prevButton.addEventListener('click', onPrevBtnClick);
sendButton.addEventListener('click', onSendBtnClick);

const firebaseConfig = {
  apiKey: 'AIzaSyBmE-HdhO4aAbEcIEcMyGW2xmWXHSHJEyw',
  authDomain: 'testburger-2b71b.firebaseapp.com',
  databaseURL: 'https://testburger-2b71b-default-rtdb.firebaseio.com',
  projectId: 'testburger-2b71b',
  storageBucket: 'testburger-2b71b.appspot.com',
  messagingSenderId: '903351671149',
  appId: '1:903351671149:web:c721481aeb557bc331a264',
  measurementId: 'G-9KF1VB1C07',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase
  .database()
  .ref()
  .child('questions')
  .once('value')
  .then(snap => {
    questions = snap.val();
  });

function onOpenModalBtnClick() {
  modal.classList.add('d-block');
  playTest();
}

function onCloseModalClick() {
  modal.classList.remove('d-block');
}

function playTest() {
  formAnswers.innerHTML = '';
  sendButton.classList.add('d-none');

  if (page === 0) {
    prevButton.classList.add('d-none');
  }
  if (page > 0) {
    prevButton.classList.remove('d-none');
  }
  if (page === questions.length) {
    nextButton.classList.add('d-none');
    prevButton.classList.add('d-none');
    sendButton.classList.remove('d-none');
    formAnswers.innerHTML = `
      <div class="form-group">
      <label for="numberPhone">Enter your number</label>
      <input type="phone" name="form-control" id="numberPhone" />
      </div>
      `;
    questionTitle.textContent = '';
    page = 0;
    return;
  }
  if (page < questions.length) {
    nextButton.classList.remove('d-none');
  }

  const renderAnswers = (answersArr, type) => {
    answersArr.forEach(answer => {
      const answerItem = document.createElement('div');
      answerItem.classList.add('answers-item', 'd-flex', 'justify-content-center');

      answerItem.innerHTML = `
      <input type="${type}" id="${answer.title}" name="answer" class="d-none" value="${answer.title}" />
         <label for="${answer.title}" class="d-flex flex-column justify-content-between">
             <img class="answerImg" src="${answer.url}" alt="burger" />
             <span>${answer.title}</span>
         </label>
      `;

      formAnswers.appendChild(answerItem);
    });
  };

  const renderQuestions = index => {
    numberQuestion = index;
    questionTitle.textContent = `${questions[index].question}`;

    renderAnswers(questions[index].answers, questions[index].type);
  };

  renderQuestions(page);
}

function checkAnswer() {
  const obj = {};

  const inputs = [...formAnswers.elements].filter(
    element => element.checked || element.id === 'numberPhone'
  );
  inputs.forEach((input, index) => {
    if (input.id === 'numberPhone') {
      obj['Номер телефона'] = input.value;
    } else {
      obj[`${index}_${questions[numberQuestion].question}`] = input.value;
    }
  });
  finalAnswers.push(obj);
}

function onNextBtnClick() {
  checkAnswer();
  page += 1;
  playTest();
}

function onPrevBtnClick() {
  page -= 1;
  playTest();
}

function onSendBtnClick() {
  checkAnswer();
  formAnswers.textContent = 'Спасибо за пройденный тест';
  sendButton.classList.add('d-none');
  setTimeout(() => {
    modal.classList.remove('d-block');
  }, 2000);

  firebase.database().ref().child('contacts').push(finalAnswers);
  console.log(finalAnswers);
  finalAnswers = [];
}
