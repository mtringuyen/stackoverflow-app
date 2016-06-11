const moment = require('moment');
const stackexchange = require('./stackexchange-api');

let questionScreenBackdrop = document.querySelector('.question-screen-backdrop');
let questionScreen = document.querySelector('.question-screen');

stackexchange
  .fetch('questions', {
    order: 'desc',
    sort: 'creation',
    tagged: 'javascript',
    filter: '!.Iwe-BCqkNewR)ZWx-7zZL5XRf(Y4'
  })
  .then((response) => {
    let questions = response.items;
    let questionsElements = [];

    questions.forEach((question) => {
      const timeAgo = moment(question.creation_date * 1000).fromNow();
      let questionElement = document.createElement('div');
      questionElement.classList.add('question');
      questionElement.question = question;
      questionElement.innerHTML = `
        <div class="question">
          <div class="question-title">${question.title}</div>
          <div class="question-info">2 paraghaphs, 1 code-block, 1 JSFiddle</div>
          <ul class="question-tags">
            ${question.tags.map((tag, last) => `<li>${tag}</li>`).join(' ')}
          </ul>
          <span class="question-time">
            ${timeAgo}
            <a href="${question.owner.link}">${question.owner.display_name}</a>
          </span>
        </div>
      `;

      document.querySelector('#answer-questions-section').appendChild(questionElement);
      questionsElements.push(questionElement);
    });

    // Open question on click
    questionsElements.forEach((questionElement) => {
      questionElement.addEventListener('click', () => {
        questionScreenBackdrop.classList.add('is-shown');
        questionScreen.classList.add('is-shown');

        // TODO implement template loading (+design it)
        console.log(questionElement.question);
      });
    });

    // Close question screen on click outside
    questionScreenBackdrop.addEventListener('click', () => {
      questionScreenBackdrop.classList.remove('is-shown');
      questionScreen.classList.remove('is-shown');
    });

    require('../assets/ex-links').optimizeLinks();
  });