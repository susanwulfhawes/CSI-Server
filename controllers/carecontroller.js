let express = require('express');
let router = express.Router();
const Care = require('../db').import('../models/care');

router.post('/create', function(req, res) {
    Care.create({
        care: req.body.care,
        type: req.body.type,
        amount: req.body.amount,
        time: req.body.time,
        date: req.body.date
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