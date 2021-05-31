//Import dependencies
const Sequelize = require ('sequelize'); //Importing the sequelize constructor
require('dotenv').config(); //Import the dotenv file for the username and password for the server

let sequelize; //Create sequelize variable

//Giving the required process.env to sequilize depending on whether or not the server is launched through the JawsDB sql addon
if (process.env.JAWSDB_URL) {
    sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
    sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306
    });
}

module.exports = sequelize;