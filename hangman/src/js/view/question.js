import AbstractView from "./abstract.js";

const createQuestionTemplate = (question) => {
  return `<section class="hangman__question">
        <p class="hangman__question-text">
          ${question}
        </p>
      </section>`;
};

export default class Question extends AbstractView {
  constructor(question) {
    super();
    this._question = question.text;
  }

  getTemplate() {
    return createQuestionTemplate(this._question);
  }
}
