module.exports = (app,db,passport)=>{

  const costAPI = require('./costAPI_route.js')(app,db,passport);
  costAPI.createRoutes('fixedcosts' , '/api/fixedcost');
  costAPI.createRoutes('flexspend'  , '/api/flexspend');
  costAPI.createRoutes('goals'      , '/api/goal');

  require('./client_route.js')(app,db);

  app.get('/auth/google', passport.authenticate('google', { scope : ['profile','email'] } ) );
  app.get('/auth/google/callback', passport.authenticate('google',{ successRedirect : '/profile/',failureRedirect : '/profile/'} )
  // ,(req,res)=>{
  //   var userData = req.user.dataValues;
  //   res.render('login',{user : userData});
  // }
  );
  app.get('/profile/',(req,res)=>{
    console.log('User '+ req.user +' authenticated? => '+req.isAuthenticated());
    if(req.isAuthenticated()){
      db.clients.findOne({where:{id : req.user}}).then((resp)=>{
        res.render('login',{ user : resp});
      });
    }else{
      res.json({message:'You are not logged in.'});
    }
  });
}
