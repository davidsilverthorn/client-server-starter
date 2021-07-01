const express = require('express')
const server = express()
const { resolve } = require('path')
require('dotenv').config()

const port = (process.env.SERVER_PORT) ? process.env.SERVER_PORT : 3000;
const distDir = resolve(process.cwd(), '../client/dist')

server.use(express.static(distDir))

server.get('/*', (req, res) => {
    res.sendFile(`${distDir}/__app.html`)
})

server.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})