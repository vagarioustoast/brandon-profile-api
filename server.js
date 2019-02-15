// require express and other modules
const express = require("express");
const app = express();
const db = require("./models");

// parse incoming urlencoded form data
// and populate the req.body object
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

// allow cross origin requests (optional)
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

/************
 * DATABASE *
 ************/

// const db = require('./models');

/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static("public"));

/*
 * HTML Endpoints
 */

app.get("/", function homepage(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

/*
 * JSON API Endpoints
 */

app.get("/api", (req, res) => {
  // TODO: Document all your api endpoints below as a simple hardcoded JSON object.
  // It would be seriously overkill to save any of this to your database.
  // But you should change almost every line of this response.
  res.json({
    woopsIForgotToDocumentAllMyEndpoints: true, // CHANGE ME ;)
    message: "Welcome to my personal api! Here's what you need to know!",
    documentationUrl:
      "https://github.com/vagarioustoast/express-personal-api/README.md",
    baseUrl: "http://boiling-coast-49314.herokuapp.com",
    endpoints: [
      {
        method: "GET",
        path: "/api",
        description: "Describes all available endpoints"
      },
      { method: "GET", path: "/api/profile", description: "This is about me." },
      {
        method: "GET",
        path: "/api/projects",
        description: "View some of the projects I've worked on."
      },
      {
        method: "POST",
        path: "/api/books",
        description: "Creates books."
      },
      {
        method: "POST",
        path: "/api/shows",
        description: "Creates shows."
      }
    ]
  });
});
// Profile
app.get("/api/profile", (req, res) => {
  // My Profile
  let profile = {
    name: "Brandon",
    githubUsername: "vagarioustoast",
    githubLink: "https://github.com/vagarioustoast",
    githubProfileImage:
      "https://avatars2.githubusercontent.com/u/30280640?s=400&v=4",
    personalSiteLink:
      "https://github.com/vagarioustoast/vagarioustoast.github.io",
    currentCity: "Oakland, CA",
    pets: [
      { name: "Pansy", species: "Dog", age: 4 },
      { name: "Deadpool", species: "Fish", age: 1 },
      { name: "Ben", species: "Dog", age: 2 }
    ]
  };
  // Send this profile
  res.send(JSON.stringify(profile));
});

// Projects
app.get("/api/projects", (req, res) => {
  let projects = [
    {
      name: "Wonder Comic App",
      techUsed: ["HTML", "CSS", "JavaScript", "AJAX", "Firebase"],
      link: "https://wonderizecomic.firebaseapp.com/"
    }
  ];
  res.send(JSON.stringify(projects));
});

// Books
app.get("/api/books", (req, res) => {
  // Gets all books
  db.Book.find({}, (err, foundBooks) => {
    if (err) return console.error(err);
    // returns as JSON
    res.json(foundBooks);
  });
});

app.get("/api/books/:id", (req, res) => {
  db.Book.findOne({ _id: req.params.id }, (err, foundBook) => {
    if (err) return console.error(err);
    res.json(foundBook);
  });
});

app.put("/api/books/:id", (req, res) => {
  const bookId = req.params.id;
  db.Book.findOneAndUpdate({ _id: bookId }, req.body, { new: true })
    .populate("book")
    .exec((err, updatedBook) => {
      if (err) return console.error(err);

      res.json(updatedBook);
    });
});

// SHOWS //
app.get("/api/shows", (req, res) => {
  // get all shows
  db.Show.find({}, (err, foundShows) => {
    // if something goes wrong...
    if (err) return console.error(err);

    // return as json
    res.json(foundShows);
  });
});

app.get("/api/shows/:id", (req, res) => {
  db.Show.findOne({ _id: req.params.id }, (err, foundShow) => {
    if (err) return console.error(err);
    res.json(foundShow);
  });
});

app.put("/api/shows/:id", (req, res) => {
  db.Show.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .populate("show")
    .exec((err, updatedShow) => {
      if (err) return console.error(err);
      res.json(updatedShow);
    });
});

/**********
 * SERVER *
 **********/

// listen on the port that Heroku prescribes (process.env.PORT) OR port 3000
app.listen(process.env.PORT || 3000, () => {
  console.log("Express server is up and running on http://localhost:3000/");
});
