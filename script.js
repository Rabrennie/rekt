// Code goes here
var rektText = [],
  currentText,
  el = $('#rektText');

  meSpeak.loadConfig("mespeak_config.json");
  meSpeak.loadVoice('voices/en/en-us.json');

$.ajax({
  url: "https://rawgit.com/seiyria/status-list/master/rekt-list.md",
  context: document.body
}).done(function(data) {
  rektText = data.split('\n');
  rektText = _.slice(rektText, 1, rektText.length - 2);
  checkHash();
  new Clipboard('.btn');
  el.click(speak);
  $('#newRekt').click(reRekt);
  $(window).on('hashchange', checkHash);
});

checkHash = function() {
  if (window.location.hash) {
    pos = _.trim(window.location.hash, '#');
    if (rektText[pos]) {
      currentText = rektText[pos];
      el.html(currentText);
      speak()
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
};

speak = function() {
  var text = currentText;

  text = text.split('[x]').join('');

  text = text.split('REKT').join('rect');
  //temporary fixes
  text = text.split('rekkit').join('wreck it');
  text = text.split('-').join(' ');

  if (text.charCodeAt(8) == 178){
    text = text.split('²').join('') + ' squared ';
  }


  text = text.toLowerCase();
  
  //console.log(text);

  meSpeak.speak(text);
}