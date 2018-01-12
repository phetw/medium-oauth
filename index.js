const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const request = require('request');

const app = express();
const PORT = process.env.PORT || 3000;
const API_BASE_URL = 'https://api.medium.com/v1';
const API_CONFIG = {
    clientId: '5425e5ae4e52',
    clientSecret: '65f35242d392cc32a695e2ba98e575fee7079cd3',
    grantType: 'authorization_code',
    redirectUri: 'http://127.0.0.1:4200/login'
}

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


app.get('/', (req, res) => {
    res.json({
        message: 'API endpoint'
    });
});

app.get('/getAccessToken', (req, res) => {
    request.post({
        url: API_BASE_URL + '/tokens',
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
        url: API_BASE_URL + '/me',
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
        url: API_BASE_URL + '/users/' + req.get('user_id') + '/publications',
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