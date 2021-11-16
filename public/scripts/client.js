$(document).ready(function () {

  const generateIcons = (icons) => {
    const iconElems = icons.map((icon) => $("<i>").addClass(`fas fa-${icon}`));
    return iconElems;
  }

  const createTweetElement = (tweet) => {
    const { user, content, created_at } = tweet;
    const icons = ["flag", "retweet", "heart"];

    // Create the header
    const $image = $("<img>").attr("src", user.avatars);
    const $name = $("<div>").text(user.name);
    const $tweeterHandle = $("<div>").text(user.handle);
    const $header = $("<header>").append($image, $name, $tweeterHandle);

    // Create the text
    const $text = $("<div>").text(content.text);

    // Create footer
    const $timeAgo = $("<div>").text(timeago.format(created_at));
    const $icons = $("<div>").html(generateIcons(icons));
    const $footer = $("<footer>").append($timeAgo, $icons);

    // Create article
    const article = $("<article>").append($header, $text, $footer).addClass("tweet");

    return article;
  }

  const clearErrorMessage = () => $(".error-message").html("");

  const removeError = () => {
    clearErrorMessage();
    $(".error-wrapper").slideUp();
  };

  const showError = (text) => {
    clearErrorMessage();
    const errorIcon = ["exclamation-triangle"];
    const $errMessage = $("<div>").text(text);

    $(".error-message").append(generateIcons(errorIcon), $errMessage, generateIcons(errorIcon)).css("display", "flex");
    $(".error-wrapper").slideDown();
  };

  const renderTweets = (data) => {
    $(".tweets").html("");
    const tweetsDisplay = data.reverse().map(tweet => createTweetElement(tweet));
    $(".tweets").append(tweetsDisplay);
  };

  const getTweets = () => {
    $.get("http://localhost:8080/tweets").then((data) => renderTweets(data));
  };

  const postTweet = (data) => {
    $.post("http://localhost:8080/tweets", data).then(() => getTweets());
  };

  function tweetSubmitHandler(e) {
    e.preventDefault();
    const input = $("#tweet-text");

    if (!input.val()) return showError("Tweet cannot be empty.");
    if (input.val().length > 140) return showError("Tweets must be 140 character or under.");

    // Valid tweet
    removeError();
    const queryString = $(this).serialize();
    postTweet(queryString);
    input.val("");
    $(".counter").text(140);
  };

  const handleMouseEnter = () => $(".compose").children("i").addClass("up-down-animation");
  const handleMouseExit = () => $(".compose").children("i").removeClass("up-down-animation");

  const handleComposeClick = () => {
    $("#new-tweet").slideToggle();
  };

  $(".compose").hover(handleMouseEnter, handleMouseExit);
  $(".compose").click(handleComposeClick);

  $("#compose-form").submit(tweetSubmitHandler);
  getTweets();
});

