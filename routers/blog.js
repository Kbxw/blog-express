const express = require('express')
const Blog = require('../models/blog')
const router = new express.Router()

router.post('/entradas', async (req, res) => {
    const entrada = new Blog(req.body)

    try {
        await entrada.save()
        //res.status(201).send(entrada)
        res.redirect('/');
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/entradas', async (req, res) => {
    try {
        const entradas = await Blog.find({})
        res.send(entradas)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/entradas/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const entrada = await Blog.findById(_id)

        if (!entrada) {
            return res.status(404).send()
        }

        res.send(entrada)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/entradas/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['title','snippet']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const entrada = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        if (!entrada) {
            return res.status(404).send()
        }

        res.send(entrada)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/entradas/:id', async (req, res) => {
    try {
        const entrada = await Blog.findByIdAndDelete(req.params.id)

        if (!entrada) {
            res.status(404).send()
        }

        res.send(entrada)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router