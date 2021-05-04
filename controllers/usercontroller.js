//const router = require('express').Router();
let express = require('express');
let router = express.Router();
//const Sequelize = require('../db');
const User = require('../db').import('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const validateSession = require('../middleware/validate-session');
// const validateSession = require ('../middleware/validate-session');

router.post('/register', function(req, res) {
    User.create({
        email: req.body.email,
        passwordhash: bcrypt.hashSync(req.body.password, 13),
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        role: req.body.role,
        
    })
    .then(
            function createSuccess(user) {
                let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});
                    res.json({
                        user: user,
                        message: "User successfully registered!",
                        sessionToken: token
                    });
                }
            )
            .catch(err => res.status(500).json({ error: err }));
});

router.post('/login', function (req, res) {
    User.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(
        function loginSuccess(user) {
            if(user) {
                console.log('yes');
                bcrypt.compare(req.body.password, user.passwordhash, function (err, matches) {
                    console.log(matches);
                    matches = true;
                    if (matches) {
                        let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});

                        res.status(200).json({
                            user: user,
                            message: "User login successful!",
                            sessionToken: token
                        })

                    } else {
                        res.status(502).send({ error: 'Login Failed' });
                    };
                }); 
            } else {
                res.status(500).json({ error: 'User does not exist.' })
            };
        })
    .catch(err => res.status(500).json({error: err}));
})

router.post('/create/:role', validateSession, function(req, res) {
    User.create({
        email: req.body.email,
        passwordhash: bcrypt.hashSync(req.body.password, 13),
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        role: req.params.role,
        infantId: req.user.infantId,
    })
    .then(
            function createSuccess(user) {
                let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});
                    res.json({
                        user: user,
                        message: "User successfully created!",
                        sessionToken: token
                    });
                }
            )
            .catch(err => res.status(500).json({ error: err }));
});

router.put('/update/:id', function(req, res) {
    const updateUser = {
        email: req.body.email,
        passwordhash: bcrypt.hashSync(req.body.password, 13),
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        role: req.body.role
    }

    const query = {where: {id: req.params.id}}

    User.update(updateUser, query)
    .then(user => res.status(200).json(user))
    .catch(err => res.status(500).json({error:err}))
    
});

// Get all users
router.get('/allusers', function (req, res) {
    User.findAll()
    .then(users => res.status(200).json(users))
    .catch(err => res.status(500).json({ error: err }));
})

router.get('/current', validateSession, function (req, res) {
        // console.log(req.user.id);
        User.findOne({
            where: { id: req.user.id }
        })
        .then(user => res.status(200).json(user))
        .catch(err => res.status(500).json({ error: err }));
    })

// router.post('/signup', function (req, res) {
//     User.create({
//         username: req.body.username,
//         // Validate username is an email
//         password: bcrypt.hashSync(req.body.password, 13),
//         firstname: req.body.firstname,
//         lastname: req.body.lastname
//     })
//     .then(
//         function createSuccess(user) {
//            let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});

//             res.json({
//                 user: user,
//                 message: "User successfully registered!",
//                 sessionToken: token
//             });
//         }
//     )
//     .catch(err => res.status(500).json({ error: err }));
// });

// router.post('/login', function (req, res) {
//     User.findOne({
//         where: {
//             username: req.body.username
//         }
//     })
//     .then(
//         function loginSuccess(user) {
//             if(user) {
//                 bcrypt.compare(req.body.password, user.password, function (err, matches) {
//                     if (matches) {
//                         let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});

//                         res.status(200).json({
//                             user: user,
//                             message: "User login successful!",
//                             sessionToken: token
//                         })

//                     } else {
//                         res.status(502).send({ error: 'Login Failed' });
//                     };
//                 }); 
//             } else {
//                 res.status(500).json({ error: 'User does not exist.' })
//             };
//         })
//     .catch(err => res.status(500).json({error: err}));
// })

// // Get all users
// router.get('/owners', function (req, res) {
//     User.findAll()
//     .then(users => res.status(200).json(users))
//     .catch(err => res.status(500).json({ error: err }));
// })

// // Get user by ID
// router.get('/byid/:id', function (req, res) {
//     User.findOne({
//         where: {id: req.params.id }
//     })
//     .then(user => res.status(200).json(user))
//     .catch(err => res.status(500).json({ error: err}));
// })

// // Get all users
// router.get('/current', validateSession, function (req, res) {
//     // console.log(req.user.id);
//     User.findOne({
//         where: { id: req.user.id }
//     })
//     .then(user => res.status(200).json(user))
//     .catch(err => res.status(500).json({ error: err }));
// })

// // Add Liked Pet to User
// router.put('/like/:petid', validateSession, function (req, res){

//     // const query = { where: { id: req.user.id } }
//     User.update(
//         {likedpets: Sequelize.fn('array_append', Sequelize.col('likedpets'), req.params.petid)}, 
//         {where: {id: req.user.id}}
//     )
//     .then(recordsChanged => res.status(200).json(recordsChanged))
//     .catch(err => res.status(500).json({error:err}))
// })

// // Remove Liked Pet from User
// router.put('/unlike/:petid', validateSession, function (req, res){

//     User.update(
//         {likedpets: Sequelize.fn('array_remove', Sequelize.col('likedpets'), req.params.petid)}, 
//         {where: {id: req.user.id}}
//     )
//     .then(recordsChanged => res.status(200).json(recordsChanged))
//     .catch(err => res.status(500).json({error:err}))
// })

module.exports = router;




// const express = require('express');
// const router = express.Router();
// const User = require('../db').import('../models/user');


// router.post('/register', function(req, res) {
//     //res.send('here I am', req)
//     User.create({
//             email: req.body.email,
//             passwordhash: req.body.password,
//             firstname: req.body.firstname,
//             lastname: req.body.lastname,
//             role: req.body.role
//         })
//         .then(
//                 function createSuccess(user) {
            
//                         res.json({
//                             user: user,
//                             message: "User successfully registered!",
//                         });
//                     }
//                 )
//                 .catch(err => res.status(500).json({ error: err }));
// });

// module.exports = router;