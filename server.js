var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");

var db = require('./models');
// db.sequelize.sync({ force : true }); // Forces server to drop db if exists and recreate it.
db.sequelize.sync();

var app = express();
var port = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(methodOverride("_method"));

// Set Handlebars.
const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
require("./routes/api-routes.js")(app,db);

app.listen(port);
