const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app= express();

//Partials
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');

hbs.registerHelper('currentYear', () => {
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

//Middleware
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);

  fs.appendFile('server.log', log + '\n', (err) => {
    if(err){
      console.log('Unable to append to the file');
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintainance.hbs');
// });

//request
app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  })
});

app.get('/portfolio', (req, res) => {
  res.render('portfolio.hbs', {
    pageTitle: 'Portfolio Page',
    welcomeMessage: 'This is the portfolio page'
  })
});

//request
app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Hello, Welcome to the Home Page'
  });
});

//port binding
app.listen(port, () => {
  console.log(`server is up on port: ${port}`);
});
