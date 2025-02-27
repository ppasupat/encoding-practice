const QTYPES = (function () {

  // ################################
  // Utilities

  function randRange(a, b) {
    if (b === void 0) {
      return Math.floor(Math.random() * a);
    }
    return Math.floor(Math.random() * (b - a)) + a;
  }

  function shuffle(stuff) {
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
  // Keyboards

  // ################################
  // Question types

  const a1z26 = {
    name: 'A1Z26',
    genQuestion: function () {
      let c = randRange(1, 27);
      $('<p class=bigline>').appendTo('#screen').append(c);
      $('<div id=answer>').appendTo('#screen');
      return String.fromCharCode(64 + c);
    },
  };

  return [
    a1z26,
  ];
})();
