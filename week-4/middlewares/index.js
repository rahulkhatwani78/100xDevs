const express = require("express");
const app = express();

const PORT = 3000;

const isOldEnough = (req, res, next) => {
  const age = req?.query?.age;
  console.log(age);
  if (!age) {
    res.status(411).send({
      msg: "Please specify your age",
    });
  } else if (age < 14) {
    res.status(411).send({
      msg: "You are not old enough to ride on this",
    });
  } else {
    next();
  }
};

app.use(isOldEnough);

app.get("/ride1", (req, res) => {
  res.send({
    msg: "You have successfully riden the ride1",
  });
});

app.get("/ride2", (req, res) => {
  res.send({
    msg: "You have successfully riden the ride2",
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on port`, PORT);
});
