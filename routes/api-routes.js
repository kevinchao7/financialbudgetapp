// module.exports = (app,db)=>{
//
//   app.get("/",(req,res)=>{
//
//     db.burgers.findAll({}).then((results)=>{
//       res.render('index' , {burgers : results });
//     });
//
//   });
//
//   app.post("/",(req,res)=>{
//     db.burgers.create({
//       burger_name : req.body.name
//     }).then((resp)=>{
//       res.redirect('/');
//     }).catch((err)=>{
//       console.log('Error Message: ' + err.errors[0].message);
//       res.status(400).redirect('/');
//     });
//
//   });
//
//   app.delete('/:id',(req,res)=>{
//
//     db.burgers.destroy({
//       where : { id : req.params.id}
//     }).then((resp)=>{res.redirect('/')});
//
//   });
//
//   app.put('/:id',(req,res)=>{
//
//     db.burgers.update(
//       {
//         devoured : req.body.devoured
//       },
//       {
//         where    : { id : req.params.id }
//       }
//     ).then(()=>{res.redirect('/')})
//
//   });
//
// }

// var express = require("express");
//
// var router = express.Router();
//
// // Import the model (burger.js) to use its database functions.
// var burger = require("../models/burger.js");
//
// // Create all our routes and set up logic within those routes where required.
// router.get("/", function(req, res) {
//   burger.all(function(data) {
//     var hbsObject = {
//       burgers: data
//     };
//     console.log(hbsObject);
//     res.render("index", hbsObject);
//   });
// });
//
// router.post("/", function(req, res) {
//   burger.create([
//     "burger_name", "devoured"
//   ], [
//     req.body.name, 0 //never devoured when created
//   ], function() {
//     res.redirect("/");
//   });
// });
//
// router.put("/:id", function(req, res) {
//   var condition = "id = " + req.params.id;
//
//   console.log("condition", condition);
//
//   burger.update({
//     devoured: req.body.devoured
//   }, condition, function() {
//     res.redirect("/");
//   });
// });
//
// router.delete("/:id", function(req, res) {
//   var condition = "id = " + req.params.id;
//
//   burger.delete(condition, function() {
//     res.redirect("/");
//   });
// });
//
// // Export routes for server.js to use.
// module.exports = router;
