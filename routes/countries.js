const express = require('express');
router = express.Router();

const CountryModel = require('../models/Country');

router.get('/', async(request, response) => {
    const countries = await CountryModel.find().populate();
    response.status(200).json(countries);
});

router.get('/:id', async(request, response) => {
    const countryID = request.params.id;
    const countries = await CountryModel.find({
        _id: countryID
    });

    response.status(200).json(countries);
})

router.get('/length', async(request, response) => {
    const countries = await CountryModel.find();
    console.log(countries.length)
    response.status(200).json(countries.length);
});

router.put('/:string', async(request, response) => {
    const string = request.params.string;
    const countries = await CountryModel.find({
        name: string
    });
    if (countries[0].name == string) {
        response.status(200).json(countries);
    }
});

router.post('/', async(req, res) => {
    //console.log(req.body)
    const { name, isoCode } = req.body;

    // do not create with req.body
    const country = await CountryModel.create({
        name: name,
        isoCode: isoCode
    });

    res.status(200).json(country);
});


router.delete('/:id', async(request, response) => {
    const countryID = request.params.id;

    await CountryModel.findOneAndDelete({
        _id: countryID
    });

    response.status(200).json({ msg: "Country deleted!" });
})


router.put('/:id', async(request, response) => {
    const countryID = request.params.id;
    const { name, isoCode } = request.body;
    const country = await CountryModel.findByIdAndUpdate({
        _id: countryID
    }, {
        name,
        isoCode
    }, {
        new: true
    });
    response.status(200).json(country);
});

module.exports = router;