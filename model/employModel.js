const mongoose = require("mongoose");

const employSchema = new mongoose.Schema({
  First_name:String,
  Last_name:String,
  Email:String,
  Department:String,
  Salary:Number

});

const EmployModel = mongoose.model(
  "employ",
  employSchema
);

module.exports = {
EmployModel
};
