
exports.seed = function(knex) {
  return knex('issues').insert([
    {id: 1, title: "Lost cat", description: "If you see this cat please call (470) 123-4567", picture: "https://bit.ly/2IdE7Kh", zipcode: 30043, users_id: 1},
    {id: 2, title: "Wrecked Stop Sign", description: "We will try to fix this asap, please be patience", picture: "https://bit.ly/2VTfuL1", zipcode: 30024, users_id: 2},
    {id: 3, title: "Trash Removal", description: "Trash will be remove on monday each week", picture: "https://bit.ly/2VJZACq", zipcode: 30035, users_id: 3},
    {id: 4, title: "Pothole", description: "Everyone please vote for this, I've busted 2 tires because of this pothole", picture: "https://bit.ly/32OxaJ9", zipcode: 30043, users_id: 1},
    {id: 5, title: "HOA fee", description: "We will have a $5 increase for this upcoming month since we have to pay extra for the sewage repair", picture: "https://bit.ly/2vs0wAQ", zipcode: 30024, users_id: 2}
  ])
};
