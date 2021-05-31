//Install dependencies
const router = require('express').Router(); //Importing express server
const sequelize = require('../config/connection'); //Import sequelize database
const { Post, User, Comment } = require('../models'); //Import models 
const authorisation = require('../utils/auth');//Import authorisation module to redirect unauthorised users to the login page

//Route for dashboard page render 
router.get('/', authorisation, (req, res) => {
    //Find all posts from user from the database
    Post.findAll({
        where: {
            user_id: req.session.user_id //use this sessions ID
        },
        attributes: [
            'id',
            'post_text',
            'title',
            'created_at',
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    modeul: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbPostData => { //Serialize the data
        const posts = dbPostData.map(post = post.get({ plaing:true}));
        res.render('dashboard', {posts, loggedIn: true});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//Creates a route allowing user to edit post
router.get('/edit/id', authorisation, (req,res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'post_text',
            'title',
            'created_at'
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'commnent_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
            
        ]
    })
    .then(dpPostData => { //return error if no post exists wit that id
        if (!dpPostData) {
            res.status(404).json({ message: 'No post exists with that id:'});
            return;
        }
        const post = dpPostData.get({ plain: true});
        res.render('edit-post', { post, loggedIn: true});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Creates a route allowing for the edit of the logged in user
router.get('/edituser', authorisation, (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.session.user_id
        }
    })
    .then(dbUserData => {
        if(!dbUserData) {
            res.status(404).json({message: 'No user found with this id'});
            return;
        }
        const user =dbUserData.get({ plain: true });
        res.render('edit-user', {user, loggedIn: true});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router;