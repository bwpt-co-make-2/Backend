const db = require('../database/db-config.js');

module.exports = {
    getIssues,
    getIssuesById,
    add, 
    update,
    remove
}

function getIssues() {
    return db('issues')
}

function getIssuesById(id) {
    return db('issues')
        .where({id})
        .first()
}

function add(issue) {
    return db('issues')
        .insert(issue, 'id')
        .then(([id]) => getIssuesById(id))
}

function update(changes, id) {
    return db('issues')
        .where({id})
        .update(changes)
}

function remove(id) {
    return db('issues')
        .where('id', id)
        .del()
}