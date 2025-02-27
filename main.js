$(function () {
  'use strict';

  const SCREEN_WIDTH = 500, SCREEN_HEIGHT = 700;
  const FLASH_DELAY = 300;

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

  let score = 0, misses = 0, qtype = null, goldAnswer = null;

  function setupMenu() {
    // TODO: Populate the options
    showScene('menu');
  }

  $('#start-button').click(setupQuiz);

  function setupQuiz() {
    score = 0;
    misses = 0;
    refreshScores();
    nextQuestion();
    showScene('quiz');
  }

  function refreshScores(flashElem) {
    $('#disp-score').text(score);
    $('#disp-misses').text(misses);
    if (flashElem !== void 0) {
      $(flashElem).addClass('flashing');
      setTimeout(function () {
        $(flashElem).removeClass('flashing');
      }, FLASH_DELAY);
    }
  }

  function nextQuestion() {
    qtype = QTYPES[Math.floor(Math.random() * QTYPES.length)];
    $('#hud-qtype').text(qtype.name);
    $('#screen').empty();
    goldAnswer = qtype.genQuestion();
    checkKeys();
  }

  function getAnswer() {
    if (qtype.getAnswer !== void 0) {
      return qtype.getAnswer();
    }
    return $('#answer').text();
  }

  function setAnswer(answer) {
    if (qtype.setAnswer !== void 0) {
      return qtype.setAnswer();
    }
    return $('#answer').text(answer);
  }

  function checkAnswer(answer) {
    if (qtype.checkAnswer !== void 0) {
      return qtype.checkAnswer(answer, goldAnswer);
    }
    return answer.replace(/\s+/g, '').trim() === goldAnswer;
  }

  $('#hud-menu').click(setupMenu);

  // ################################
  // Keyboard

  const KEY_ALPHS = $('.key.alph'),
    KEY_BKSP = $('#key-bksp'), KEY_BKSP_ID = 'key-bksp',
    KEY_SUBMIT = $('#key-submit'), KEY_SUBMIT_ID = 'key-submit';

  const KEYS_ENGLISH = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G',
    'H', 'I', 'J', 'K', 'L', 'M', 'N',
    'O', 'P', 'Q', 'R', 'S', 'T', 'U',
    'V', 'W', 'X', 'Y', 'Z',
  ];

  function setKeys(keyArray) {
    KEY_ALPHS.each(function (i) {
      $(this).text(keyArray[i]);
    });
  }

  // Set the 'xxx' class on disabled keys
  function checkKeys() {
    if (qtype.checkKeys !== void 0) {
      if (qtype.checkKeys()) return;
    }
    let answer = getAnswer(), isEmpty = !answer.length;
    KEY_BKSP.toggleClass('xxx', isEmpty);
    KEY_SUBMIT.toggleClass('xxx', isEmpty);
  }

  // Handler when clicking on a non-disabled key
  function onKey(key) {
    if (qtype.onKey !== void 0) {
      if (qtype.onKey(key)) return;
    }
    let keyId = key.attr('id'), answer = getAnswer();
    if (keyId === KEY_SUBMIT_ID) {
      if (checkAnswer(answer)) {
        score++;
        refreshScores('#hud-score');
        nextQuestion();
      } else {
        misses++;
        refreshScores('#hud-misses');
      }
    } else if (keyId === KEY_BKSP_ID) {
      setAnswer(answer.slice(0, -1));
    } else {  // Alph
      setAnswer(answer + key.text());
    }
  }

  $('.key').click(function (e) { 
    if ($(this).hasClass('xxx')) return;
    onKey($(this));
    checkKeys();
  });

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
