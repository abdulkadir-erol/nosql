const express = require('express');
const router = express.Router()

const ContinentModel = require('../models/Continent');
const CountryModel = require('../models/Country');


router.get('/', async(request, response) => {
    const countries = await CountryModel.find();
    response.status(200).json(countries);
});

router.get('/sortP', async(request, response) => {
    const sortPopulation = await CountryModel.find().sort('population');
    console.log(sortPopulation);
    response.status(200).json(sortPopulation);
});

router.get('/hasUandGT1', async(request, response) => {
    const hasU = await CountryModel.find({
        $and: [
            { "name": /u/i },
            { population: { $gt: 100000 } }
        ]
    });
    console.log(hasU);
    response.status(200).json(hasU);
});

router.get('/Input/:string', async(request, response) => {
    const string = request.params.string;
    const hasString = await CountryModel.find({ 'name': { '$regex': string, '$options': 'i' } });
    console.log(hasString);
    response.status(200).json(hasString);
});

router.get('/:id', async(request, response) => {
    const countryId = request.params.id;

    const countries = await CountryModel.findOne({
        _id: countryId
    });

    response.status(200).json(countries);
});

router.post('/', async(request, response) => {
    const { name, isoCode, population } = request.body

    const country = await CountryModel.create({
        name: name,
        isoCode,
        population
    });

    response.status(200).json(country);
});

router.delete('/:id', async(request, response) => {
    const countryId = request.params.id;

    await CountryModel.findOneAndDelete({
        _id: countryId
    });

    response.status(200).json({ msg: 'Country well deleted !' });
});

router.put('/:id', async(request, response) => {
    const countryId = request.params.id;
    const { name, isoCode, population, continent } = request.body

    const country = await CountryModel.findOneAndUpdate({
        _id: countryId
    }, {
        name,
        isoCode,
        population,
        continent
    }, {
        new: true
    });

    response.status(200).json(country);
});

module.exports = router;