import express from 'express'
import logger from './utilities/logger'

const app = express();
const port = 3000;

app.get('/continents', logger, (req,res) => {
    res.send('continents');
});

app.get('/countries', logger, (req,res) => {
    res.send('countries');
});

app.get('/oceans', logger, (req,res) => {
    res.send('oceans');
});

app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});