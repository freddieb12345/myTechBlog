//Import all modules
const routes = require('./controllers');
const express = require('express');
const sequilize = require('./config/connection');
const path = require('path');
const helpers = require('./utils/helpers');
const exphb = require('express-handlebars');
const hbs = exphbs.create({ helpers});
const session = require ('express=session');

//Create express app and connection PORT
const app = express();
const PORT = process.env.PORT || 3001;