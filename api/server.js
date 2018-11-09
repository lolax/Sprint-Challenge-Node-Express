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
        .catch(err => res.status(500).json({ error: "The actions could not be retrieved.", err }))
})

server.get('/api/actions/:id', (req, res) => {
    const { id } = req.params
    actionDb.get(id)
        .then(action => res.status(200).json(action))
        .catch(err => res.status(500).json({ error: "The action could not be retrieved.", err }))
})

server.post('/api/actions', (req, res) => {
    const { project_id, description, notes } = req.body
    if (project_id && description && notes) {
        actionDb.insert(req.body)
            .then(action => res.status(201).json(action))
            .catch(err => res.status(500).json({ error: "The action could not be added.", err }))
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
            .catch(err => res.status(500).json({ error: "The action could not be updated.", err }))
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
        .catch(err => res.status(500).json({ error: "The action could not be deleted.", err }))
})

// Projects
server.get('/api/projects', (req, res) => {
    projectDb.get()
        .then(projects => res.status(200).json(projects))
        .catch(err => res.status(500).json({ error: "The projects could not be retrieved.", err }))
})

server.get('/api/projects/:id', (req, res) => {
    const { id } = req.params
    projectDb.get(id)
        .then(project => res.status(200).json(project))
        .catch(err => res.status(500).json({ error: "The project could not be retrieved.", err }))
})

server.post('/api/projects', (req, res) => {
    const { name, description } = req.body
    if (name && description) {
        projectDb.insert(req.body)
            .then(project => res.status(201).json(project))
            .catch(err => res.status(500).json({ error: "The project could not be added.", err }))
    } else {
        res.status(400).json({ error: "Please fill out required fields." })
    }
})

server.put('/api/projects/:id', (req, res) => {
    const { id } = req.params
    const { name, description } = req.body
    if (name && description) {
        projectDb.update(id, req.body)
            .then(project => {
                project ?
                res.status(200).json(project) :
                res.status(404).json({ error: "Invalid Id." })
            })
            .catch(err => res.status(500).json({ error: "The project could not be updated.", err }))
    } else {
        res.status(400).json({ error: "Please fill out required fields." })
    }
})

server.delete('/api/projects/:id', (req, res) => {
    const { id } = req.params
    projectDb.remove(id)
        .then(count => {
            count === 1 ?
            res.status(204).json() :
            res.status(404).json({ error: "Invalid Id." })
        })
        .catch(err => res.status(500).json({ error: "The project could not be deleted.", err }))
})

server.get('/api/projects/actions/:id', (req, res) => {
    const { id } = req.params;
    projectDb.get(id)
        .then(project => {
            projectDb.getProjectActions(id)
            .then(list => res.status(200).json(list))
            .catch(err => res.status(500).json({ error: "The actions for the specified project could not be retrieved.", err }))
        })
        .catch(err => {
            res.status(404).json({ error: "The project could not be found.", err })
        })
})

module.exports = server;
