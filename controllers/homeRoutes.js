const router = require('express').Router();
const {User, Chat} = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) =>{
    try {
        const chatData = await Chat.findAll({
            include: [
                {model: User,
                attributes: ['name'],
            },
            ],
        });
        const chats = chatData.map((chat) => chat.get({
            plain:true
        }));
        res.render('homepage', {
            chats,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/profile');
      return;
    }
  
    res.render('login');
  });

module.exports = router;