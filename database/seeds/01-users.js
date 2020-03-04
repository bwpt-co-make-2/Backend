
exports.seed = function(knex) {
  return knex('users').insert([
    {id: 1, username: "Joe", password: "verysecurepassword", zipcode: 30024, government_official: 0 },
    {id: 2, username: "Tam", password: "verysecurepassword", zipcode: 30043, government_official: 1 },
    {id: 3, username: "Rick", password: "verysecurepassword", zipcode: 30056, government_official: 0 }
  ])
};
