// Dependencies
const express = require('express');
const app = express();
const fs = require('fs');

// Port
const port = 3000;

// View Engine
const hbs = require('hbs');

// Templates
hbs.registerPartials(__dirname + '/views/partials')

// Use View Engine
app.set('view engine','hbs');


// Helpers
hbs.registerHelper('getYear', () => {
    return new Date().getFullYear();
})

/**
 * @param {string} - text
 */
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})


app.use((req,res,next) => {
    let now = new Date().toString();
    let log = `${now} : ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err) throw err;
        console.log('The log was appended to the file: ' + log);
    })
    next();
})

/* app.use((req,res,next) => {
    res.render('maintenance', {
        title: 'Maintenance',
        message: 'Site is being updated'
    });
}) */

// Deliver static files in public directory.
app.use(express.static(__dirname + '/public'))

/**
 * Represents Index File
 * @param {string} "/" - Route 
 * @param {function} - callback
 */

 app.get('/', (req,res) => {
    res.render('index', {
        title: 'Homepage',
        welcome: 'Welcome home',
    })
 })


// Router - About - req, res order do matter
app.get('/help', (req,res) => {
    // Render is built in and find file in views directory
    res.render('about', {
        title: 'Help Site',
    });
})

app.get('/maintenance', (req,res) => {
    // Render is built in and find file in views directory
    res.render('maintenance', {
        title: 'Maintenance',
        message: 'Site is being updated'
    });
})

// Start Node Server
app.listen(port);