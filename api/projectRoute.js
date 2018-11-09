const projectDb = require('../data/helpers/projectModel')
const express = require('express')
const route = express.Router()

route.get('/', (req, res) => {
    projectDb.get()
        .then(projects => res.status(200).json(projects))
        .catch(err => res.status(500).json({ error: "The projects could not be retrieved.", err }))
})

route.get('/:id', (req, res) => {
    const { id } = req.params
    projectDb.get(id)
        .then(project => res.status(200).json(project))
        .catch(err => res.status(500).json({ error: "The project could not be retrieved.", err }))
})

route.post('/', (req, res) => {
    const { name, description } = req.body
    if (name && description) {
        projectDb.insert(req.body)
            .then(project => res.status(201).json(project))
            .catch(err => res.status(500).json({ error: "The project could not be added.", err }))
    } else {
        res.status(400).json({ error: "Please fill out required fields." })
    }
})

route.put('/:id', (req, res) => {
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

route.delete('/:id', (req, res) => {
    const { id } = req.params
    projectDb.remove(id)
        .then(count => {
            count === 1 ?
            res.status(204).json() :
            res.status(404).json({ error: "Invalid Id." })
        })
        .catch(err => res.status(500).json({ error: "The project could not be deleted.", err }))
})

route.get('/actions/:id', (req, res) => {
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

module.exports = route