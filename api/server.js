const express = require('express')
const actionRoute = require('./actionRoute.js')
const projectRoute = require('./projectRoute.js')
const cors = require('cors')

const server = express()

server.use(express.json())
server.use(cors())
server.use('/api/actions', actionRoute)
server.use('/api/projects', projectRoute)

module.exports = server;
