import AbstractView from "./abstract.js";

const createLetterTemplate = () => {
  return `<p class="hangman__answer-letter"></p>`;
};

const createAnswerTemplate = (answer) => {
  const answerLetterTemplate = answer
    .split("")
    .map(() => createLetterTemplate())
    .join(``);
  return `<section class="hangman__answer">
        ${answerLetterTemplate}
      </section>`;
};

export default class Answer extends AbstractView {
  constructor(question) {
    super();
    this._answer = question.answer;
  }

  setLetter(letter) {
    const letterElement = this.getElement().querySelectorAll(
      `.hangman__answer-letter`,
    );
    this._answer.split("").forEach((answerLetter, index) => {
      if (answerLetter.toLowerCase() === letter.toLowerCase()) {
        letterElement[index].innerText = letter;
      }
    });
  }

  getTemplate() {
    return createAnswerTemplate(this._answer);
  }
}
