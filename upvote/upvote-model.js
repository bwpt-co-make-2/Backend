const db = require('../database/db-config.js');

module.exports = {
    add,
    remove,
    getVote
}

function add(vote) {
    return db('upvote').insert(vote);
}

function remove(userId, issueId) {
    return db('upvote').where({users_id: userId, issues_id: issueId}).del();
}

async function getVote() {
    let issues = db('upvote')
        // .select("*")
        .innerJoin("issues", "issues_id", "upvote.issues_id")
    
    return issues;
}