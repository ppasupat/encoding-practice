$(function () {
  'use strict';

  const SCREEN_WIDTH = 500, SCREEN_HEIGHT = 700;

  // ################################
  // Utilities

  function showScene(name, callback) {
    $('.scene').hide();
    $('#scene-' + name).show();
    if (callback !== void 0) callback();
  }

  // ################################
  // Persistence

  const APP_NAME = 'encoding-practice',
    DEFAULT_SETTINGS = JSON.stringify({});
  let settings = {};

  function loadSettings() {
    let settings_raw = localStorage.getItem(APP_NAME);
    if (settings_raw === null) {
      settings_raw = DEFAULT_SETTINGS;
    }
    settings = JSON.parse(settings_raw);
    // TODO: Apply the setting.
  }

  function saveSettings() {
    try {
      localStorage.setItem(APP_NAME, JSON.stringify(settings));
    } catch (e) {
      alert('ERROR: ' + e.message);
    }
  }

  loadSettings();

  // ################################
  // Main menu and Quiz

  let score = 0, misses = 0, qtype = null, goldAns = null;

  function setupMenu() {
    // TODO: Populate the options
    showScene('menu');
  }

  $('#start-button').click(setupQuiz);

  function setupQuiz() {
    score = 0;
    nextQuestion();
    showScene('quiz');
  }

  function nextQuestion() {
    // TODO: Generate the next question and show it. Also set currentQType and targetAnswer.
  }

  function checkAnswer() {
    // TODO: Use currentQType to check the answer.
    // If the answer is correct, call nextQuestion().
    // If the answer is incorrect, show the hint.
  }

  $('#hud-menu').click(setupMenu);

	// ################################
  // Preloading and screen resizing

  function resizeScreen() {
    let ratio = Math.min(
      1.0,
      window.innerWidth / SCREEN_WIDTH,
      (window.innerHeight - 25) / SCREEN_HEIGHT,
    );
    $('#game-wrapper').css({
      'width': (SCREEN_WIDTH * ratio) + 'px',
      'height': (SCREEN_HEIGHT * ratio) + 'px',
    });
    $('#game').css('transform', 'scale(' + ratio + ')');
  }

  let numResourcesLeft = 0;

  function decrementPreload (kidding) {
    if (kidding !== 'kidding') numResourcesLeft--;
    if (numResourcesLeft === 0) {
      setupMenu();
    } else {
      $('#pane-loading').text('Loading resources (' + numResourcesLeft + ' left)');
    }
  }

  resizeScreen();
  $(window).resize(resizeScreen);
  showScene('preload');
  decrementPreload('kidding');

});
