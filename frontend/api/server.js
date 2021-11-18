const express = require("express");
//const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

var corsOptions = {
  origin: "http://localhost:"
}
app.use(cors(corsOptions));

// parse requests of content-type: application/json
app.use(express.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//app.post("/champion", (req,res) )

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Speakhire Backend :)" });
});

require("./routes/profile.routes.js")(app);
require("./routes/application.routes.js")(app);

// set port, listen for requests
app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});

/* 
app.get()
app.post()
app.put()
app.delete()


app.get('/', (req,res) => {
  res.send('Hello World');
});

app.listen(3000, () => console.log('listening on port 3000');
/*
app.use(express.json());

app.use('/api/chirps', apiRouter);

app.listen(process.env.PORT || '3036' , () => {
  console.log('server is running on port : ')
})
*/
