//const { response } = require('express');
//const { request } = require('http');

require('dotenv').config();
const express = require('express');
const req = require('express/lib/request');

require('./conf/database');
const countriesRoutes = require('./routes/countries');
const continentsRoutes = require('./routes/continents');

const app = express();
app.use(express.json());
app.use('/countries', countriesRoutes);
app.use('/continents', continentsRoutes);

app.get('/', (request, response) => {
    response.status(200).json({ msg: "it works ! " })
});

/*app.get('/todos', (request, response) => {
    response.status(200).json({ msg: "The mesage works" })
});*/

const port = 3000
app.listen(port, () => {
    console.log('server running on http://localhost:' + port);
});