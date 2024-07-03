import AbstractView from "./abstract.js";
import { createDomElement } from "../utils/render.js";

const getPropertiesGameSectionTemplate = () => {
  return {
    tag: "section",
    className: "hangman__game game",
  };
};

const getPropertiesGameTitleTemplate = () => {
  return {
    tag: "h2",
    className: "game__title visually-hidden",
    textContent: "Game desk",
  };
};

const getPropertiesAnswerSectionTemplate = () => {
  return {
    tag: "section",
    className: "game__answer",
  };
};

const getPropertiesAnswerTitleTemplate = () => {
  return {
    tag: "h3",
    className: "game__answer-title visually-hidden",
    textContent: "Answer",
  };
};

const getPropertiesAnswerLetterTemplate = () => {
  return {
    tag: "p",
    className: "game__answer-letter",
  };
};

const getPropertiesQuestionSectionTemplate = () => {
  return {
    tag: "section",
    className: "game__question",
  };
};
const getPropertiesQuestionTitleTemplate = () => {
  return {
    tag: "h3",
    className: "game__question-title visually-hidden",
    textContent: "Question",
  };
};
const getPropertiesQuestionTextTemplate = (question) => {
  return {
    tag: "p",
    className: "game__question-text",
    textContent: question,
  };
};

export default class Game extends AbstractView {
  constructor(question) {
    super();
    this._answer = question.answer;
    this._question = question.text;
    this._elements = this.generateNode();
    this._structure = {
      element: this._elements.gameSection,
      child: [
        {
          element: this._elements.gameTitle,
        },
        {
          element: this._elements.answerSection,
          child: [
            {
              element: this._elements.answerTitle,
            },
            {
              element: this._elements.answerLetters,
            },
          ],
        },
        {
          element: this._elements.questionSection,
          child: [
            {
              element: this._elements.questionTitle,
            },
            {
              element: this._elements.questionText,
            },
          ],
        },
      ],
    };
  }

  generateNode() {
    return {
      gameSection: createDomElement(getPropertiesGameSectionTemplate()),
      gameTitle: createDomElement(getPropertiesGameTitleTemplate()),
      answerSection: createDomElement(getPropertiesAnswerSectionTemplate()),
      answerTitle: createDomElement(getPropertiesAnswerTitleTemplate()),
      answerLetters: this._answer
        .split("")
        .map(() => createDomElement(getPropertiesAnswerLetterTemplate())),
      questionSection: createDomElement(getPropertiesQuestionSectionTemplate()),
      questionTitle: createDomElement(getPropertiesQuestionTitleTemplate()),
      questionText: createDomElement(
        getPropertiesQuestionTextTemplate(this._question),
      ),
    };
  }

  setLetter(letter) {
    const letterElement = this._elements.answerLetters;
    this._answer.split("").forEach((answerLetter, index) => {
      if (answerLetter.toLowerCase() === letter.toLowerCase()) {
        letterElement[index].innerText = letter.toLowerCase();
      }
    });
  }
}
