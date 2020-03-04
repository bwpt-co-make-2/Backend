const db = require('../database/db-config.js');

module.exports = {
    add,
    remove,
    getVote
}

function add(vote) {
    return db('upvote').insert(vote);
}

function remove(id) {
    return db('upvote')
        .where('id', id)
        .del();
}

async function getVote() {
    let issues = db('upvote as vote')
        .join("issues", "issues.id", "vote.issues_id")
        .join("users", "users.id", "vote.users_id")
        .select("vote.id","users.username", "issues.title")
        // .where("users.id", "vote.users_id")
        // .where("issues.id", "vote.issues_id")
    
    return issues;
}