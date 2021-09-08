const express = require("express");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());
app.use(bodyParser.json());
//Activating Cors after server 500 error
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("");
  next();
});

// The RecursiveFunction answer
const RecursiveFunction = (num) => {
  let results = [];

  num % 2 === 0 ? results.push(num / 2) : results.push(num * 3 + 1);

  const actualResult = results[results.length - 1];

  if (actualResult != 1) {
    results = [...results, ...RecursiveFunction(actualResult)];
  }
  return results;
};

// The nonRecursive answer
const nonRecursive = (n) => {
  let results = [];
  let count;
  while (n > 1) {
    n % 2 === 0 ? results.push((n = n / 2)) : results.push((n = n * 3 + 1));
    count++;
  }
  return results;
};

app.get("/api", (req, res) => {
  res.json({ message: "hello from the server " });
});
app.post("/api", (req, res) => {
  const { data } = req.body;

  const answerWithRecursion = RecursiveFunction(data);
  const answerwithoutRecursion = nonRecursive(data);

  return res.json({
    WithRecursion: answerWithRecursion,
    WithoutRecursion: answerwithoutRecursion,
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
