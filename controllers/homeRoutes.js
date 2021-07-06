const router = require('express').Router();
const sequelize = require('../config/connection.js');
const { Article, User, Comment } = require('../models');


router.get('/', (req,res) => {
    Article.findAll({ 
        attributes: ["id", "title", "content", 'created_at'], 
    include: [
        {model: Comment, 
            attributes: ['id','article_id', 'user_id', 'content', 'created_at'], 
        include: {model: User,
        attributes: ['username']}
    },
    {model: User, attributes: ['username']}
]})
.then(articleData => {
    const articles = articleData.map(article => article.get({plain: true}));
    res.render('homepage', {
        articles,
        logged_in: req.session.logged_in
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})
});










module.exports = router;