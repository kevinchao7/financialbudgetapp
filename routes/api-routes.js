module.exports = (app,db,passport)=>{

  app.get("/",(req,res)=>{
    db.clients.findAll({}).then((results)=>{
      res.render('index' , {clients : results });
    });
  });

  app.get('/auth/google', passport.authenticate('google', { scope : ['profile','email'] } ) );

  app.get('/auth/google/callback', passport.authenticate('google',{ failureRedirect : '/signup/'} ),(req,res)=>{
    // successRedirect
    var userData = req.user.dataValues;
    // console.log(userData);
    res.render('login',{user : userData});
  });

  app.put('/api/setup',(req,res)=>{
    // console.log(req.body);
    db.clients.update(
      {
        monthly_income : req.body.income,
        job_title : req.body.job,
        phone_number : req.body.cell,
        current_savings : req.body.saving
      },
      {
        where:{ google_id :req.body.id }
      }).then((resp)=>{ res.redirect('/') });
  });

  app.post("/api/addClient",(req,res)=>{
    db.clients.create({
      client_name : req.body.name
    }).then((resp)=>{
      res.redirect('/');
    }).catch((err)=>{
      console.log('Error Message: ' + err.errors[0].message);
      res.status(400).redirect('/');
    });

  });

  app.delete('/:id',(req,res)=>{

    // db.burgers.destroy({
    //   where : { id : req.params.id}
    // }).then((resp)=>{res.redirect('/')});

  });
}

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
