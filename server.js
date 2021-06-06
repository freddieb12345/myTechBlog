//Import dependancies
const routes = require('./controllers/'); //Importing routes from controllers file 
const express = require('express'); //Express.js server 
const sequilize = require('./config/connection'); //Connection to the sequilize database
const path = require('path'); //Importing path module
const helpers = require('./utils/helpers'); //Importing the handlebar helpers
const exphbs = require('express-handlebars'); //Importing handlebar templates for front end
const hbs = exphbs.create({ helpers}); // Initialize the handlebars
const session = require ('express-session'); //Import express session to handle cookies
require('dotenv').config() //Importing dotenv file for server login info
const SequelizeStore = require('connect-session-sequelize')(session.Store);//Import sequelizestore to save the session so the user can stay logged in between uses 

//Create the express session
const sess = {
    secret: 'secret',
    cookie: {maxAge: 7200000},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequilize
    })
};

//Create express app and connection PORT
const app = express();
const PORT = process.env.PORT || 3001;

//Creates the path for the server to the public directory for static files
app.use(express.static(path.join(__dirname, 'public')));

//Set handlesbarse to be the template engine for the server
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//parse JSON and string data withhin express
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

//Initialize the express session created above
app.use(session(sess));

//Attach routes to the path
app.use(routes);

//Connects to the database and then the server
sequilize.sync({ force: false }).then(() => { //force: false will maintain the data within the database and force: true will reset the database, clearing and updating any new values
    app.listen(PORT, () => console.log('Now listening on:' + PORT))
})
