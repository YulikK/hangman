import AbstractView from "./abstract.js";

const createLetterTemplate = () => {
  return `<p class="game__answer-letter"></p>`;
};

const createAnswerTemplate = (answer) => {
  const answerLetterTemplate = answer
    .split("")
    .map(() => createLetterTemplate())
    .join(``);
  return `<section class="game__answer">
        <h2 class="game__answer-title visually-hidden">Answer</h2>
        ${answerLetterTemplate}
      </section>`;
};

export default class Answer extends AbstractView {
  constructor(question) {
    super();
    this._answer = question.answer;
  }

  setLetter(letter) {
    const letterElement =
      this.getElement().querySelectorAll(`.game__answer-letter`);
    this._answer.split("").forEach((answerLetter, index) => {
      if (answerLetter.toLowerCase() === letter.toLowerCase()) {
        letterElement[index].innerText = letter.toLowerCase();
      }
    });
  }

  getTemplate() {
    return createAnswerTemplate(this._answer);
  }
}
