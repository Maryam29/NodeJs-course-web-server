  const express = require('express');
  var app = express();
  
  app.use(express.static(__dirname+"/public")); //----------for static pages---//
  app.get('/',(req,res)=>{
	  //res.send('<h1>Hello! Express</h1>');
	  res.send({
		  name:'Andrew',
		  likes:['Biking','Painting']
	  })
  });
  app.get('/about',(req,res)=>{
	  res.send({
		  desc:"Lives in Philadelphia"
	  })
  });
    app.get('/challenge',(req,res)=>{
	  res.send("Challenge accepted!!");
  });
    app.get('/bad',(req,res)=>{
	  res.send({
		  Error:"Unable to handle the request"
	  })
  });
  app.listen(3000);