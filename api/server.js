const express = require('express')
const actionDb = require('../data/helpers/actionModel')
const projectDb = require('../data/helpers/projectModel')
const cors = require('cors')

const server = express()

server.use(express.json())
server.use(cors())

// Actions
server.get('/api/actions', (req, res) => {
    actionDb.get()
        .then(actions => res.status(200).json(actions))
        .catch(err => res.status(500).json({ error: "Couldn't get actions.", err }))
})

server.get('/api/actions/:id', (req, res) => {
    const { id } = req.params
    actionDb.get(id)
        .then(action => res.status(200).json(action))
        .catch(err => res.status(500).json({ error: "Couldn't get action.", err }))
})

server.post('/api/actions', (req, res) => {
    const { project_id, description, notes } = req.body
    if (project_id && description && notes) {
        actionDb.insert(req.body)
            .then(action => res.status(201).json(action))
            .catch(err => res.status(500).json({ error: "Couldn't add action.", err }))
    } else {
        res.status(400).json({ error: "Please fill out required fields." })
    }
})

server.put('/api/actions/:id', (req, res) => {
    const { id } = req.params
    const { project_id, description, notes } = req.body
    if (project_id && description && notes) {
        actionDb.update(id, req.body)
            .then(action => {
                action ?
                res.status(200).json(action) :
                res.status(404).json({ error: "Invalid Id." })
            })
            .catch(err => res.status(500).json({ error: "Couldn't update action.", err }))
    } else {
        res.status(400).json({ error: "Please fill out required fields." })
    }
})

server.delete('/api/actions/:id', (req, res) => {
    const { id } = req.params
    actionDb.remove(id)
        .then(count => {
            count === 1 ?
            res.status(204).json() :
            res.status(404).json({ error: "Invalid Id." })
        })
        .catch(err => res.status(500).json({ error: "Couldn't delete action.", err }))
})

module.exports = server;
