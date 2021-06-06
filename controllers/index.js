//Centralise all the routes within an index.js file to export to the server
//Import dependencies
const router = require('express').Router(); //Connection to the server
const apiRoutes = require('./api'); //Api routes folder
const homeRoutes = require('./home-routes.js'); //Homepage routes file
const dashboardRoutes = require('./dashboard-routes.js'); //Dashboard routes file

//Define api routes path for the server
router.use('./api', apiRoutes);

//Define homepage path for the server
router.use('./', homeRoutes);

//Define dashboard path for the server
router.use('./', dashboardRoutes);

//ends the connection if there is a 404 response status
router.use((req, res) => {
    res.status(404).end();
  });

module.exports = router;