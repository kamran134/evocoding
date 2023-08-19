const express = require('express');
const { engine } = require("express-handlebars");
const mongoose = require("mongoose");
const main = require('./routes/main.js');
const bodyParser = require('body-parser');
const fileUpload = require('./node_modules/express-fileupload/lib/index');

const [app, port] = [express(), 3000];

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

mongoose.connect('mongodb://localhost:27017/evo')
    .then(() => console.log('Db Connected!'));

//? Handlebars
app.use(fileUpload());
app.use(express.static('public'));
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');
app.use('/', main);

//! Routes
// Home

app.listen(port, () => console.log(`Your port is ${port}`))