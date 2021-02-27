const express = require('express');
const app = express();
const got = require('got');

app.get('/*', async (req, res) => {
    var app = "", root = "", style = "flat";
    const query = req.query;

    if ("app" in query) {
        var app = query["app"];
    } else {
        res.redirect("https://github.com/therealsujitk/vercel-badge/blob/master/README.md");
        return;
    }

    if ("root" in query) {
        var root = query["root"];
    }

    if ("style" in query) {
        if (query["style"] == "flat-square") {
            style = "flat-square";
        } else if (query["style"] == "plastic") {
            style = "plastic";
        }
    }

    var statusCode = 200;

    try {
        const url = "http://" + app + ".vercel.app/" + root;
        const response = await got(url);
        statusCode = response.statusCode;
    } catch (error) {
        statusCode = 500;
    }

    var status = "deployed";

    if (statusCode == 500 || statusCode == 404) {
        status = "failed";
    }

    res.status(200).sendFile(__dirname + "/public/assets/images/vercel-" + status + "-" + style + ".svg");
});

module.exports = app;
