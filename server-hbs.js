  const express = require('express');
  const hbs = require('hbs');
  const fs =require('fs');
  var app = express();
  
  const port = process.env.PORT || 3000; //Heroku is going to set PORT env variable. but when we run it on our local machine PORT wont be available so setting it to 3000
  hbs.registerPartials(__dirname+"/views/partial");
  app.set('view engine','hbs');
  app.use(express.static(__dirname+"/public")); // for static pages inside a folder Add the middleware
  
  //Middlewares are functions executed in the middle after the input/source then produces an output which could be the final output or could be used by the next middleware until the cycle is complete.
  app.use((req,res,next)=>{
	  var now = new Date().toString();
	  var log = `${now}:${req.method}: ${req.url}`;
	  fs.appendFile('server.log',log+'\n',(err)=>{
		  if(err){
			  console.log(`Unable to handle request`);
		  }
		  else{
			  console.log(log);
		  }
	  });
	  
	  next();
  }); //middleware is called before app.get handler. Untill we call next() it will not go to handler
  
  // app.use((req,res,next)=>{
	  // res.render('maintenance.hbs',{
		  // PageTitle:"Maintenance",
		  // Content:"The site is currently under maintenance",
		  // //CurrentYear:new Date().getFullYear()
	  // });
  // });
  
  //Middlewares are executed in the order they're called. As ap.use express.static middleware is called before maintence therefore static pages inside /public folder is loaded correctly
  
  hbs.registerHelper('GetCurrentYear',()=>{
	  return new Date().getFullYear();
  })
  hbs.registerHelper('screamIt',(text)=>{
	  return text.toUpperCase();
  })
  app.get('/about',(req,res)=>{
	  res.render('about.hbs',{
		  PageTitle:"About",
		  Content:"This is About Page",
		  //CurrentYear:new Date().getFullYear()
	  });
  });
    app.get('/',(req,res)=>{
	  res.render('home.hbs',{
		  PageTitle:"Home Page",
		  Content:"Welcome to my Home Pge",
		  //CurrentYear:new Date().getFullYear()
	  });
  });
    app.get('/challenge',(req,res)=>{
	  res.send("Challenge accepted!!");
  });
    app.get('/bad',(req,res)=>{
	  res.send({
		  Error:"Unable to handle the request"
	  })
  });
    app.get('/projects',(req,res)=>{
	  res.render('projects.hbs',{
		  PageTitle:"Projects",
		  Content:"This is Projects Page"
	  });
  });
  app.listen(port,()=>{
	  console.log(`Server is up on port ${port}`)
  });