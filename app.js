var express = require("express");

var app = express();

app.set("view engine", "ejs");

app.use(require("body-parser").urlencoded({ extended: true }));

app.set("port", process.env.PORT || 3000);

app.use("*/css", express.static("public/css"));
app.use("*/js", express.static("public/js"));
app.use("*/img", express.static("public/img"));
app.use("*/webfonts", express.static("public/webfonts"));

var names = "Login";
var links = "login"
var firebase = require("firebase");
var functions = require("firebase-functions");


var admin = require("firebase-admin");

var serviceAccount = require("./service.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://votify-5c0a0.firebaseio.com"
});


var firebaseConfig = {
  apiKey: "AIzaSyDApA3Zn0qE8he4DW5GRw0Vo_m7hXP3QJQ",
  authDomain: "votify-5c0a0.firebaseapp.com",
  databaseURL: "https://votify-5c0a0.firebaseio.com",
  projectId: "votify-5c0a0",
  storageBucket: "votify-5c0a0.appspot.com",
  messagingSenderId: "955581230081",
  appId: "1:955581230081:web:b56f87450bb461ff9b6400",
  measurementId: "G-8W97CPCNQN"
};
firebase.initializeApp(firebaseConfig);
var database = firebase.database();
const fs = require("fs");
const NewsAPI = require("newsapi");
const newsapi = new NewsAPI("c2edbe5a85dc4fcf8ae483e628050f3e");
const secretkey = "6LcEwcYUAAAAABweI1UGI9L4bSIvt7PFBt9X8WWq";

newsapi.v2
  .topHeadlines({
    category: "politics",
    language: "en",
    country: "in"
  })
  .then(response => {
    let data = JSON.stringify(response);
    fs.writeFile("news.json", data, err => {
      if (err) throw err;
      console.log("Data written to file");
    });
    /*
    {
      status: "ok",
      articles: [...]
    }
  */
  });


app.locals.newsdata = require("./news.json");

addToHeader = function (req, res, next) {
  console.log("add to header called ... " + req.url);
  res.header('X-XSS-Protection', '0');
  next();
}

app.get("/", addToHeader, function (req, res) {
  res.render("home", { names: names, links: links });
});
app.get("/news", addToHeader, function (req, res) {
  res.render("news", { names: names, links: links });
});
app.get("/castVote", function (req, res) {
  res.render("castVote", { names: names, links: links });
});

app.get("/login", addToHeader, function (req, res) {
  res.render("login", { names: names, links: links });
});

app.get("/register", addToHeader, function (req, res) {
  res.render("register", { names: names, links: links });

});

app.post('/castVote', function (req, res) {
  var id = req.body.ID;
  var name = req.body.name;
  var fname = req.body.fname;
  var add = req.body.address;
  var email = req.body.email;
  var dob = req.body.dob;
  vote = req.body.r1;
  var voter = database.ref('voter');
  var data = {
    name: name,
    fname: fname,
    add: add,
    id: id,
    email: email,
    dob: dob,
    vote: vote
  }
  voter.push(data);
  res.render("home", { links: links, names: names });
});

app.post('/', function (req, res) {
  var name = req.body.name;
  var subject = req.body.subject;
  var email = req.body.email;
  var phone = req.body.phone;
  var message = req.body.message;
  var cmessage = database.ref('cmessage');
  var data = {
    cname: name,
    csubject: subject,
    cemail: email,
    cphone: phone,
    cmess: message
  }
  cmessage.push(data);
  res.redirect('/');
  console.log(cmessage);
});


app.post("/register", addToHeader, function (req, res) {
  var email = req.body.email;
  var password = req.body.password;
  if (email.length < 4) {
    res.redirect("/register");
  }
  if (password.length < 4) {
    res.redirect("/register");
  }
  // Sign in with email and pass.
  // [START createwithemail]
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    // [START_EXCLUDE]
    if (errorCode == 'auth/weak-password') {
      res.redirect("/register");
    } else {
      res.render("home", { links: links, names: names });
    }
    console.log(error);
    // [END_EXCLUDE]
  });
  res.render("home", { links: links, names: names });
  console.log(email);
});

app.post("/login", addToHeader, function (req, res) {
  var password = req.body.password;
  var email = req.body.email;

  firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
    console.log(error);

  });

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      var email = user.email;
      var emailVerified = user.emailVerified;
      names = "Logout";
      links = "logout";
      res.setHeader(names, names);
      res.render("home", { links: links, names: names });

    } else {
      // User is signed out.
      // ...
      names = "Login";
      links = "login";
      res.render("home", { links: links, names: names });
    }
  });
});

app.get("/logout", addToHeader, function (req, res) {
  firebase.auth().signOut();
  names = "Login";
  links = "login";
  res.render("home", { links: links, names: names });
});


app.get("/results", function (req, res) {
  res.render("results", { links: links, names: names });
});

app.use(function (req, res, next) {
  console.log("looking for url" + req.url);
});

app.listen(app.get("port"), function () {
  console.log(
    "Express started on http://localhost:" +
    app.get("port") +
    " press Ctrl-C to terminate"
  );
});
