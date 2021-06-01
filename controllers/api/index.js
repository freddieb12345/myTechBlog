//Centralise all the routes within an index.js file to export to the server
//Import dependencies
const router = require('express').Router(); //Connection to server
const userRoutes = require('./user-routes');
const postRoutes = require('./post-routes');
const commentRoutes = require('./comment-routes');
const { Model } = require('sequelize/types');

//Define paths to the routes for the api to use
router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments',commentRoutes);

module.exports = router;