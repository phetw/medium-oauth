const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
var request = require('request');

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
            // Dynamic
            code: req.query.code,
            client_id: '5425e5ae4e52',
            client_secret: '65f35242d392cc32a695e2ba98e575fee7079cd3',
            grant_type: 'authorization_code',
            redirect_uri: 'http://127.0.0.1:4200/login'
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
            // Dynamic
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
    // 1af639ff52d2f8e1aa52ee42b42e211a6f5a2d05dadf2a0ef8991173bd4f6075f
    request.get({
        // Dynamic
        url: 'https://api.medium.com/v1/users/' + req.get('user_id') + '/publications',
        headers: {
            // Dynamic
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