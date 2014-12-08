# Group 1: Where The Fork Should I Go To Eat? (WTFSIGTE?)

## Brief Description:
We created this website as an improvement to the original “WTFSIGTE” website (http://wtfsigte.com). Our website helps a user find a place to eat based on location. By using this very simple and easy-to-use interface, the user may go through a list of restaurant options by adding the suggestion to their “Maybe” list, rejecting the suggestion, or filtering based on price, distance, or type of cuisine.

Our implementation of WTFSIGTE is better than the original because our user interface provides a more in-depth experience to the user. This new experience gives the user the ability to filter restaurants as we provide suggestions and illustrates a more useful environment for quickly finding a place to eat.

## Final Implementation:
The final implementation can be viewed at http://wtfsigte.herokuapp.com.

## What Works: 
The website accesses the user’s location either by entering it manually or allowing the browser to provide it.  Once the location is specified, we pull nearby restaurant suggestions using the Yelp API.  We have both Maybe and Block lists that allow users to be more specific in what they are searching for (i.e “I don’t forking want Mexican food would block all restaurants that serve Mexican food”).  Further filters allow them to specify if restaurants are too pricy or too far away.

## What Does Not Work:
Everything works as expected.

## How To Use Program:
To access WTFSIGTE, navigate to http://wtfsigte.herokuapp.com using any browser. Once the web page has been loaded, the browser will request the user to provide his/her location. Regardless of the user’s decision to share his/her location, the website will then begin to execute and provide suggestions of places to eat.
