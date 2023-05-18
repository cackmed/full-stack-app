const express = require('express');
const axios = require('axios');
const requiredDataFields = require('./middleware/required-data-fields');
const validateDate = require('./middleware/validate-data');
require('dotenv').config();

const app = new express();
app.use(express.json());
const url = process.env.API_URL

const sortingFunction = (a, b) => {
    if(a.jurisdiction === b.jurisdiction) {
        if(a.lastName[0] === b.lastName[0]) {
            return a.firstName < b.firstName ? -1 : 1;
        }
        else {
            return a.lastName < b.lastName ? -1 : 1;
        };
    } else {
        return a.jurisdiction < b.jurisdiction ? -1 : 1;
    };
};

app.get('/supervisors', async (req, res) => {
    axios
    .get(url)
    .then(response => {
        if(response.status === 200 && response.data) {

            const supervisorsData = response.data.reduce((arr, supervisorInfo) => {
                if(isNaN(+supervisorInfo.jurisdiction)) {
                    arr.push({ jurisdiction: supervisorInfo.jurisdiction, lastName: supervisorInfo.lastName, firstName: supervisorInfo.firstName });
                    
                };
                return arr;
            }, []).sort((a, b) => sortingFunction(a, b));
            res.status(200).json(supervisorsData);
        }
        else {
            res.status(500).send('Failed to retrive data');
        }
    })
})

app.post('/submit', requiredDataFields, validateDate, async (req, res) => {
    console.log({status:'Recieved Notification', requestInfo: req.body});
    res.status(200).json({
        statusCode: 200, 
        body: 'Successfully recieved notification'
    });
})

app.use(require('./middleware/not-found'));

app.listen(3001, () => {
    console.log('Listening on 3001. Ctrl+c to stop this server.')
})