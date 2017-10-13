const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

const db = require('./models');
db.sequelize.sync();
// db.sequelize.sync({ force : true }); // Forces server to drop db if exists and recreate it.

const app = express();
const port = process.env.PORT || 8080;
const passport = require( 'passport' );

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(methodOverride("_method"));
app.use( passport.initialize());
app.use( passport.session());

// Set Handlebars.
const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
require("./routes/api-routes.js")(app,db,passport);

app.listen(port);

// passport oauth 2 googlea
require("./config/passport.js")( passport, db.clients );


// app.get('/account', ensureAuthenticated, (req, res)=>{
//   res.render('account', { user: req.user });
// });
//
// app.get('/login', (req, res)=>{
//   res.render('login', { user: req.user });
// });
//
// function ensureAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) { return next(); }
//   res.redirect('/login');
// }
