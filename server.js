require('dotenv').config()
var express = require('express');
var app = express();
var router = express.Router({
    mergeParams: true
})
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

const Schema = require("./db/schema.js");
const LocationModel = Schema.LocationModel;
const UserModel = Schema.UserModel;

var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log(`location-tracking-app is listening on port ${port}`);
});

app.set("view engine", "hbs");

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    console.log(`Loading Main`);
    res.send(`Hello World!`);
})