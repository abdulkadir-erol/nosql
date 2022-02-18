const express = require('express');
router = express.Router();

const ContinentModel = require('../models/Continent');

router.get('/', async(request, response) => {
    const continents = await ContinentModel.find();
    response.status(200).json(continents);
});

router.get('/:id', async(request, response) => {
    const continentID = request.params.id;
    const continents = await ContinentModel.find({
        _id: continentID
    });

    response.status(200).json(continents);
})

router.get('/length', async(request, response) => {
    const continents = await ContinentModel.find();
    console.log(continents.length)
    response.status(200).json(continents.length);
});


router.post('/', async(req, res) => {
    //console.log(req.body)
    const { name, isoCode } = req.body;

    // do not create with req.body
    const continents = await ContinentModel.create({
        name: name,
    });

    res.status(200).json(continents);
});


router.delete('/:id', async(request, response) => {
    const continentID = request.params.id;

    await ContinentModel.findOneAndDelete({
        _id: continentID
    });

    response.status(200).json({ msg: "Continent deleted!" });
})


router.put('/:id', async(request, response) => {
    const continentID = request.params.id;
    const { name, isoCode } = request.body;
    const continent = await ContinentModel.findByIdAndUpdate({
        _id: continentID
    }, {
        name,
        isoCode
    }, {
        new: true
    });
    response.status(200).json(continent);
});

module.exports = router;