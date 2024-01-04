import AbstractView from "./abstract.js";

const createAttemptsTemplate = () => {
  return `<div class="hangman__attempts">
            <img
              class="hangman__heart"
              src="img/heart.png"
              alt=""
              width="61"
              height="66"
            />
          </div>`;
};

export default class Attempts extends AbstractView {
  getTemplate() {
    return createAttemptsTemplate();
  }
}
