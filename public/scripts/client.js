$(document).ready(function () {

  /***************************************General Purpose Functions/constants***************************************/

  // Error messages
  const tooLong = "Tweets must be 140 character or under.";
  const emptyTweet = "Tweet cannot be empty.";

  // PORT number
  const PORT = 8080;

  // API endpoint for tweet POST and GET requests
  const endPoint = `http://localhost:${PORT}/tweets`;

  // Generate fontawesome icons from an array
  const generateIcons = (icons) => {
    const iconElems = icons.map((icon) => $("<i>").addClass(`fas fa-${icon}`));
    return iconElems;
  }

  const footerIcons = ["flag", "retweet", "heart"]; // Array of icons used in tweet footer
  const errorIcon = ["exclamation-triangle"]; // Icon used in error messages

  /***************************************Error handlers***************************************/

  const clearErrorMessage = () => $(".error-message").html("");

  const removeError = () => {
    clearErrorMessage();
    $(".error-wrapper").slideUp(); // Hide error message from view
  };

  const showError = (text) => {
    clearErrorMessage(); // Clear the message in the error
    const $errMessage = $("<div>").text(text);

    $(".error-message").append(generateIcons(errorIcon), $errMessage, generateIcons(errorIcon)).css("display", "flex");
    $(".error-wrapper").slideDown();
  };

  /***************************************Tweet submission handlers***************************************/

  // Create one single tweet article from a tweet object
  const createTweetElement = (tweet) => {
    const { user, content, created_at } = tweet;

    // Create the header
    const $image = $("<img>").attr("src", user.avatars);
    const $name = $("<div>").text(user.name);
    const $tweeterHandle = $("<div>").text(user.handle);
    const $header = $("<header>").append($image, $name, $tweeterHandle);

    // Create the text
    const $text = $("<div>").text(content.text);

    // Create footer
    const $timeAgo = $("<div>").text(timeago.format(created_at));
    const $icons = $("<div>").html(generateIcons(footerIcons));
    const $footer = $("<footer>").append($timeAgo, $icons);

    // Create article and append the header,text and footer
    const article = $("<article>").append($header, $text, $footer).addClass("tweet");

    return article;
  }

  const renderTweets = (data) => {
    $(".tweets").html(""); // Clear the text field once submission is successful

    // Create an article for each tweet object recieved from api
    const tweetsDisplay = data.reverse().map(tweet => createTweetElement(tweet));
    $(".tweets").append(tweetsDisplay); // Display tweets on screen
  };

  // Fetch all tweets from endpoint
  const getTweets = () => {
    $.get(endPoint).then((data) => renderTweets(data));
  };

  // Post user tweet to the endpoint
  const postTweet = (data) => {
    $.post(endPoint, data).then(() => getTweets());
  };

  // If the tweet is valid, make the post request, otherwise show error
  function tweetSubmitHandler(e) {
    e.preventDefault();
    const input = $(this).children("#tweet-text");

    if (!input.val()) return showError(emptyTweet); // Check for empty tweet form
    if (input.val().length > 140) return showError(tooLong); // Check for tweet with more than 140 chars

    // Valid tweet
    removeError();
    const queryString = $(this).serialize();
    postTweet(queryString);
    input.val(""); // Clear textfield
    $(this).children("footer").children(".counter").text(140); // Reset char counter to 140
  };

  $("#compose-form").submit(tweetSubmitHandler);

  /***************************************Form toggle events***************************************/

  const focusForm = () => {
    const $tweetText = $("#tweet-text");
    $tweetText.focus(); // Set cursor to textfield
  };

  const handleComposeClick = () => {
    $("#new-tweet").slideToggle();
    focusForm();
  };

  $(".compose").click(handleComposeClick); // Open/close from from view

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

  /***************************************Fetch tweets on visit***************************************/

  getTweets();
});

