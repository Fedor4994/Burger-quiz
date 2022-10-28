const questions = [
  {
    question: 'Какого цвета бургер?',
    answers: [
      {
        title: 'Стандарт',
        url: './image/burger.png',
      },
      {
        title: 'Черный',
        url: './image/burgerBlack.png',
      },
    ],
    type: 'radio',
  },
  {
    question: 'Из какого мяса котлета?',
    answers: [
      {
        title: 'Курица',
        url: './image/chickenMeat.png',
      },
      {
        title: 'Говядина',
        url: './image/beefMeat.png',
      },
      {
        title: 'Свинина',
        url: './image/porkMeat.png',
      },
    ],
    type: 'radio',
  },
  {
    question: 'Дополнительные ингредиенты?',
    answers: [
      {
        title: 'Помидор',
        url: './image/tomato.png',
      },
      {
        title: 'Огурец',
        url: './image/cucumber.png',
      },
      {
        title: 'Салат',
        url: './image/salad.png',
      },
      {
        title: 'Лук',
        url: './image/onion.png',
      },
    ],
    type: 'checkbox',
  },
  {
    question: 'Добавить соус?',
    answers: [
      {
        title: 'Чесночный',
        url: './image/sauce1.png',
      },
      {
        title: 'Томатный',
        url: './image/sauce2.png',
      },
      {
        title: 'Горчичный',
        url: './image/sauce3.png',
      },
    ],
    type: 'radio',
  },
];

const openModalButton = document.querySelector('#btnOpenModal');
const modal = document.querySelector('#modalBlock');
const closeModal = document.querySelector('#closeModal');
const questionTitle = document.querySelector('#question');
const formAnswers = document.querySelector('#formAnswers');
const nextButton = document.querySelector('#next');
const prevButton = document.querySelector('#prev');

let page = 0;

closeModal.addEventListener('click', onCloseModalClick);
openModalButton.addEventListener('click', onOpenModalBtnClick);
nextButton.addEventListener('click', onNextBtnClick);
prevButton.addEventListener('click', onPrevBtnClick);

function onOpenModalBtnClick() {
  modal.classList.add('d-block');
  playTest();
}

function onCloseModalClick() {
  modal.classList.remove('d-block');
}

function playTest() {
  formAnswers.innerHTML = '';

  if (page === 0) {
    prevButton.style.display = 'none';
  }
  if (page > 0) {
    prevButton.style.display = 'block';
  }
  if (page < questions.length - 1) {
    nextButton.style.display = 'block';
  }
  if (page === questions.length - 1) {
    nextButton.style.display = 'none';
  }

  const renderAnswers = (answersArr, type) => {
    answersArr.forEach(answer => {
      const answerItem = document.createElement('div');
      answerItem.classList.add('answers-item', 'd-flex', 'flex-column');

      answerItem.innerHTML = `
      <input type="${type}" id="${answer.title}" name="answer" class="d-none" />
         <label for="${answer.title}" class="d-flex flex-column justify-content-between">
             <img class="answerImg" src="${answer.url}" alt="burger" />
             <span>${answer.title}</span>
         </label>
      `;

      formAnswers.appendChild(answerItem);
    });
  };

  const renderQuestions = index => {
    questionTitle.textContent = `${questions[index].question}`;

    renderAnswers(questions[index].answers, questions[index].type);
  };

  renderQuestions(page);
}

function onNextBtnClick() {
  page += 1;
  playTest();
}

function onPrevBtnClick() {
  page -= 1;
  playTest();
}
