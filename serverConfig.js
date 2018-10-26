const hbs = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');
const validator = require('express-validator');
const handlebars = require('handlebars');
const cookieParser = require('cookie-parser');
const express = require('express');

module.exports = function(app){
    app.engine('hbs', hbs({
        extname: 'hbs',
        defaultLayout: 'layout',
        layoutsDir: __dirname + '/views/layouts',
        partialsDir: __dirname + '/views/partials'
    }));
    
    app.set('view engine', 'hbs');
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(express.static(__dirname + '/public'));
    app.use(cookieParser());
    
    app.use(session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    }));
    
    app.use(validator({
        errorFormatter: function (param, message, value) {
            var namespace = param.split('.'),
                root = namespace.shift(),
                formParam = root;
    
            while (namespace.length) {
                formParam += '[' + namespace.shift() + `]`;
            }
    
            return {
                param: formParam,
                message: message,
                value: value
            }
        }
    }))
    app.use(flash());
}