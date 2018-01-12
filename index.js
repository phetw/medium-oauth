const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

var request = require('request');

import {
    environment
} from './angular-source/src/environments/environment';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


app.get('/', (req, res) => {
    res.json({
        message: 'api endpoint'
    });
});

app.get('/getAccessToken', (req, res) => {
    request.post({
        url: 'https://api.medium.com/v1/tokens',
        form: {
            code: req.query.code,
            client_id: environment.API_SECRET.clientId,
            client_secret: environment.API_SECRET.clientSecret,
            grant_type: 'authorization_code',
            redirect_uri: environment.redirectUri
        }
    }, (err, httpResponse, body) => {
        res.send(body);
        console.log(body);
    })
});

app.get('/getUserDetail', (req, res) => {
    request.get({
        url: 'https://api.medium.com/v1/me',
        headers: {
            'Authorization': req.get('Authorization'),
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }, (err, httpResponse, body) => {
        res.send(body);
        console.log(body);
    })
})

app.get('/listPublications', (req, res) => {
    request.get({
        url: 'https://api.medium.com/v1/users/' + req.get('user_id') + '/publications',
        headers: {
            'Authorization': req.get('Authorization'),
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }, (err, httpResponse, body) => {
        res.send(body);
        console.log(body);
    })
})


app.listen(PORT, (data) => {
    console.log('server start on port ' + PORT);
});