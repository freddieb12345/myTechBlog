//Import dependencies
const router = require('express').Router(); //Connection to server
const { Comment } = require('../../models');
const authorisation = require('../../utils/auth')