import { render, remove } from "../utils/render.js";
import { MAX_MISTAKE_COUNT, STORE_NAME } from "../utils/const.js";
import MainView from "../view/main.js";
import HangmanWrapperView from "../view/hangman-wrapper.js";
import GameWrapperView from "../view/game-wrapper.js";
import ResultView from "../view/result.js";
import AttemptsView from "../view/attempts.js";
import AttemptsInformationView from "../view/attempts-information.js";
import GallowsView from "../view/gallows.js";
import GallowsMistakeView from "../view/gallows-mistake.js";
import GameView from "../view/game.js";
import AnswerView from "../view/answer.js";
import QuestionView from "../view/question.js";
import KeyboardView from "../view/keyboard.js";
import EndGameView from "../view/end-game.js";

export default class Hangman {
  constructor(gameContainer) {
    this._gameContainer = gameContainer;
    this._resultComponent = new ResultView();
    this._mainComponent = new MainView();
    this._hangmanWrapperComponent = new HangmanWrapperView();
    this._gameWrapperComponent = new GameWrapperView();
    this._gameComponent = new GameView();
    this._resultComponent = new ResultView();
    this._gallowsComponent = new GallowsView();
    this._attemptsComponent = new AttemptsView();
  }

  init(questions) {
    this._questions = questions;
    this._getStorage();
    this._renderBase();
    this._startNewGame();
  }

  _startNewGame() {
    this._mistakeCount = 0;
    this._foundLetters = [];
    this._currentQuestion = this._getRandomQuestion();
    this._setStorage();
    this._attemptsInformationComponent = new AttemptsInformationView(
      this._mistakeCount,
    );
    this._answerComponent = new AnswerView(this._currentQuestion);
    this._questionComponent = new QuestionView(this._currentQuestion);
    this._keyboardComponent = new KeyboardView();
    this._renderGame();
  }

  _renderBase() {
    render(this._gameContainer, this._mainComponent);
    render(this._mainComponent, this._hangmanWrapperComponent);
    render(this._hangmanWrapperComponent, this._gameWrapperComponent);
    render(this._gameWrapperComponent, this._gameComponent);
    render(this._gameWrapperComponent, this._resultComponent);
    render(this._resultComponent, this._gallowsComponent);
    render(this._resultComponent, this._attemptsComponent);
  }

  _renderGame() {
    render(this._attemptsComponent, this._attemptsInformationComponent);
    render(this._gameComponent, this._answerComponent);
    render(this._gameComponent, this._questionComponent);
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
    this._answerComponent.setLetter(letter);
    this._foundLetters.push(letter.toLowerCase());
    if (this._isFinish()) this._showEndGameInformation();
  }

  _setNewMistake() {
    this._mistakeCount += 1;
    if (this._mistakeCount === 1) {
      this._gallowsMistakeComponent = new GallowsMistakeView(
        this._mistakeCount,
      );
      render(this._gallowsComponent, this._gallowsMistakeComponent);
    }
    this._gallowsMistakeComponent.updateMistake(this._mistakeCount);
    this._attemptsInformationComponent.updateMistake(this._mistakeCount);
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
    if (this._mistakeCount) remove(this._gallowsMistakeComponent);
    remove(this._attemptsInformationComponent);
    remove(this._answerComponent);
    remove(this._questionComponent);
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
