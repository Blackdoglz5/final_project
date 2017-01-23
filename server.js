 const config = require('./package');
 const express = require('express');
 const logger = require('morgan');
 const bodyParser = require('body-parser');
 const mongoose = require('mongoose');
 const Routes = require('./routes/routes.js');
 const request = require('request');
 const colors = require('colors');
//  const secrets = require('./secrets');
//  const cookie_secrets = require('./cookie_secrets');
 const app = express();
 
 
 const PORT = process.env.PORT || 3000;
 
 
 //****************** Connect to database **********************
 mongoose.connect('mongodb://localhost/finalproj', (error)=>{
     if(error) {
         console.log("Error connecting to database!");
     } else {
         console.log("Connected to database!".yellow.bold);
     }
 });
 
 
 
 //****************** Client Sessions ****************
 var sessions = require('client-sessions')({
    cookieName: config.name,
    secret: cookie_secrets,
    requestKey: 'session',
    duration: (86400 * 1000) * 7,
     cookie: {
            ephemeral: false,
            httpOnly: true,
            secure: false
     }
 });
 
 
 //****************** Middleware ******************
 
 app.use(
    logger('dev'),
    sessions,
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true })
 );
 app.use(express.static('public'));
 
 //***************session counter ********************
 app.use((req, res, next)=>{
     if(req.session.uid){    
         req.session.counter++;
     } else {
         req.session.counter = 0;
     }  
     console.log("Session counter: ", req.session.counter);
     next();
 });
 
 //****************** Routing ***********************
 
 Routes(app);
 
 //********************* API requests ******************
 app.get('/api/search', function(req,res){
     console.log(req.query);
     request("http://api.brewerydb.com/v2/search?q="+ req.query.q + "&key=" + secrets + "&withBreweries=y&withLocations=y&withAlternateNames=y&withIngredients=y&type=beer", function(err, response, body) {
         res.send(body); // send the body (beer data) to the client
     });
 });

 app.get('/api/beers', function(req,res){
     console.log(req.query);
     request("http://api.brewerydb.com/v2/search?key="+ secrets + "&withBreweries=y&withLocations=y&withAlternateNames=y&withIngredients=y&type=beer" + req.query.q, function(err, response, body) {
         res.send(body); // send the body (beer data) to the client
     });
 });
 app.get('/api/brewery/:breweryId/beers', function(req,res){
     console.log(req.query);
     request("http://api.brewerydb.com/v2/brewery/" + req.params.breweryId + "/beers?key=" + secrets + "&withBreweries=y&withIngredients=y", function(err, response, body) {
         res.send(body); // send the body (beer data) to the client
     });
 });
 app.get('/api/breweries', function(req,res){
     console.log(req.query);
     request("http://api.brewerydb.com/v2/breweries?key="+ secrets + "&name=" + req.query.name, function(err, response, body){
         res.send(body);
     });
 });
 //****************** Check Server Connection **************************
 app.listen(PORT, (error)=>{
     if(error) {s
         console.log("Error starting server!");
     } else {
         console.log("Server started on port: ", PORT);
     }
 })