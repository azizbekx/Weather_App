// Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();
/* Dependencies */
const bodyParser = require("body-parser");
/* Middleware*/
const cors = require("cors");
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
app.use(express.static("website"));
app.use(cors());

// Spin up the server
let projectData = {};
const port = 8000;
// Callback to debug
const server = app.listen(port, listening);

function listening() {
  console.log("server running...");
  console.log(`run on localhost:${port}`);
}
// Callback function to complete GET '/all'
app.get("/all", (req, res) => {
  res.send(projectData);
 
});

// Callback function to complete PUT '/addWeatherData'
app.post("/addWeatherData", (request, response) => {
  projectData.date = request.body.date;
  projectData.cityName = request.body.cityName;
  projectData.citySup = request.body.citySup;
  projectData.dayNight = request.body.dayNight;
  projectData.weatherIcon = request.body.weatherIcon;
  projectData.description = request.body.description;
  projectData.temperature = request.body.temperature;
  projectData.user_response = request.body.user_response;
  projectData.bgVideo = request.body.bgVideo;
  response.end();

});

