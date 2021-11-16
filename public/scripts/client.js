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

  const clearErrorMessage = () => $(".error").html("");

  const removeError = () => {
    clearErrorMessage();
    $(".error").slideUp();
  }

  const showError = (text) => {
    clearErrorMessage();
    const errorIcon = ["exclamation-triangle"];
    const $icon = generateIcons(errorIcon);
    const $errMessage = $("<div>").text(text);

    $(".error").append($icon, $errMessage, $icon).slideDown();
  };

  const renderTweets = (data) => {
    $(".tweets").html("");
    const tweetsDisplay = data.reverse().map(tweet => createTweetElement(tweet));
    $(".tweets").append(tweetsDisplay);
  };

  const getTweets = () => {
    $.get("http://localhost:8080/tweets").then((data) => renderTweets(data));
  }

  const postTweet = (data) => {
    $.post("http://localhost:8080/tweets", data).then(() => getTweets());
  };

  function tweetSubmitHandler(e) {
    e.preventDefault();
    const input = $("#tweet-text");

    if (!input.val()) return showError("Tweet cannot be empty!");
    if (input.val().length > 140) return showError("This tweet is too long! Keep it under 140 characters.");

    // Valid tweet
    removeError();
    const queryString = $(this).serialize();
    postTweet(queryString);
    input.val("");
    $(".counter").text(140);
  };

  $("#compose-form").submit(tweetSubmitHandler);
  getTweets();
});

