const express = require("express");
//const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const path = __dirname + '../server/views/';

app.use(express.static(path));
var corsOptions = {
  origin: "http://localhost:4200"
}
app.use(cors(corsOptions));

// parse requests of content-type: application/json
app.use(express.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//app.post("/champion", (req,res) )

// simple route
app.get('/', function (req,res) {
  res.sendFile(path + "index.html");
});

require("./server/routes/profile.routes.js")(app);
require("./server/routes/application.routes.js")(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
