const express = require('express');
const router = express.Router();

const ContinentModel = require('../models/Continent');
const CountryModel = require('../models/Country');

router.get('/', async(request, response) => {
    const continents = await ContinentModel.find().populate('countries');
    response.status(200).json(continents);
});

router.get('/threeCountry', async(request, response) => {
    const continents = await ContinentModel.find().populate({
        path: 'countries',
        options: {
            perDocumentLimit: 3
        }
    });
    //console.log(continents);
    response.status(200).json(continents);
});

router.post('/', async(request, response) => {
    const { name } = request.body

    const continent = await ContinentModel.create({
        name: name
    });

    response.status(200).json(continent);
});


router.get('/firstFour', async(request, response) => {

    const fourth = await ContinentModel.find().populate({
        path: 'countries',
        options: {
            sort: {
                name: 1
            },
            perDocumentLimit: 4
        }
    });
    response.status(200).json(fourth);
});

router.put('/:id', async(request, response) => {
    const continentID = request.params.id;
    const { countries } = request.body

    const continent = await ContinentModel.findOneAndUpdate({
        _id: continentID
    }, {
        countries
    }, {
        new: true
    });

    response.status(200).json(continent);
});

module.exports = router;