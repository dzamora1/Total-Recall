const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  keyword: { type: String, required: true },
  title: { type: String, required: true },
  image: String,
  date: { type: Date, default: Date.now }
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
