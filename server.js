var express = require("express");
var app = express();

var ml = require("ml-sentiment")(); //calling the machine learning sentiment analysis library
var redditComments = require("./comments.json"); //loading the json file to be read and rendered on our page


//Define Sentiment Scores 
redditComments.forEach(function(comment) {
  comment.sentiment = ml.classify(comment.body);
  if (comment.sentiment >= 5) {
    comment.emoji = "😃";
  } else if (comment.sentiment > 0) {
    comment.emoji = "🙂";
  } else if (comment.sentiment == 0) {
    comment.emoji = "😐";
  } else {
    comment.emoji = "😕";
  }
});

//Define routes in Express to send the source data in a webpage
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/data", function(req, res) {
  res.json(redditComments);
});


const listener = app.listen(3000, function() {
  console.log("NodeJS app is listening on port " + listener.address().port);
});
