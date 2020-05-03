const mongoose = require("mongoose");
const express = require("express");
const app = express();

mongoose
  .connect("mongodb://localhost:27017/myapp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log("DB CONNECTED");
  });

//using environmnet variable
const port = process.env.PORT || 7000;

app.listen(port, () => {
  console.log(`listening at ${port}`);
});
