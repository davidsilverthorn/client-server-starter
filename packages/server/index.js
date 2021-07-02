const { resolve } = require('path');
const cookieParser = require('cookie-parser')
const express = require('express');
const server = express();
require('dotenv').config()

const distDir = resolve(process.cwd(), '../client/dist');
const port = (process.env.SERVER_PORT) ? process.env.SERVER_PORT : 3000;
const production = (process.env.NODE_ENV === 'production') ? true : false;

server.use(cookieParser())
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(express.static(distDir))

server.get('/*', (req, res) => {
    res.sendFile(`${distDir}/__app.html`)
})

server.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})