import { render, remove } from "../utils/render.js";
import { MAX_MISTAKE_COUNT, STORE_NAME } from "../utils/const.js";
import MainView from "../view/main.js";
import ResultView from "../view/result.js";
import GameView from "../view/game.js";
import KeyboardView from "../view/keyboard.js";
import EndGameView from "../view/end-game.js";

export default class Hangman {
  constructor(gameContainer) {
    this._gameContainer = gameContainer;
    this._mainComponent = new MainView();
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
    this._mistakeCount = 0;
    this._foundLetters = [];
    this._currentQuestion = this._getRandomQuestion();
    console.log(`Answer: ${this._currentQuestion.answer}`);
    this._setStorage();
    this._resultComponent = new ResultView(this._mistakeCount);
    this._gameComponent = new GameView(this._currentQuestion);
    this._keyboardComponent = new KeyboardView();
    this._renderGame();
  }

  _renderBase() {
    render(this._gameContainer, this._mainComponent);
  }

  _renderGame() {
    render(this._mainComponent._elements.div, this._gameComponent);
    render(this._mainComponent._elements.div, this._resultComponent);
    render(this._gameComponent, this._keyboardComponent);

    const onKeyClick = (letter) => {
      this._setNextGameStep(letter);
    };

    this._keyboardComponent.setKeyClickHandler(onKeyClick);
  }

  _setNextGameStep(letter) {
    if (this._currentQuestion.answer.includes(letter.toLowerCase()))
      this._setNewLetter(letter);
    else if (this._mistakeCount < MAX_MISTAKE_COUNT) this._setNewMistake();
  }

  _setNewLetter(letter) {
    this._gameComponent.setLetter(letter);
    this._foundLetters.push(letter.toLowerCase());
    if (this._isFinish()) this._showEndGameInformation();
  }

  _setNewMistake() {
    this._mistakeCount += 1;
    this._resultComponent.updateMistake(this._mistakeCount);
    if (this._mistakeCount === MAX_MISTAKE_COUNT)
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
    this._endGameComponent = new EndGameView(
      this._currentQuestion,
      this._mistakeCount < MAX_MISTAKE_COUNT,
    );

    render(this._gameContainer, this._endGameComponent);

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
    remove(this._endGameComponent);
  }

  _destroyGameResult() {
    remove(this._resultComponent);
    remove(this._gameComponent);
    this._keyboardComponent.deleteKeyClickHandler();
    remove(this._keyboardComponent);
  }

  _setStorage() {
    window.localStorage.setItem(
      `${STORE_NAME}-currentQuestionId`,
      this._currentQuestion.id,
    );
  }
  _getStorage() {
    const questionId = window.localStorage.getItem(
      `${STORE_NAME}-currentQuestionId`,
    );
    if (questionId) {
      this._currentQuestion = this._questions.filter(
        (el) => el.id === questionId,
      )[0];
    }
  }
}
