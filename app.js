const express = require('express');
const app = express();
const http = require('http');
const https = require('https');

app.use(express.static(__dirname + '/public'));

app.get('/*', (req, res) => {
    var app = "", root = "", style = "flat", logo_path = "logo";
    const query = req.query;

    // The Vercel application name
    if ("app" in query) {
        app = query["app"];
    } else {
        res.status(302).redirect("https://github.com/therealsujitk/vercel-badge/blob/main/README.md");
        return;
    }

    // The application path
    if ("root" in query) {
        root = query["root"];
    }

    // To Logo or No to logo, that is the question - DeltaRager 2021
    if ("logo" in query && query["logo"] == "false"){
        logo_path = "no-logo"
    }

    // The style of the badge
    if ("style" in query) {
        if (query["style"] == "flat-square") {
            style = "flat-square";
        } else if (query["style"] == "plastic") {
            style = "plastic";
        } else if (query["style"] == "for-the-badge") {
            style = "for-the-badge";
        }
    }

    const url = app + ".vercel.app/" + root;
    const handleRequest = (statusCode) => {
        var status = "deployed";
    
        if (statusCode <= 599 && statusCode >= 500) {
            // 500 - 599 -> Server Errors
            status = "failed";
        } else if (statusCode <= 499 && statusCode >= 400) {
            // 400 - 499 -> Client Errors
            status = "not-found";
        } else if (statusCode <= 399 && statusCode >= 300) {
            // 300 - 399 -> Redirects
        }
    
        // 200 - 299 -> Successful Responses
        // 100 - 199 -> Informational Responses
    
        res.status(200).sendFile(`${__dirname}/public/assets/images/${logo_path}/vercel-${status}-${style}.svg`);
    }

    try {
        https.get("https://" + url, (response) => {
            var statusCode = response.statusCode;
            handleRequest(statusCode);
        }).on('error', () => {
            // This could mean the HTTPS site is not available so we check for HTTP
            http.get("http://" + url, (response) => {
                var statusCode = response.statusCode;
                handleRequest(statusCode);
            }).on('error', () => {
                // Invalid Application Name
                handleRequest(404);
            }); 
        });
    } catch {
        // An error was encountered for some unknown reason
        res.status(500).send('Internal Server Error. Please open an issue at <a href="https://github.com/therealsujitk/vercel-badge/issues">vercel-badge/issues</a>.');
    }
});

module.exports = app;
