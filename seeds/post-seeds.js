const { Post } = require('../models');

const postData = [
  {
    title: 'Hello',
    post_text: 'My name is Freddie',
    user_id: 1,
  },
  {
    title: 'Hello',
    post_text: 'My name is dan',
    user_id: 2,
  },
]

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
