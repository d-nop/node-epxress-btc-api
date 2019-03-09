const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.post('/', function(req,res) {
    let crypto = req.body.crypto;
    let currency = req.body.currency;
    let amount = req.body.amount;

    let options = {
        url: "https://apiv2.bitcoinaverage.com/convert/global",
        Method: "GET",
        qs: {
            from: crypto,
            to: currency,
            amount: amount
        }
    };

    request(options, function(error, response, body) {
        let data = JSON.parse(body);
        let price = data.price;
        let currentDate = data.time;

        res.write(`<p>The current date is ${currentDate}</p>`);
        res.write(`<h1>${amount} ${crypto} is currently worth ${price} ${currency}</h1>`);
        res.send();
    });

});

app.listen(3000, function() {
    console.log('Listening on port 3000');
});