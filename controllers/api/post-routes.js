//Import dependencies
const router = require('express').Router(); //Connection to server
const { User, Post, Comment } = require('../../models');
const sequelize = require('../../config/connection');
const authorisation = require('../../utils/auth');

router.get('/', (req, res) => {
    Post.findAll({
        //Define the query information
        attributes: [
            'id',
            'post_text',
            'title',
            'created_at',
          ],
       
        order: [[ 'created_at', 'DESC']], // Order the posts from most to least recent
        include: [
            {
                model: User,
                attributes: ['username'] //Inlcude the username from the User model table
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'], //Include all comment data from comment table 
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
    .then(dbPostData => res.json(dbPostData)) // return the posts
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


//GET route to get a single post by its id
router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'post_text',
            'title',
            'created_at',
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text','post_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
        .then(dbPostData => {
            if(!dbPostData) {
                res.status(404).json({ message: 'No post found with this id'});
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//POST route to create a new route
router.post('/', authorisation, (req, res) => {
    Post.create({
        title: req.body.title,
        post_text: req.body.post_text,
        user_id: req.session.user_id
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//PUT route to update a post's title or text
router.put('/:id', authorisation, (req,res) => {
    Post.update(req.body,
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(dbPostData => {
        if(!dbPostData) {
            res.status(404).json({ message: 'No post found with this id'});
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    });
});

// DELETE api/posts/1 -- delete a post
router.delete('/:id', withAuth, (req, res) => {
    Post.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

module.exports = router;