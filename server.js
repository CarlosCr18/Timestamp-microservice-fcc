// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();
// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...

function getDateObject(param) {
  let tempDate = new Date();
  let reg = /^\d+$/;
  let timeStamp;
  let natural;
  if (param.match(reg)) {
    console.log("only numbers", param);
    timeStamp = parseInt(param);
    natural = new Date(timeStamp).toUTCString();
  } else {
    tempDate = new Date(param);
    timeStamp = tempDate.valueOf();
    natural = tempDate.toUTCString();
  }

  if (!timeStamp) {
    return { error: "Invalid Date" };
  }

  console.log({ param, timeStamp, natural });
  let unixObject = { unix: timeStamp, utc: natural };
  console.log(unixObject);
  return unixObject;
}

app.get("/api/:data", (req, res) => {
  res.send(getDateObject(req.params.data));
});
app.get("/api/", (req, res) => {
  let tempDate = new Date();
  res.send({ unix: tempDate.valueOf(), utc: tempDate.toUTCString() });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
