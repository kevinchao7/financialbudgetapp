module.exports = (app,db) =>{
  app.get('/api/client/:clientid',(req,res)=>{
    db.clients.findOne({ where : {id : clientid}).then( (dbResp)=>{ res.json(dbResp) } );
  });
  app.put('/api/client',(req,res)=>{
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
  app.post("/api/client",(req,res)=>{
    db.clients.create({
      client_name : req.body.name
    }).then((resp)=>{
      res.redirect('/');
    }).catch((err)=>{
      console.log('Error Message: ' + err.errors[0].message);
      res.status(400).redirect('/');
    });
  });
}
