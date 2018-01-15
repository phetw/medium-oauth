const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const request = require('request');

const API_CONFIG = require('./config');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


app.get('/', (req, res) => {
    res.json({
        config: API_CONFIG,
    });
});

app.get('/getAccessToken', (req, res) => {
    request.post({
        url: API_CONFIG.endPoint + '/tokens',
        form: {
            code: req.query.code,
            client_id: API_CONFIG.clientId,
            client_secret: API_CONFIG.clientSecret,
            grant_type: API_CONFIG.grantType,
            redirect_uri: API_CONFIG.redirectUri
        }
    }, (err, httpResponse, body) => {
        res.send(body);
        console.log(body);
    })
});

app.get('/getUserDetail', (req, res) => {
    request.get({
        url: API_CONFIG.endPoint + '/me',
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
        url: API_CONFIG.endPoint + '/users/' + req.get('user_id') + '/publications',
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

app.listen(PORT, () => {
    console.log('server start on port ' + PORT);
});