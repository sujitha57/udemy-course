const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'html');

app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    var currentTime = new Date().toString();
    var log = `${currentTime}: ${req.method} ${req.url}`
    console.log(log);
    fs.appendFile('server.log', log + '\n',(err) => {
        if(err){
            console.log("unable to open server.log");
        }
    })
    next();
});

// this middleware will not allow the request to go beyond it

/*app.use((req, res, next) => {
    res.render('maintenance.hbs');
    next();
});*/


hbs.registerHelper('currentYear', ()=>{
   return new Date().getFullYear()
    //return 'test';
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})

app.get('/about', (req, res) => {
    res.render('about.hbs',{
        pageTitle: 'About page',
        welcomeMessage: 'Welcome to the about page',
    });
});

app.get('/', (req, res) => {
    res.render('home.hbs',{
        pageTitle: 'Home page',
        welcomeMessage: 'Welcome to the home page',
    })
});
app.get('/help', (req, res) => {
    //res.send('Unable to find the page');
    res.render('help.html');
});

app.listen(5000);