const express = require("express");
const app = express();
const https = require("https");
const request = require("request");
require('dotenv').config();

app.get("/", (req, res) => {
    res.redirect("https://codeed.eu.auth0.com/authorize?audience=http://localhost:3000&scope=openid&response_type=code&client_id="+process.env.CLIENT_ID+"&redirect_uri=http://localhost:3000/callback&state="+process.env.STATE);
});

app.get("/callback", (req, res) => {
    const code = req.query.code;
    var request = require("request");

    var options = {
        method: 'POST',
        url: 'https://codeed.eu.auth0.com/oauth/token',
        headers: { 'content-type': 'application/json' },
        body:
        {
            grant_type: 'authorization_code',
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            code: code,
            redirect_uri: 'http://localhost:3000/out'
        },
        json: true
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        res.send(body.access_token);
        console.log(body);
    });

})

app.get("/out", (req, res) => {
    res.send(req);
})

app.listen(process.env.PORT || 3000);