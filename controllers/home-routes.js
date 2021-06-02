//Import dependancies 
const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

//Rendering the home page
router.get('/', (req, res) => {
    Post.findAll({
        attributes: [
            'id',
            'post_text',
            'title',
            'created_at',
        ],
        order:[['created_at', 'DESC']], //Order from most to least recent
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text','post_id', 'user_id','created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
    .then(dbPostData => {
        const posts = dbPostData.map(post => post.get({plain: true})); //Plain: true removes sequelize meta data, serializing the post data
        res.render('homepage', {
            posts,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//Route to find post by ID
router.get('/post/:id', (req,res) => {
    Post.findOne({
        where: {
            id:req.params.id
        },
        attributes: [
            'id',
            'post_text',
            'title',
            'created_at',
        ],
        include: [
            {
                model:User,
                attributes: ['username']
            },
            {
                model:Comment,
                attributes: ['id','comment_text','post_id','created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
    .then(dbPostData => {
        if(!dbPostData) {
            res.status(404).json({ message: 'No post found with this ID'});
            return;
        }
        const post = dbPostData.get({ plain: true }); //Plain: true removes sequelize meta data, serializing the post data
        res.render('single_post', {
            post,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => { //return server errors
        console.log(err);
        res.status(500).json(err);
    });
});

//Render login page 
router.get('/login', (req,res) => {
    if(req.session.loggedIn) { //Redirect to home page if the user is logged in
        res.redirect('/')
        return;
    }
});

//Render sign up page
router.get('/signup', (req,res) => {
    if(req.session.loggedIn) {
        res.redirect('/')
        return;
    }
    res.render('signup');
});

module.exports = router;
