let express = require('express');
let router = express.Router();
const Infant = require('../db').import('../models/infant');
const jwt = require("jsonwebtoken");
const validateSession = require('../middleware/validate-session');
const User = require('../db').import('../models/user');

router.post('/register', validateSession, function(req, res) {
    Infant.create({
        babyname: req.body.babyname,
        parentname: req.body.parentname,
        contactnumber: req.body.contactnumber
    })
    .then(
            function createSuccess(infant) {
                
                    // res.json({
                    //     infant: infant,
                    //     message: "infant successfully registered!",
                    //     sessionToken: token,
                    // });
                    const updateUser = {
                        infantId: infant.id
                    }
                    console.log(infant.id, req.user.id)
                    const query = {where: {id: req.user.id}}
                
                    User.update(updateUser, query)
                    .then(user => res.status(200).json(user))
                    .catch(err => res.status(500).json({error:err}))  
                }
            )
            .catch(err => res.status(500).json({ error: err }));
});

router.get('/infantbyid/:id', function (req, res) {
    Infant.findOne({
        where: { id: req.params.id }
    })
    .then(infant => res.status(200).json(infant))
    .catch(err => res.status(500).json({ error: err }));
})

router.post('/update/:id', function(req, res) {
    const updateInfant = {
        babyname: req.body.babyname,
        parentname: req.body.parentname,
        contactnumber: req.body.contactnumber,
       }

    const query = {where: {id: req.params.id}}
    Infant.update(updateInfant, query)
    .then(infant => res.status(200).json(infant))
    .catch(err => res.status(500).json({error:err}))
    
});

module.exports = router;