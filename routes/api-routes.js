
module.exports = (app,db,passport)=>{

  const costAPI = require('./costAPI_route.js');

  costAPI.createRoutes(app,db,'fixedcosts','/api/fixedcost');
  costAPI.createRoutes(app,db,'flexspend' ,'/api/flexspend');
  costAPI.createRoutes(app,db,'goals'      ,'/api/goal');

  // app.get('/api/fixedcost',(req,res)=>{
  //   var query = {};
  //   if (req.query.clientid) {
  //     query.clientid = req.query.clientid;
  //   }
  //   db.fixedcosts.findAll({
  //     where: query,
  //     include: [db.clients]
  //   }).then(function(dbResp) {
  //     res.json(dbResp);
  //   });
  // });

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
