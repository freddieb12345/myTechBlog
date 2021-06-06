const { Comment } = require('../models');

const commentData = [
  {
    comment_text: "Hello Freddie",
    post_id: 1,
    user_id: 1
  },
  {
    comment_text: "Hello Dan",
    post_id: 2,
    user_id: 2
  },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;