// Code goes here
var rektText = [],
  currentText,
  el = $('#rektText');

$.ajax({
  url: "https://rawgit.com/seiyria/status-list/master/rekt-list.md",
  context: document.body
}).done(function(data) {
  rektText = data.split('\n');
  rektText = _.slice(rektText, 1, rektText.length - 2);
  init();
  new Clipboard('.btn');
  $('#newRekt').click(reRekt);
});

init = function() {
  if (window.location.hash) {
    pos = _.trim(window.location.hash, '#');
    if (rektText[pos]) {
      currentText = rektText[pos];
      el.html(currentText);
    } else {
      reRekt();
    }
  } else {
    reRekt();
  }
};

reRekt = function() {
  currentText = _.sample(rektText);
  window.location.hash = _.indexOf(rektText, currentText);
  el.html(currentText);
};