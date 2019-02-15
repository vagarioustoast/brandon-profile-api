// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

// const db = require('./models');

// const new_campsite = {description: "Sharp rocks. Middle of nowhere."}

// db.Campsite.create(new_campsite, function(err, campsite){
//   if (err){
//     return console.log("Error:", err);
//   }

//   console.log("Created new campsite", campsite._id)
//   process.exit(); // we're all done! Exit the program.
// })
const db = require("./models");

let measureForMeasureBook = {
  title: "Measure for Measure",
  author: "William Shakespeare"
};

let showList = [
  {
    title: "The Sopranos",
    seasons: 6
  },
  {
    title: "Hell on Wheels",
    seasons: 5
  }
];

db.Show.create(showList, (err, newShow) => {
  if (err) return console.error(err);
  console.log(newShow);
});

// db.Book.create(measureForMeasureBook, (err, newBook) => {
//   if (err) return console.error(err);

//   console.log(newBook);
// });
