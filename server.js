const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
require("./app/routes/turorial.routes")(app);
app.use(cors())
const db = require("./app/models");

db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
  });
  

var corsOptions = {
  origin: "http://localhost:8081",
  methods: [
    'GET',
    'POST',
  ],

  allowedHeaders: [
    'Content-Type',
  ],
};
app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8081');
  res.json({ message: "Welcome to the application." });
});

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
}); 

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});