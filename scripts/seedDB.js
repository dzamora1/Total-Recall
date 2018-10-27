const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/itemslist"
);

const itemSeed = [
  {
    keyword: "House",
    title: " House",
    image:
      "%public_URL%/house.jpg",
    date: new Date(Date.now())
  },
  {
    keyword: "Pet",
    title: " Buddy",
    image:
      "../public/buddy.jpg",
    date: new Date(Date.now())
  },
  {
    keyword: "Car",
    title: " Car",
    image:
      "../public/car.jpg",
    date: new Date(Date.now())
  },
];

db.Item
  .remove({})
  .then(() => db.Item.collection.insertMany(itemSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
