//Import dependencies
const router = require('express').Router(); //Connection to server
const { Comment } = require('../../models');
const authorisation = require('../../utils/auth');

//GET comments route
router.get('/', (req, res) => {
    Comment.findAll()
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//POST comments route
router.post('/', authorisation, (req,res) => {
    if(req.session) {
        Comment.create({
            comment_text:req.body.comment_text,
            post_id: req.body.post_id,
            user_id: req.session.user_id
        })
            .then(dbCommentData => res.json(dbCommentData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    }
});

//DELETE comments route
router.delete('/:id', authorisation, (req, res) => {
    Comment.destroy({
        where:{
            id: req.params.id
        }
    })
    .then(dbCommentData => {
        if(!dbCommentData) {
            res.status(404).json({ message: 'No comment found with this id'});
            return;
        }
        res.json(dbCommentData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;