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

module.exports = router;