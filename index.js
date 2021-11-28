const http = require("http");
const express = require("express");
const app = express();

const svgToImg = require("svg-to-img");

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get("/", (request, response) => {
    response
        .status(200)
        .set("Content-Type", "text/plain")
        .end("Welcome to ColorAPI! For documentation and info go to https://colorapi.advaith.fun kthx");
});

app.get("/*/*.svg", (request, response) => {
    let data = request.originalUrl.split("/");
    const [, ...mydata] = data;
    const [x, y] = mydata[0].split("x");
    const hex = mydata[1].replace(".svg", "");

    // const hex = request.originalUrl.replace("/", "").replace(".svg", "");

    response
        .status(200)
        .set("Content-Type", "image/svg+xml")
        .end(
            `<svg xmlns="http://www.w3.org/2000/svg" width="${x}" height="${y}"><rect fill="#${hex}" x="0" y="0" width="${x}" height="${y}"></rect></svg>`
        );
});

app.get("/*.webp", async (request, response) => {
    let data = request.originalUrl.split("/");
    const [, ...mydata] = data;
    const [x, y] = mydata[0].split("x");
    const hex = mydata[1].replace(".webp", "");

    // const hex = request.originalUrl.replace("/", "").replace(".webp", "").replace("#", "");

    const image = await svgToImg
        .from(
            `<svg xmlns="http://www.w3.org/2000/svg" width="${x}" height="${y}"><rect fill="#${hex}" x="0" y="0" width="${x}" height="${y}"></rect></svg>`
        )
        .toWebp()
        .catch((error) => response.status(500).set("Content-Type", "text/plain").end(String(error)));

    response.status(200).set("Content-Type", "image/webp").end(image);
});

app.get("/*/*.png", async (request, response) => {
    let data = request.originalUrl.split("/");
    const [, ...mydata] = data;
    const [x, y] = mydata[0].split("x");
    const hex = mydata[1].replace(".png", "");

    const image = await svgToImg
        .from(
            `<svg xmlns="http://www.w3.org/2000/svg" width="${x}" height="${y}"><rect fill="#${hex}" x="0" y="0" width="256" height="256"></rect></svg>`
        )
        .toPng()
        .catch((error) => response.status(500).set("Content-Type", "text/plain").end(String(error)));

    response.status(200).set("Content-Type", "image/png").end(image);
});

app.get("/*/*.jpeg", async (request, response) => {
    let data = request.originalUrl.split("/");
    const [, ...mydata] = data;
    const [x, y] = mydata[0].split("x");
    const hex = mydata[1].replace(".jpeg", "");

    const image = await svgToImg
        .from(
            `<svg xmlns="http://www.w3.org/2000/svg" width="${x}" height="${y}"><rect fill="#${hex}" x="0" y="0" width="${x}" height="${y}"></rect></svg>`
        )
        .toJpeg()
        .catch((error) => response.status(500).set("Content-Type", "text/plain").end(String(error)));

    response.status(200).set("Content-Type", "image/jpeg").end(image);
});

app.get("/*/*.jpg", async (request, response) => {
    let data = request.originalUrl.split("/");
    const [, ...mydata] = data;
    const [x, y] = mydata[0].split("x");
    const hex = mydata[1].replace(".jpg", "");

    const image = await svgToImg
        .from(
            `<svg xmlns="http://www.w3.org/2000/svg" width="${x}" height="${y}"><rect fill="#${hex}" x="0" y="0" width="${x}" height="${y}"></rect></svg>`
        )
        .toJpeg()
        .catch((error) => response.status(500).set("Content-Type", "text/plain").end(String(error)));

    response.status(200).set("Content-Type", "image/jpeg").end(image);
});

// 404 PAGE
app.use(function (request, response) {
    response
        .status(404)
        .set("Content-Type", "text/plain")
        .end("Looks like there was an error in your URL. 404 page not found");
});

app.listen(process.env["PORT"] || 3000);

// setInterval(() => {
//     http.get(`http://ColorApi.aytea14.repl.co/`);
// }, 280000);

console.log("Started!");
