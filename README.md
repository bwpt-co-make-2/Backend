# CoMake API Docs

#### Root URL https://thatcher-comake.herokuapp.com/

#### API Guide!

- req = require
- opt = optional

|      Description           |   Endpoint          |                                    Shape                                  | 
| :------------------------- | :------------------ | :------------------------------------------------------------------------ |
| check if api is alive      | `/` (GET)           | should return {message: "Thatcher's CoMake API is alive!"}                |
| register a new user        | `/register` (POST)  | {username: req, password: req, zipcode: req, government_official: opt }   |
| login user                 | `/login` (POST)     | {username: req, password: req}                                            |
| get all issues             | `/issues` (GET)     | req {token} in header under Authorizations                                |
| add new issue              | `/issues` (POST)    | {title: req, description: req, picture: opt, zipcode: opt, users_id: req} |