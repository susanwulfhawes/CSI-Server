let express = require('express');
let router = express.Router();
const Care = require('../db').import('../models/care');
const validateSession = require('../middleware/validate-session');
const User = require('../db').import('../models/user');

// router.post('/create', validateSession, function(req, res) {
//     Care.create({
//         care: req.body.care,
//         type: req.body.type,
//         amount: req.body.amount,
//         userId: req.user.id
//     })
//     // .then(
//             function createSuccess(care) {
//                 res.json({
//                     care: care,
//                     message: "care successfully registered!",
//                     sessionToken: token,
//              });
//             // //         const updateCare = {
//             // //             infantId: infant.id
//             // //         }
//             // //         const query = {where: {id: req.user.id}}
                
//             // //         User.update(updateUser, query)
//             // //         .then(user => res.status(200).json(user))
//             // //         .catch(err => res.status(500).json({error:err}))  
//             //     }
//             // // )
//             // // .catch(err => res.status(500).json({ error: err }));
// // }
// );


router.post('/create', validateSession, function(req, res) {
    Care.create({
        care: req.body.care,
        type: req.body.type,
        amount: req.body.amount,
        userId: req.user.id,
        time: req.body.time,
        date: req.body.date,
    })
    .then(
            function createSuccess(care) {
        
                    res.json({
                    care: care,
                    message: "care successfully registered!",
                });
              }
            )
            .catch(err => res.status(500).json({ error: err }));
});

// Get all cares
router.get('/allcares', function (req, res) {
    Care.findAll()
    .then(cares => res.status(200).json(cares))
    .catch(err => res.status(500).json({ error: err }));
})

router.put('/update/:id', function(req, res) {
    const updateCare = {
        care: req.body.care,
        type: req.body.type,
        amount: req.body.amount,
        time: req.body.time,
        date: req.body.date
    }

    const query = {where: {id: req.params.id}}

    Care.update(updateCare, query)
    .then(care => res.status(200).json(care))
    .catch(err => res.status(500).json({error:err}))
    
});

router.delete('/delete/:id', function(req, res){
    const query = {where: {id: req.params.id}}
    Care.destroy(query)
    .then(() => res.status(200).json({message: "Care Entry Removed"}))
    .catch((err) => res.status(500).json({error: err}));
})

module.exports = router;