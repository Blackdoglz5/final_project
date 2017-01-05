// bring in the route handler functions so we can reference them in the route definitions 
var API = require('../controllers/api.js');
var Auth = require('./auth')
// export a function here that takes in an app object, this way we can require this file in the server and call the function passing in our express app object
module.exports = (app)=>{

    app.get('/', (req, res)=>{
        res.sendFile("index.html", {root: "./public/html/"});
    });
    app.get('/register', (req, res)=>{
        res.sendfile("register.html", {root: "./public/html/"});
    });
    // app.get('/beerPanel/', (req, res)=>{
    //     res.sendfile("beerPanel.html", {root: "./public/html/"});
    // });
    app.get('/logout', Auth.logout);
    app.post('/login', Auth.login);
    app.post('/register', Auth.register);
}