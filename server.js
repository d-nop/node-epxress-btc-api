const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.post('/', function(req,res) {
    request(`https://apiv2.bitcoinaverage.com/indices/global/ticker/${req.body.crypto}${req.body.currency}`, function(error, response, body) {
        let data = JSON.parse(body);    
        res.send(`<h1>The current price of ${req.body.crypto} is ${data.last} in ${req.body.currency}</h1>`);
    });


});

app.listen(3000, function() {
    console.log('Listening on port 3000');
});