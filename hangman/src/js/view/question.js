import AbstractView from "./abstract.js";

const createQuestionTemplate = (question) => {
  return `<section class="game__question">
        <h2 class="game__question-title visually-hidden">Question</h2>
        <p class="game__question-text">
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
