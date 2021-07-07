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
    // res.render('homepage', {
    //     articles,
    //     logged_in: req.session.logged_in
    // })
    // .catch(err => {
    //     console.log(err);
    //     res.status(500).json(err);
    // })
    res.json(articles)
})
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }else{
        res.render('login');
    }
});


router.get('/article/:id', (req, res) => {
    Article.findOne({
        where: {id: req.params.id},
        attributes: ['id','title', 'content', 'created_at'],
        include: [{model: User, attributes: ['username']}, 
        {model: Comment, attributes: ['id','article_id', 'user_id', 'content', 'created_at'],
        include: {model: User,
        attributes: ['username']}
    }],  
})
.then(articleData => {
    if (!articleData){
        res.status(404).json({message: "no article found with this ID"});
        return;
    }else{
        const article = articleData.get({plain: true});
        
        res.render('article', {
            article,
            logged_in: req.session.logged_in
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json(err);
        })
    }
})
});

module.exports = router;