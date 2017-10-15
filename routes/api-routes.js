const costAPI = require('./costAPI_route.js');
module.exports = (app,db,passport)=>{


  costAPI.createRoutes(app,db,'fixedcosts','/api/fixedcost');
  costAPI.createRoutes(app,db,'flexspend' ,'/api/flexspend');
  costAPI.createRoutes(app,db,'goals'      ,'/api/goal');
  require('./client_route.js')(app,db);


  app.get('/auth/google', passport.authenticate('google', { scope : ['profile','email'] } ) );

  app.get('/auth/google/callback', passport.authenticate('google',{ failureRedirect : '/signup/'} ),(req,res)=>{
    // successRedirect
    var userData = req.user.dataValues;
    // console.log(userData);
    res.render('login',{user : userData});
  });
}
