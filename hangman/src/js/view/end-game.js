import AbstractView from "./abstract.js";

const createEndGameTemplate = (question, answer, isWin) => {
  return `<aside class="modal-results">
  <div class="modal-results__wrapper">
    <h1 class="modal-results__title">${
      isWin ? "Uh, congratulations!" : "Ups..."
    }</h1>
    <p class="modal-results__information"><span class="modal-results__answer">${answer}</span> - ${question}</p>
    <a class="modal-results__button">Play again</a>
  </div>
</aside>`;
};

export default class EndGame extends AbstractView {
  constructor(question, isWin) {
    super();
    this._isWin = isWin;
    this._question = question.text;
    this._answer = question.answer;
    this._playAgainClickHandler = this._playAgainClickHandler.bind(this);
  }

  getTemplate() {
    return createEndGameTemplate(this._question, this._answer, this._isWin);
  }

  _playAgainClickHandler(evt) {
    evt.preventDefault();
    this._callback.playAgainClick();
  }

  setPlayAgainClickHandler(callback) {
    this._callback.playAgainClick = callback;
    this.getElement()
      .querySelector(".modal-results__button")
      .addEventListener(`click`, this._playAgainClickHandler);
  }
}
