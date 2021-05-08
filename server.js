const express = require('express');
const twitterConfig = require('./config');
var Twit = require('twit');

const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
});

const queryCount = 10;

var T = new Twit({
    consumer_key: twitterConfig.apiKey,
    consumer_secret: twitterConfig.apiSecretKey,
    access_token: twitterConfig.accessToken,
    access_token_secret: twitterConfig.accessTokenSecret
});

app.get('/search/tweets', (req, res) => {
    T.get('search/tweets', { q: req.query.search || "twitter", count: queryCount }, function (err, data, response) {
        res.json(data);
    });
});

const port = 5001;

app.listen(port, () => {
    console.log('Server started on port ' + port);
});