const express = require('express');
const router = express.Router()

const ContinentModel = require('../models/Continent');
const CountryModel = require('../models/Country');

router.get('/', async(request, response) => {
    const continents = await ContinentModel.find().populate('countries');
    response.status(200).json(continents);
});

router.get('/threeCountry', async(request, response) => {
    const continents = await ContinentModel.find().populate({
        path: 'countries',
        options: { limit: 3 }
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

router.get('/:id/fourthCountry', async(request, response) => {
    const continentID = request.params.id;

    const fourth = await CountryModel.find({
        continent: continentID
    }).sort('name');
    console.log(fourth);
    response.status(200).json(fourth[3]);
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