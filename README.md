# Tweeter Project

Tweeter is a simple, single-page Twitter clone.

## Main Features

Tweeter allows users to post tweets that are 140 characters or shorter.

The following features are implemented.

* When a user clicks the compose button on the nav bar, a form slides out and the textarea is focused. If the form is already visible, it will slide back up.

* A character counter will let the user know if their tweet is over the word limit by showing the amount of words remaining. If the tweet is over the word limit, the color of the character counter will change to red.

* When the user scrolls down the list of tweets, the compose button dissapears and a second toggle button appears in the bottom right corner. Pressing this button will scroll up to the top of the page, open the form, focus on the textarea, and then dissapear

* When a user submits a tweet, an error message will slide down if the tweet is too long or empty

 The following methods were used to accomplish the various animations and transitions in tweeter.

* CSS transitions
  * hover effects on buttons and tweets
* CSS animations (keyframes)
  * compose button arrow translates up and down infinitely
* jQuery animations
  * sliding forms and error messages up/down
  * fading buttons in and out

## Final Product

!["Toggling the form and displaying error message"](https://github.com/navara99/tweeter/blob/master/docs/form-toggle.gif)

!["Scrolling down the feed on a wide screen"](https://github.com/navara99/tweeter/blob/master/docs/widescreen-scrolling.gif)

!["Scrolling down the feed on a narrow screen"](https://github.com/navara99/tweeter/blob/master/docs/narrow-screen-scrolling.gif)

## Getting Started

1.  Clone the repository

```git clone git@github.com:navara99/tweeter.git```

2.  Install all dependencies

````npm install````

3.  Run the development web server 

```npm run local```

4.  Visit http://localhost:8080/

## Dependencies

*  Express
*  Node 5.10.x or above
*  chance
*  md5
*  body-parser

## DEV Dependencies

* nodemon
* sass 
