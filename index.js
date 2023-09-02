const express = require("express");
const bodyParser = require("body-parser");
const app = express();
var items = ["task1"];

app.use(bodyParser.urlencoded({ extended: true })); //This is used for using the post request where the req.body.username is used if this is not present that wont work

app.set("view engine", "ejs"); // for ejs script to work, set the ejs in a folder called views and in that create the ejs file

app.use(express.static("public")); //by default express only have access to the index.js and the views folder and when you just include css like u normally do it wont work, therefore we use this where the css is in the public folder

app.get("/", function(req, res) {
  var today = new Date();
  var currentDay = today.getDay();
  var day = "";

  var options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };

  var day = today.toLocaleDateString("en-US", options);

  res.render("list", { kindOfDay: day, newResponse: items }); //so it goes renders the list.ejs and looks for the variable named kindOfDay in that file
                                                              //and replaces it with day same goes to new
});

app.post("/", (req, res) => {
  //post request takes 2 parameters that is req and response
  var item = req.body.username;
  items.push(item);
  res.redirect("/"); //when the server loads it goes to app.get and therefore when we post it wont get rendered in the app.get, that is why we use redirect due to which it goes to app.get and in that we added one more parameter in the res.render
});

app.listen(3001, function() {
  console.log("server has been started");
});
