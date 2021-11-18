const maxChars = 140;

$(document).ready(function() {
  function tweetInputHandler() {
    const tweetLength = $(this).val().length;
    const charsLeftCount = maxChars - tweetLength;
    const charsLeftDisplay = $(this).next().children(".counter").text(charsLeftCount);
    if (charsLeftCount < 0) charsLeftDisplay.addClass("invalid");
    if (charsLeftCount >= 0) charsLeftDisplay.removeClass("invalid");
  }
  $("#tweet-text").on("input", tweetInputHandler);
});

