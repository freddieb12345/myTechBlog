const { User } = require('../models');

const userData = [
  {
    username: "Freddie",
    email: "freddie@gmail.com",
    password: "password1234"
  },
  {
    username: "dan",
    email: "dan@gmail.com",
    password: "password1234"
  },
  {
    username: "max",
    email: "max@gmail.com",
    password: "password1234"
  },
  {
    username: "tom",
    email: "tom@gmail.com",
    password: "password1234"
  },
  {
    username: "omar",
    email: "omar@gmail.com",
    password: "password1234"
  }
];

const seedUsers = () => User.bulkCreate(userData);

//  WARNING seed bulk create does NOT hash the password, so they must be hashed via the update route before the login route will work!

module.exports = seedUsers;