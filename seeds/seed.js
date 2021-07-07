const sequelize = require('../config/connection');
const { Article, Comment, User } = require('../models');

const seedArticle = require('./articleSeed.json');
const seedComment = require('./commentSeed.json');
const seedUser = require('./userSeed.json');

const seedAll = async () => {
    await sequelize.sync({ force: true });
  
    await seedArticle();
  
    await seedComment();

    await seedUser();
  
    process.exit(0);
  };
  
  seedAll();
  