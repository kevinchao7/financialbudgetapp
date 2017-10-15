module.exports = (app,db,passport)=> {return {
  createRoutes : (table,route)=>{
    app.get(route,(req,res)=>{
      // Searches for user's fixed costs.
      console.log(route + ' requested by User ' + req.user + ' authenticated?=>' + req.isAuthenticated());
      if (req.user && req.isAuthenticated()) {
        var query = {};
        query.clientid = req.user;
        db[table].findAll({
          where: query,
          include: [db.clients]
        })
        .then((dbResp)=>{
          res.json(dbResp);
        });
      }
      else{
        ErrorMessage();
      }
    });

    app.delete(route + '/:id',(req,res)=>{
      if (req.user && req.isAuthenticated()){
        db[table].destroy({ where : { id : req.params.id, clientid : req.user } })
        .then((dbResp)=>{
          res.json(dbResp);
        });
      }
      else{
        ErrorMessage();
      }
    });

    app.put(route + '/:id',(req,res)=>{
      if(req.user && req.isAuthenticated()){
        db[table].update( { where : { id : req.params.id, clientid : req.user } })
        .then((dbResp)=>{
          res.json(dbResp);
        });
      }else{
        ErrorMessage();
      }
    });

    app.post(route,(req,res)=>{
      if(req.user && req.isAuthenticated()){
        const newItem = req.body;
        newItem.clientid = req.user;
        db[table].create(newItem).then((dbResp)=>{
          res.json(dbResp);
        });
      }else{
        ErrorMessage();
      }
    });
  }
}};


function ErrorMessage(){
  res.json({messaged: 'You are not logged in'});
}
