const request = require('supertest');

const server = require('../api/server.js');
const db = require("../database/db-config.js");
const authModel = require("../auth/auth-model.js");

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

//.env
it ('check if db env is running on testing', function() {
    expect(process.env.DB_ENV).toBe('testing');
})

//server GET  "/""
describe("api server", () => {
    describe("GET request for the api /", () => {
        it("Return 200 status", () => {
            return request(server)
                .get("/")
                .then(res => {
                    expect(res.status).toBe(200);
                })
        })

        it("Return JSON response", () => {
            return request(server)
                .get("/")
                .then(res => {
                    expect(res.type).toMatch(/json/i)
                })
        })

        it("Return message properly on api", () => {
            return request(server)
                .get('/')
                .then(res => {
                    expect(res.body.message).toBe("Thatcher's CoMake API is alive!")
                })
        })
    })
})

//server POST register
describe("POST request for /register", () => {
    beforeEach(async () => {
        await db('users').truncate();
    })

    describe("Enpoint status", () => {
        it("Return 201 status and JSON response", () => {
            return request(server)
                .post("/register")
                .send({username: "thatcher", password: "regular", zipcode: 23901, government_official: 0})
                .then(res => {
                    expect(res.status).toBe(201);
                    expect(res.type).toMatch(/json/i)
                })
        })
    })
})

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


