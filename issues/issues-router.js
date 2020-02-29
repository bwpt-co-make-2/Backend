const router = require('express').Router();

const Issues = require('../issues/issues-model.js');

router.get('/', (req, res) => {
    Issues.getIssues()
        .then(issue => {
            res.status(200).json(issue)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: "Error getting issues"})
        })
})

router.get('/:id', (req, res) => {
    const {id} = req.params;
    
    Issues.getIssuesById(id)
        .then(issue => {
            if (issue) {
                res.status(200).json(issue)
            } else {
                res.status(401).json({message: "Could not find issues with given id"})
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: "Failed to get issue"})
        })
})

router.post('/', (req, res) => {
    const data = req.body;

    Issues.add(data)
        .then(issue => {
            res.status(201).json(issue);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: "Cannot add issue"})
        })
})

router.put('/:id', (req, res) => {
    const {id} = req.params;
    const changes = req.body;

    Issues.getIssuesById(id)
        .then(issue => {
            if (issue) {
                Issues.update(changes, id)
                    .then(updatedIssue => {
                        res.status(200).json(updatedIssue)
                    })
            } else {
                res.status(404).json({message: "could not find issue with given id"})
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: "Failed to update issue"})
        })
})

router.delete('/:id', (req, res) => {
    const {id} = req.params;

    Issues.remove(id)
        .then(deleted => {
            if(deleted) {
                res.status(200).json({message: "Deleted"})
            } else {
                res.status(404).json({message: "Could not find issue with this given id"})
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: "Error deleting this issue"})
        })
})

module.exports = router;