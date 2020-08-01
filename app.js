var express = require('express');
var app = express();
var bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname));
// '__dirname' - Just references to the current directory path Ex) .../workspace/seanjr-personaltests/MyPersonalSite

//Requiring Routes
var colorPickerRoute = require('./routes/colorPicker.js');


//Imports Routes
app.use("/", colorPickerRoute);

app.listen(3420, function()
{
    console.log("Starting My Color Picking game...");
});