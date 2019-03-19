const express = require('express');

const db = require('../data/db.js')

const router = express.Router();

router.post('/', async (req, res) => {
    const { title, contents } = req.body;
    if (!title || !contents) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
    }
    try {
        const post = await db.insert({ title, contents });
        res.status(201).json(post)
    } catch {
        res.status(500).json({ error: "There was an error while saving the post to the database" });
    }
});

router.get('/', async (req, res) => {
    try {
        const posts = await db.find();
        res.status(200).json(posts);
    } catch {
        res.status(500).json({ error: "The posts information could not be retrieved." });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const post = await db.findById(id);
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." });
        }
    } catch {
        res.status(500).json({ error: "The post information could not be retrieved." });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const post = await db.remove(id);
        if (post) {
            res.status(200).json(post)
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." });
        }
    } catch {
        res.status(500).json({ error: "The post could not be removed" });
    }
});

router.put('/:id', async (req, res) => {
    const { title, contents } = req.body;
    const { id } = req.params;
    if (!title || !contents) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
    }
    try {
        const post = await db.update(id, { title, contents })
        if (post) {
            res.status(200).json(post)
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    } catch {
        res.status(500).json({ error: "The post information could not be modified." })
    }
});

module.exports = router;