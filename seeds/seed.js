const sequelize = require('../config/connection');
const { Article, Comment, User } = require('../models');

const articleData = require('./articleSeed.json');
const commentData = require('./commentSeed.json');
const userData = require('./userSeed.json');

  
  const seedDatabase = () => {
    return sequelize.sync({ force: true }).then(() => {
      User.bulkCreate(userData, { individualHooks: true, returning: true,}).then(() => {
        Article.bulkCreate(articleData).then(() => {
            Comment.bulkCreate(commentData).then(() => {
                console.log('All Seeds Planted');
              });
            });
      });
    })
  
    
    process.exit(0);
  };

seedDatabase();
