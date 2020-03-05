const request = require("supertest");
const server = require("../api/server.js");

let token;

    beforeAll((done) => {
      request(server)
        .post('/login')
        .send({
          username: "thatcher",
          password: "regular",
        })
        .end((err, response) => {
          token = response.body.token; // save the token!
          done();
        });
    });

    describe('GET /issues', () => {
      // token not being sent - should respond with a 401
      test('It should require authorization', () => {
        return request(server)
          .get('/issues')
          .then((response) => {
            expect(response.statusCode).toBe(400);
          });
      });
      // send the token - should respond with a 200
      test('It responds with JSON', () => {
        return request(server)
          .get('/issues')
          .set('Authorization',  token)
          .send({title: "test", description: "testing", picture: "testing pic", users_id: 1})
          .then(response => {
            expect(response.statusCode).toBe(200);
            expect(response.type).toBe('application/json');
          })
      });
    });
  