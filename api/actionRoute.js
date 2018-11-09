const actionDb = require('../data/helpers/actionModel')
const express = require('express')
const route = express.Router()

route.get('/', (req, res) => {
    actionDb.get()
        .then(actions => res.status(200).json(actions))
        .catch(err => res.status(500).json({ error: "The actions could not be retrieved.", err }))
})

route.get('/:id', (req, res) => {
    const { id } = req.params
    actionDb.get(id)
        .then(action => res.status(200).json(action))
        .catch(err => res.status(500).json({ error: "The action could not be retrieved.", err }))
})

route.post('/', (req, res) => {
    const { project_id, description, notes } = req.body
    if (project_id && description && notes) {
        actionDb.insert(req.body)
            .then(action => res.status(201).json(action))
            .catch(err => res.status(500).json({ error: "The action could not be added.", err }))
    } else {
        res.status(400).json({ error: "Please fill out required fields." })
    }
})

route.put('/:id', (req, res) => {
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

route.delete('/:id', (req, res) => {
    const { id } = req.params
    actionDb.remove(id)
        .then(count => {
            count === 1 ?
            res.status(204).json() :
            res.status(404).json({ error: "Invalid Id." })
        })
        .catch(err => res.status(500).json({ error: "The action could not be deleted.", err }))
})

module.exports = route