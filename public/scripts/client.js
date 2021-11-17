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

  const focusForm = () => {
    const $tweetText = $("#tweet-text");
    $tweetText.focus();
  }

  const handleComposeClick = () => {
    $("#new-tweet").slideToggle();
    focusForm();
  };

  $("#compose-form").submit(tweetSubmitHandler);
  $(".compose").click(handleComposeClick);

  /***************************************Scrolling events***************************************/

  const handleScroll = function () {
    const $target = $(this); // this can be either the container or window, depending on screen size
    const scrollLevel = $target.scrollTop();

    // If at the top, show the compose and hide the up btn
    if (!scrollLevel) {
      $(".up-btn").fadeOut(200);
      $(".compose").fadeIn(200);
      return;
    }

    // Otherwise, hide the compose and show the up btn

    $(".up-btn").fadeIn(200);
    $(".compose").fadeOut(200);
  };

  // Adding scroll event handler for both view layouts

  $(".container").scroll(handleScroll) // Screen width below 1024px
  $(window).scroll(handleScroll) // Screen width above 1024px

  const handleUpBtnClick = () => {
    const $newTweet = $("#new-tweet");
    $newTweet.slideDown();
    focusForm();
    $("html, body").animate({ scrollTop: 0 }, "slow");
  }
  
  // Up btn will scroll all the way up on click
  $(".up-btn").click(handleUpBtnClick);

  getTweets();
});

