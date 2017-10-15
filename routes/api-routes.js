module.exports = (app,db,passport)=>{

  const costAPI = require('./costAPI_route.js')(app,db,passport);
  costAPI.createRoutes('fixedcosts' , '/api/fixedcost');
  costAPI.createRoutes('flexspend'  , '/api/flexspend');
  costAPI.createRoutes('goals'      , '/api/goal');

  require('./client_route.js')(app,db);

  app.get('/auth/google', passport.authenticate('google', { scope : ['profile','email'] } ) );
  app.get('/auth/google/callback', passport.authenticate('google',{ successRedirect : '/profile/',failureRedirect : '/signup/'} )
  // ,(req,res)=>{
  //   var userData = req.user.dataValues;
  //   res.render('login',{user : userData});
  // }
  );
}
