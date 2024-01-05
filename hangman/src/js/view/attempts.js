import AbstractView from "./abstract.js";

const createAttemptsTemplate = () => {
  return `<div class="result__attempts">
            <img
              class="result__heart"
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
