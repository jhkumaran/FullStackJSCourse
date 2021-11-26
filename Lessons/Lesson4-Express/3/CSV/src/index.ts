import express from 'express';
import {promises as fsPromises} from 'fs';
import csv from 'csvtojson';
import { stringify } from 'querystring';

const app = express();
const port = 3000;

const inputFile = './users.csv';
const outputFile = 'users.json';

app.get('/convert', (req,res) => {
    res.send('converting in process');
    csv()
    .fromFile(inputFile)
    .then((data) => {
        let newData = data.map((item : {
            name: string, age: string, height: string
        }) => {
            let name = item.name != "" ? item.name : 'name missing';
            let age = item.age !== "" ? item.age : 'age missing';
            let height = item.height !== "" ? item.height : 'height missing';
            return { name, age, height };
        });
        fsPromises.writeFile(outputFile, JSON.stringify(newData));
    });
});

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});