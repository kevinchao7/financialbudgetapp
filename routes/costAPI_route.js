module.exports = {
  createRoutes : (app,db,table,route)=>{
    app.get(route,(req,res)=>{
      // Searches for user's fixed costs.
      // console.log(JSON.stringify(req,null,4));
      if (req.query.clientid) {
        var query = {};
        query.clientid = req.query.clientid;
        db[table].findAll({
          where: query,
          include: [db.clients]
        })
        .then((dbResp)=>{
          res.json(dbResp);
        });
      }
      else{
        console.log('You did not enter a id.');
        res.end();
      }
    });

    app.delete(route + '/:id',(req,res)=>{
      db[table].destroy({ where : { id : req.params.id } })
      .then((dbResp)=>{
        res.json(dbResp);
      });
    });

    app.put(route + '/:id',(req,res)=>{
      db[table].update( { where : { id : req.params.id } })
      .then((dbResp)=>{
        res.json(dbResp);
      });
    });

    app.post(route,(req,res)=>{
      db[table].create(req.body).then((dbResp)=>{
        res.json(dbResp);
      });
    });
  }
}
