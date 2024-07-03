/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scss/main.scss":
/*!****************************!*\
  !*** ./src/scss/main.scss ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/js/model/questions.js":
/*!***********************************!*\
  !*** ./src/js/model/questions.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Questions)
/* harmony export */ });
class Questions {
  constructor() {
    this._questions = [];
  }

  setQuestions(questions) {
    this._questions = questions.slice();
  }

  getQuestions() {
    return this._questions;
  }

  adaptToClient(question) {
    const adaptedQuestion = Object.assign({}, question, {
      id: question.id,
      text: question.text,
      answer: question.answer,
    });
    return adaptedQuestion;
  }
}


/***/ }),

/***/ "./src/js/presenter/hangman.js":
/*!*************************************!*\
  !*** ./src/js/presenter/hangman.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Hangman)
/* harmony export */ });
/* harmony import */ var _utils_render_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/render.js */ "./src/js/utils/render.js");
/* harmony import */ var _utils_const_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/const.js */ "./src/js/utils/const.js");
/* harmony import */ var _view_main_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../view/main.js */ "./src/js/view/main.js");
/* harmony import */ var _view_result_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../view/result.js */ "./src/js/view/result.js");
/* harmony import */ var _view_game_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../view/game.js */ "./src/js/view/game.js");
/* harmony import */ var _view_keyboard_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../view/keyboard.js */ "./src/js/view/keyboard.js");
/* harmony import */ var _view_end_game_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../view/end-game.js */ "./src/js/view/end-game.js");








class Hangman {
  constructor(gameContainer) {
    this._gameContainer = gameContainer;
    this._mainComponent = new _view_main_js__WEBPACK_IMPORTED_MODULE_2__["default"]();
    this._isGameStarted = false;
  }

  init(questions) {
    this._questions = questions;
    console.log(
      "Ответы в игре только на английском, при вводе с клавиатуры, просьба убедиться что включена верная раскладка. Приятной игры :)",
    );
    this._getStorage();
    this._renderBase();
    this._startNewGame();
  }

  _startNewGame() {
    this._isGameStarted = true;
    this._mistakeCount = 0;
    this._foundLetters = [];
    this._currentQuestion = this._getRandomQuestion();
    console.log(`Answer: ${this._currentQuestion.answer}`);
    this._setStorage();
    this._resultComponent = new _view_result_js__WEBPACK_IMPORTED_MODULE_3__["default"](this._mistakeCount);
    this._gameComponent = new _view_game_js__WEBPACK_IMPORTED_MODULE_4__["default"](this._currentQuestion);
    this._keyboardComponent = new _view_keyboard_js__WEBPACK_IMPORTED_MODULE_5__["default"]();
    this._renderGame();
  }

  _renderBase() {
    (0,_utils_render_js__WEBPACK_IMPORTED_MODULE_0__.render)(this._gameContainer, this._mainComponent);
  }

  _renderGame() {
    (0,_utils_render_js__WEBPACK_IMPORTED_MODULE_0__.render)(this._mainComponent._elements.div, this._gameComponent);
    (0,_utils_render_js__WEBPACK_IMPORTED_MODULE_0__.render)(this._mainComponent._elements.div, this._resultComponent);
    (0,_utils_render_js__WEBPACK_IMPORTED_MODULE_0__.render)(this._gameComponent, this._keyboardComponent);

    const onKeyClick = (letter) => {
      this._setNextGameStep(letter);
    };

    this._keyboardComponent.setKeyClickHandler(onKeyClick);
  }

  _setNextGameStep(letter) {
    if (this._isGameStarted) {
      if (this._currentQuestion.answer.includes(letter.toLowerCase()))
        this._setNewLetter(letter);
      else if (this._mistakeCount < _utils_const_js__WEBPACK_IMPORTED_MODULE_1__.MAX_MISTAKE_COUNT) this._setNewMistake();
    }
  }

  _setNewLetter(letter) {
    this._gameComponent.setLetter(letter);
    this._foundLetters.push(letter.toLowerCase());
    if (this._isFinish()) this._showEndGameInformation();
  }

  _setNewMistake() {
    this._mistakeCount += 1;
    this._resultComponent.updateMistake(this._mistakeCount);
    if (this._mistakeCount === _utils_const_js__WEBPACK_IMPORTED_MODULE_1__.MAX_MISTAKE_COUNT)
      this._showEndGameInformation();
  }

  _getRandomQuestion() {
    let newQuestion = this._getNextQuestion();
    while (this._currentQuestion === newQuestion) {
      newQuestion = this._getNextQuestion();
    }
    return newQuestion;
  }

  _getNextQuestion() {
    return this._questions[Math.floor(Math.random() * this._questions.length)];
  }

  _isFinish() {
    const answerLetters = this._currentQuestion.answer
      .split("")
      .filter((el) => !this._foundLetters.includes(el));
    return answerLetters.length === 0;
  }

  _showEndGameInformation() {
    this._isGameStarted = false;
    this._keyboardComponent.deleteKeyClickHandler();
    this._endGameComponent = new _view_end_game_js__WEBPACK_IMPORTED_MODULE_6__["default"](
      this._currentQuestion,
      this._mistakeCount < _utils_const_js__WEBPACK_IMPORTED_MODULE_1__.MAX_MISTAKE_COUNT,
    );

    (0,_utils_render_js__WEBPACK_IMPORTED_MODULE_0__.render)(this._gameContainer, this._endGameComponent);

    const onPlayAgainClick = () => {
      this._restartGame();
    };

    this._endGameComponent.setPlayAgainClickHandler(onPlayAgainClick);
  }

  _restartGame() {
    this._destroyResultModal();
    this._destroyGameResult();
    this._startNewGame();
  }

  _destroyResultModal() {
    (0,_utils_render_js__WEBPACK_IMPORTED_MODULE_0__.remove)(this._endGameComponent);
  }

  _destroyGameResult() {
    (0,_utils_render_js__WEBPACK_IMPORTED_MODULE_0__.remove)(this._resultComponent);
    (0,_utils_render_js__WEBPACK_IMPORTED_MODULE_0__.remove)(this._gameComponent);
    // this._keyboardComponent.deleteKeyClickHandler();
    (0,_utils_render_js__WEBPACK_IMPORTED_MODULE_0__.remove)(this._keyboardComponent);
  }

  _setStorage() {
    window.localStorage.setItem(
      `${_utils_const_js__WEBPACK_IMPORTED_MODULE_1__.STORE_NAME}-currentQuestionId`,
      this._currentQuestion.id,
    );
  }
  _getStorage() {
    const questionId = window.localStorage.getItem(
      `${_utils_const_js__WEBPACK_IMPORTED_MODULE_1__.STORE_NAME}-currentQuestionId`,
    );
    if (questionId) {
      this._currentQuestion = this._questions.filter(
        (el) => el.id === questionId,
      )[0];
    }
  }
}


/***/ }),

/***/ "./src/js/utils/const.js":
/*!*******************************!*\
  !*** ./src/js/utils/const.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   KEYBOARD: () => (/* binding */ KEYBOARD),
/* harmony export */   MAX_MISTAKE_COUNT: () => (/* binding */ MAX_MISTAKE_COUNT),
/* harmony export */   STORE_NAME: () => (/* binding */ STORE_NAME)
/* harmony export */ });
const MAX_MISTAKE_COUNT = 6;
const KEYBOARD = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["z", "x", "c", "v", "b", "n", "m"],
];
const STORE_PREFIX = `hangman`;
const STORE_VER = `v1`;
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;


/***/ }),

/***/ "./src/js/utils/render.js":
/*!********************************!*\
  !*** ./src/js/utils/render.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createDomElement: () => (/* binding */ createDomElement),
/* harmony export */   createElement: () => (/* binding */ createElement),
/* harmony export */   remove: () => (/* binding */ remove),
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var _view_abstract_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../view/abstract.js */ "./src/js/view/abstract.js");


const render = (container, child) => {
  const containerEl = getElement(container);
  const childEl = getElement(child);

  containerEl.append(childEl);

  renderChild(childEl, getChild(child, childEl));
};

const renderChild = (container, childList) => {
  if (childList) {
    childList.forEach((childItem) => {
      if (Array.isArray(childItem.element)) {
        childItem.element.forEach((el) => render(container, el));
      } else render(container, childItem);
    });
  }
};

const getElement = (container) => {
  let element = container;
  if (element._structure) element = element._structure;
  while (element.element) {
    element = element.element;
  }
  return element;
};

const getChild = (node, element) => {
  let currentNode = node._structure ? node._structure : node.element;
  // let child = node.child ? node.child.element : undefined;
  let child = node.child ? node.child : undefined;
  if (!child && currentNode) {
    while (currentNode.child) {
      if (currentNode.element === element) {
        child = currentNode.child;
        break;
      }
      currentNode = currentNode.child;
    }
  }
  return child;
};

// const renderChild = (container, child) => {
//   child.forEach((childrenObj) => {
//     if (Array.isArray(childrenObj._element)) {
//       childrenObj._element.forEach((childElement) =>
//         renderElementWhitChild(container, childElement, childrenObj._elementChildren),
//       );
//     } else renderElementWhitChild(container, childrenObj._element, childrenObj._elementChildren);
//   });
// };

// const renderElementWhitChild = (container, element, child) => {
//   render(container, element);
//   if (child) {
//     renderChild(element, child);
//   }
// };

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

const createDomElement = (properties) => {
  const newElement = Object.assign(
    document.createElement(properties.tag),
    properties,
  );

  return newElement;
};

const remove = (component) => {
  if (component === null) {
    return;
  }

  if (!(component instanceof _view_abstract_js__WEBPACK_IMPORTED_MODULE_0__["default"])) {
    throw new Error(`Can remove only components`);
  }

  component.getElement().remove();
  component.removeElement();
};


/***/ }),

/***/ "./src/js/view/abstract.js":
/*!*********************************!*\
  !*** ./src/js/view/abstract.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Abstract)
/* harmony export */ });
class Abstract {
  constructor() {
    if (new.target === Abstract) {
      throw new Error(`Can't instantiate Abstract, only concrete one.`);
    }
    this._structure = null;
    this._callback = {};
  }

  getElement() {
    return this._structure["element"];
  }

  removeElement() {
    this.element = null;
  }
}


/***/ }),

/***/ "./src/js/view/end-game.js":
/*!*********************************!*\
  !*** ./src/js/view/end-game.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ EndGame)
/* harmony export */ });
/* harmony import */ var _abstract_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract.js */ "./src/js/view/abstract.js");
/* harmony import */ var _utils_render_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/render.js */ "./src/js/utils/render.js");



const getPropertiesAsideTemplate = () => {
  return {
    tag: "aside",
    className: "modal-results",
  };
};

const getPropertiesDiveTemplate = () => {
  return {
    tag: "div",
    className: "modal-results__wrapper",
  };
};

const getPropertiesTitleTemplate = (isWin) => {
  return {
    tag: "h2",
    className: "modal-results__title",
    textContent: `${isWin ? "Uh, congratulations!" : "Ups..."}`,
  };
};

const getPropertiesInformationTemplate = (answer, question) => {
  return {
    tag: "p",
    className: "modal-results__information",
    innerHTML: `<span class="modal-results__answer">${answer}</span> - ${question}`,
  };
};

const getPropertiesButtonTemplate = () => {
  return {
    tag: "a",
    className: "modal-results__button",
    textContent: "Play again",
  };
};

class EndGame extends _abstract_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(question, isWin) {
    super();
    this._isWin = isWin;
    this._question = question.text;
    this._answer = question.answer;
    this._elements = this.generateNode();
    this._structure = {
      element: this._elements.aside,
      child: [
        {
          element: this._elements.div,
          child: [
            {
              element: this._elements.title,
            },
            {
              element: this._elements.information,
            },
            {
              element: this._elements.closeBtn,
            },
          ],
        },
      ],
    };
    this._playAgainClickHandler = this._playAgainClickHandler.bind(this);
  }

  generateNode() {
    return {
      aside: (0,_utils_render_js__WEBPACK_IMPORTED_MODULE_1__.createDomElement)(getPropertiesAsideTemplate()),
      div: (0,_utils_render_js__WEBPACK_IMPORTED_MODULE_1__.createDomElement)(getPropertiesDiveTemplate()),
      title: (0,_utils_render_js__WEBPACK_IMPORTED_MODULE_1__.createDomElement)(getPropertiesTitleTemplate(this._isWin)),
      information: (0,_utils_render_js__WEBPACK_IMPORTED_MODULE_1__.createDomElement)(
        getPropertiesInformationTemplate(this._answer, this._question),
      ),
      closeBtn: (0,_utils_render_js__WEBPACK_IMPORTED_MODULE_1__.createDomElement)(getPropertiesButtonTemplate()),
    };
  }

  _playAgainClickHandler(evt) {
    evt.preventDefault();
    this._callback.playAgainClick();
  }

  setPlayAgainClickHandler(callback) {
    this._callback.playAgainClick = callback;
    this._elements.closeBtn.addEventListener(
      `click`,
      this._playAgainClickHandler,
    );
  }
}


/***/ }),

/***/ "./src/js/view/game.js":
/*!*****************************!*\
  !*** ./src/js/view/game.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Game)
/* harmony export */ });
/* harmony import */ var _abstract_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract.js */ "./src/js/view/abstract.js");
/* harmony import */ var _utils_render_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/render.js */ "./src/js/utils/render.js");



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

class Game extends _abstract_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
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
      gameSection: (0,_utils_render_js__WEBPACK_IMPORTED_MODULE_1__.createDomElement)(getPropertiesGameSectionTemplate()),
      gameTitle: (0,_utils_render_js__WEBPACK_IMPORTED_MODULE_1__.createDomElement)(getPropertiesGameTitleTemplate()),
      answerSection: (0,_utils_render_js__WEBPACK_IMPORTED_MODULE_1__.createDomElement)(getPropertiesAnswerSectionTemplate()),
      answerTitle: (0,_utils_render_js__WEBPACK_IMPORTED_MODULE_1__.createDomElement)(getPropertiesAnswerTitleTemplate()),
      answerLetters: this._answer
        .split("")
        .map(() => (0,_utils_render_js__WEBPACK_IMPORTED_MODULE_1__.createDomElement)(getPropertiesAnswerLetterTemplate())),
      questionSection: (0,_utils_render_js__WEBPACK_IMPORTED_MODULE_1__.createDomElement)(getPropertiesQuestionSectionTemplate()),
      questionTitle: (0,_utils_render_js__WEBPACK_IMPORTED_MODULE_1__.createDomElement)(getPropertiesQuestionTitleTemplate()),
      questionText: (0,_utils_render_js__WEBPACK_IMPORTED_MODULE_1__.createDomElement)(
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


/***/ }),

/***/ "./src/js/view/keyboard.js":
/*!*********************************!*\
  !*** ./src/js/view/keyboard.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Keyboard)
/* harmony export */ });
/* harmony import */ var _abstract_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract.js */ "./src/js/view/abstract.js");
/* harmony import */ var _utils_const_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/const.js */ "./src/js/utils/const.js");
/* harmony import */ var _utils_render_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/render.js */ "./src/js/utils/render.js");




const getPropertiesTemplate = () => {
  return {
    tag: "section",
    className: "game__keyboard keyboard",
  };
};

const getPropertiesTitleTemplate = () => {
  return {
    tag: "h3",
    className: "keyboard__title visually-hidden",
    textContent: "Keyboard",
  };
};

const getPropertiesRowTemplate = () => {
  return {
    tag: "div",
    className: "keyboard__row",
  };
};

const getPropertiesLetterTemplate = (letter) => {
  return {
    tag: "p",
    className: "keyboard__letter keyboard__letter--active",
    textContent: letter.toUpperCase(),
    data: letter,
  };
};

class Keyboard extends _abstract_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super();
    this._elements = this.generateNode();
    this._structure = {
      element: this._elements.section,
      child: [
        {
          element: this._elements.title,
        },
      ],
    };
    _utils_const_js__WEBPACK_IMPORTED_MODULE_1__.KEYBOARD.forEach((row, index) => {
      this._structure["child"].push({
        element: this._elements[`row_${index}`],
        child: this.getLettersArray(row),
      });
    });

    this._keyClickHandler = this._keyClickHandler.bind(this);
    this._keyDownHandler = this._keyDownHandler.bind(this);
  }

  generateNode() {
    const nodeList = {
      section: (0,_utils_render_js__WEBPACK_IMPORTED_MODULE_2__.createDomElement)(getPropertiesTemplate()),
      title: (0,_utils_render_js__WEBPACK_IMPORTED_MODULE_2__.createDomElement)(getPropertiesTitleTemplate()),
      row: (0,_utils_render_js__WEBPACK_IMPORTED_MODULE_2__.createDomElement)(getPropertiesRowTemplate()),
    };

    _utils_const_js__WEBPACK_IMPORTED_MODULE_1__.KEYBOARD.forEach((row, index) => {
      nodeList[`row_${index}`] = (0,_utils_render_js__WEBPACK_IMPORTED_MODULE_2__.createDomElement)(getPropertiesRowTemplate());
      row.forEach((letter) => {
        nodeList[`letter_${letter}`] = (0,_utils_render_js__WEBPACK_IMPORTED_MODULE_2__.createDomElement)(
          getPropertiesLetterTemplate(letter),
        );
      });
    });

    return nodeList;
  }

  getLettersArray(row) {
    const letterArr = row.map((letter) => {
      const letterObj = new Object();
      letterObj.element = this._elements[`letter_${letter}`];
      return letterObj;
    });
    return letterArr;
  }

  _keyClickHandler(evt) {
    if (!evt.target.classList.contains("keyboard__letter")) {
      return;
    }
    if (evt.target.classList.contains("keyboard__letter--active")) {
      evt.target.classList.remove("keyboard__letter--active");
      evt.target.classList.add("keyboard__letter--inactive");
      evt.preventDefault();
      this._callback.keyboardClick(evt.target.data);
    }
  }

  _keyDownHandler(evt) {
    if (evt.key) {
      const keyElement = this._elements[`letter_${evt.key.toLowerCase()}`];
      if (keyElement) {
        if (keyElement.classList.contains("keyboard__letter--active")) {
          keyElement.classList.remove("keyboard__letter--active");
          keyElement.classList.add("keyboard__letter--inactive");
          evt.preventDefault();
          this._callback.keyboardClick(evt.key.toUpperCase());
        }
      }
    }
  }

  setKeyClickHandler(callback) {
    this._callback.keyboardClick = callback;
    this.getElement().addEventListener(`click`, this._keyClickHandler);
    document.addEventListener(`keydown`, this._keyDownHandler);
  }

  deleteKeyClickHandler() {
    this.getElement().removeEventListener(`click`, this._keyClickHandler);
    document.removeEventListener(`keydown`, this._keyDownHandler);
  }
}


/***/ }),

/***/ "./src/js/view/main.js":
/*!*****************************!*\
  !*** ./src/js/view/main.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Main)
/* harmony export */ });
/* harmony import */ var _abstract_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract.js */ "./src/js/view/abstract.js");
/* harmony import */ var _utils_render_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/render.js */ "./src/js/utils/render.js");



const getPropertiesTemplate = () => {
  return {
    tag: "main",
    className: "hangman",
  };
};

const getPropertiesArticleTemplate = () => {
  return {
    tag: "article",
    className: "hangman__wrapper",
  };
};

const getPropertiesTitleTemplate = () => {
  return {
    tag: "h1",
    className: "hangman__title",
    textContent: "Hangman",
  };
};

const getPropertiesDivTemplate = () => {
  return {
    tag: "div",
    className: "hangman__game-wrapper",
  };
};

class Main extends _abstract_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super();
    this._elements = this.generateNode();
    this._structure = {
      element: this._elements.main,
      child: [
        {
          element: this._elements.article,
          child: [
            {
              element: this._elements.title,
            },
            {
              element: this._elements.div,
            },
          ],
        },
      ],
    };
  }

  generateNode() {
    return {
      main: (0,_utils_render_js__WEBPACK_IMPORTED_MODULE_1__.createDomElement)(getPropertiesTemplate()),
      article: (0,_utils_render_js__WEBPACK_IMPORTED_MODULE_1__.createDomElement)(getPropertiesArticleTemplate()),
      title: (0,_utils_render_js__WEBPACK_IMPORTED_MODULE_1__.createDomElement)(getPropertiesTitleTemplate()),
      div: (0,_utils_render_js__WEBPACK_IMPORTED_MODULE_1__.createDomElement)(getPropertiesDivTemplate()),
    };
  }
}


/***/ }),

/***/ "./src/js/view/result.js":
/*!*******************************!*\
  !*** ./src/js/view/result.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Result)
/* harmony export */ });
/* harmony import */ var _abstract_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract.js */ "./src/js/view/abstract.js");
/* harmony import */ var _utils_const_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/const.js */ "./src/js/utils/const.js");
/* harmony import */ var _utils_render_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/render.js */ "./src/js/utils/render.js");




const getPropertiesResultSectionTemplate = () => {
  return {
    tag: "section",
    className: "hangman__result result",
  };
};

const getPropertiesResultTitleTemplate = () => {
  return {
    tag: "h3",
    className: "result__title visually-hidden",
    textContent: "Game result",
  };
};

const getPropertiesGallowsSectionTemplate = () => {
  return {
    tag: "div",
    className: "result__gallows",
  };
};

const getPropertiesGallowsTreeTemplate = () => {
  return {
    tag: "img",
    className: "result__gallows-tree",
    src: "img/tree.png",
    alt: "allows",
    width: "514",
    height: "572",
  };
};

const getPropertiesGallowsMistakeTemplate = (mistakeCount) => {
  return {
    tag: "img",
    className: "result__gallows-mistake visually-hidden",
    src: `img/mistake-${mistakeCount === 0 ? 1 : mistakeCount}.png`,
    alt: "mistake",
    width: "514",
    height: "572",
  };
};

const getPropertiesAttemptsDivTemplate = () => {
  return {
    tag: "div",
    className: "result__attempts",
  };
};

const getPropertiesAttemptsHeartTemplate = () => {
  return {
    tag: "img",
    className: "result__heart",
    src: "img/heart.png",
    alt: "",
    width: "61",
    height: "66",
  };
};

const getPropertiesAttemptsInformationTemplate = (mistakeCount) => {
  return {
    tag: "p",
    className: "result__attempts-information",
    textContent: `${mistakeCount}/${_utils_const_js__WEBPACK_IMPORTED_MODULE_1__.MAX_MISTAKE_COUNT}`,
  };
};

class Result extends _abstract_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(mistakeCount) {
    super();
    this._mistakeCount = mistakeCount;
    this._elements = this.generateNode();
    this._structure = {
      element: this._elements.resultSection,
      child: [
        {
          element: this._elements.resultTitle,
        },
        {
          element: this._elements.gallowsDiv,
          child: [
            {
              element: this._elements.gallowsTree,
            },
            {
              element: this._elements.gallowsMistake,
            },
          ],
        },
        {
          element: this._elements.attemptsDiv,
          child: [
            {
              element: this._elements.attemptsHeart,
            },
            {
              element: this._elements.attemptsInformation,
            },
          ],
        },
      ],
    };
  }
  generateNode() {
    return {
      resultSection: (0,_utils_render_js__WEBPACK_IMPORTED_MODULE_2__.createDomElement)(getPropertiesResultSectionTemplate()),
      resultTitle: (0,_utils_render_js__WEBPACK_IMPORTED_MODULE_2__.createDomElement)(getPropertiesResultTitleTemplate()),
      gallowsDiv: (0,_utils_render_js__WEBPACK_IMPORTED_MODULE_2__.createDomElement)(getPropertiesGallowsSectionTemplate()),
      gallowsTree: (0,_utils_render_js__WEBPACK_IMPORTED_MODULE_2__.createDomElement)(getPropertiesGallowsTreeTemplate()),
      gallowsMistake: (0,_utils_render_js__WEBPACK_IMPORTED_MODULE_2__.createDomElement)(
        getPropertiesGallowsMistakeTemplate(this._mistakeCount),
      ),
      attemptsDiv: (0,_utils_render_js__WEBPACK_IMPORTED_MODULE_2__.createDomElement)(getPropertiesAttemptsDivTemplate()),
      attemptsHeart: (0,_utils_render_js__WEBPACK_IMPORTED_MODULE_2__.createDomElement)(getPropertiesAttemptsHeartTemplate()),
      attemptsInformation: (0,_utils_render_js__WEBPACK_IMPORTED_MODULE_2__.createDomElement)(
        getPropertiesAttemptsInformationTemplate(this._mistakeCount),
      ),
    };
  }

  updateMistake(mistakeCount) {
    this._mistakeCount = mistakeCount;
    if (this._mistakeCount === 1) {
      this._elements.gallowsMistake.classList.remove("visually-hidden");
    }
    this._elements.gallowsMistake.src = `img/mistake-${this._mistakeCount}.png`;
    this._elements.attemptsInformation.textContent = `${this._mistakeCount}/${_utils_const_js__WEBPACK_IMPORTED_MODULE_1__.MAX_MISTAKE_COUNT}`;
  }
}


/***/ }),

/***/ "./src/mock/questions.json":
/*!*********************************!*\
  !*** ./src/mock/questions.json ***!
  \*********************************/
/***/ ((module) => {

module.exports = JSON.parse('[{"id":"1","text":"Is it a fruit or a tech company?","answer":"apple"},{"id":"2","text":"Where can you relax with a sandy shore?","answer":"beach"},{"id":"3","text":"What do you do when you\'re happy?","answer":"smile"},{"id":"4","text":"Which striped animal lives in the jungle?","answer":"tiger"},{"id":"5","text":"What do you listen to for entertainment?","answer":"music"},{"id":"6","text":"What dish is often ordered at parties?","answer":"pizza"},{"id":"7","text":"What word describes clear weather?","answer":"sunny"},{"id":"8","text":"What do people do at parties?","answer":"dance"},{"id":"9","text":"Where can you see the flow of water?","answer":"river"},{"id":"10","text":" It\'s a small, yellow fruit with a peel","answer":"banana"},{"id":"11","text":"A fluffy animal often kept as a pet","answer":"cat"},{"id":"12","text":"It\'s a season with falling leaves","answer":"autumn"},{"id":"13","text":"You use it to write notes in class","answer":"pen"},{"id":"14","text":"A round, red vegetable often used in salads","answer":"tomato"},{"id":"15","text":"You use it to clean your teeth","answer":"toothbrush"},{"id":"16","text":"A body of water smaller than an ocean","answer":"lake"},{"id":"17","text":"Where do we live?","answer":"earth"},{"id":"18","text":"What do you do to restore energy?","answer":"sleep"},{"id":"19","text":"What is delicious and good for your health?","answer":"fruit"},{"id":"20","text":"What do you watch for entertainment in a cinema?","answer":"movie"}]');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scss/main.scss */ "./src/scss/main.scss");
/* harmony import */ var _mock_questions_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../mock/questions.json */ "./src/mock/questions.json");
/* harmony import */ var _model_questions_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./model/questions.js */ "./src/js/model/questions.js");
/* harmony import */ var _presenter_hangman_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./presenter/hangman.js */ "./src/js/presenter/hangman.js");





const siteBodyElement = document.querySelector(`body`);

if (siteBodyElement !== null) {
  const questionModel = new _model_questions_js__WEBPACK_IMPORTED_MODULE_2__["default"]();

  const initData = (data) => {
    const questions = data.map(questionModel.adaptToClient);
    questionModel.setQuestions(questions);
  };

  initData(_mock_questions_json__WEBPACK_IMPORTED_MODULE_1__);

  const hangmanPresenter = new _presenter_hangman_js__WEBPACK_IMPORTED_MODULE_3__["default"](siteBodyElement);
  hangmanPresenter.init(questionModel.getQuestions());
}

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map