
exports.seed = function(knex) {
  return knex('upvote').insert([
    {id: 1, users_id: 1, issues_id: 1},
    {id: 2, users_id: 1, issues_id: 2},
    {id: 3, users_id: 1, issues_id: 3},
    {id: 4, users_id: 2, issues_id: 1},
    {id: 5, users_id: 2, issues_id: 2},
    {id: 6, users_id: 3, issues_id: 2},
    {id: 7, users_id: 3, issues_id: 3},
    {id: 8, users_id: 3, issues_id: 1}
  ])
};
