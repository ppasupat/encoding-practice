$(function () {
  'use strict';

  // ################################
  // Utilities

  function randRange(a, b) {
    return (b === void 0) ?
      Math.floor(Math.random() * a) :
      Math.floor(Math.random() * (b - a)) + a;
  }

  function randChoice(stuff) {
    return stuff[Math.floor(Math.random() * stuff.length)];
  }

  function randShuffle(stuff) {
    stuff = stuff.slice();
    for (let i = stuff.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      if (j != i) {
        let tmp = stuff[i];
        stuff[i] = stuff[j];
        stuff[j] = tmp;
      }
    }
    return stuff;
  }

  // ################################
  // Scenes

  const QTYPES = [];
  const SCREEN = $('#screen');
  let score = 0, qtype = null, goldAnswer = null;

  function showScene(name, callback) {
    $('.scene').addClass('hidden');
    $('#scene-' + name).removeClass('hidden');
    if (callback !== void 0) callback();
  }

  function setupMenu() {
    showScene('menu');
  }
  $('#menu-button').click(setupMenu);

  function setupQuiz() {
    score = 0;
    $('#score').text(score);
    nextQuestion();
    showScene('quiz');
  }
  $('#start-button').click(setupQuiz);

  function nextQuestion() {
    qtype = randChoice(QTYPES);
    $('#qtype').text(qtype.name);
    let newGoldAnswer;
    do {
      SCREEN.empty();
      newGoldAnswer = qtype.genQuestion();
    } while (newGoldAnswer === goldAnswer);
    goldAnswer = newGoldAnswer;
  }

  function checkAnswer(answer) {
    if (qtype.checkAnswer(answer, goldAnswer)) {

    }
  }

  // ################################
  // Question types

  QTYPES.push({
    name: 'Index → ABC',
    genQuestion: function () {
      let idx = randRange(1, 27);
      $('<div class=beeg>').text(idx).appendTo(SCREEN);
      return String.fromCharCode(64 + idx);
    },
  });

	// ################################
  // Preloading and screen resizing

  const SCREEN_WIDTH = 500, SCREEN_HEIGHT = 700;

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
