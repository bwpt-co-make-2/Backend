const router = require('express').Router();
const Votes = require('../upvote/upvote-model.js');

router.get('/', (req, res) => {;
    Votes.getVote()
        .then((votes) => {
            if(votes) {
                res.status(200).json(votes);
            } else {
                res.status(404).json({ message: "Could not find vote for this user"})
            }
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({message: "Failed to get user's votes"})
        })


})

router.post('/', (req, res) => {
    const data = req.body;

    Votes.add(data)
        .then(vote => {
            res.status(201).json(vote)
        })
        .catch(err => {
            console.log(err) 
            res.status(500).json({message: "Cannot add this vote"})
        })
})

router.delete("/:id", (req, res) => {
    const {id} = req.params;

    Votes.remove(id)
        .then(deleted => {
            if(deleted) {
                res.status(200).json({message: "Vote Deleted"})
            } else {
                res.status(404).json({message: "Could not fine vote with this given id"})
            }
        }) 
        .catch(err => {
            console.log(err)
            res.status(500).json({message: "Error removing this vote"})
        })
})


module.exports = router;