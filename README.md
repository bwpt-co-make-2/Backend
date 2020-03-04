# CoMake API Docs

#### Root URL https://thatcher-comake.herokuapp.com/

#### API Guide!

Login Credentials
- `government_official: false` {username: admin2, password: password}
- `government_official: true` {username: admin3, password: password}

- req = require
- opt = optional
- all endpoint of `/issues` requires token

|      Description           |      Endpoint          |                                    Shape                                  | 
| :------------------------- | :--------------------- | :------------------------------------------------------------------------ |
| check if api is alive      | `/` (GET)              | should return {message: "Thatcher's CoMake API is alive!"}                |
| register a new user        | `/register` (POST)     | {username: req, password: req, zipcode: req, government_official: opt }   |
| login user                 | `/login` (POST)        | {username: req, password: req}                                            |
| get all issues             | `/issues` (GET)        | req {token} in header under Authorization                                 |
| get issues by id           | `/issues/:id` (GET)    | req {token} in header under Authorization                                 |
| add new issue              | `/issues` (POST)       | {title: req, description: req, picture: opt, zipcode: opt, users_id: req} |
| update issue               | `/issues/:id` (PUT)    | {title: req, description: req, picture: opt, zipcode: opt, users_id: req} |
| delete issue               | `/issues/:id` (DELETE) | req {token}                                                               |



#### Register and Login schema

- char = character
- num = number

|           field           |         data type      |                         metadata                   |
| :------------------------ | :--------------------- | :------------------------------------------------- |
| id                        |  unsigned integer      | primary key, auto-increments, generate by database |
| username                  |  string  (max 128 char)| required, unique                                   |
| password                  |  string (max 256 char) | required                                           |
| zipcode                   |  integer (max 5 num)   | required                                           |
| government_official       |  boolean               | optional, null default                             |


#### Issues schema

- char = character

|           field           |         data type      |                         metadata                   |
| :------------------------ | :--------------------- | :------------------------------------------------- |
| id                        |  unsigned integer      | primary key, auto-increments, generate by database |
| title                     |  string  (max 256 char)| required                                           |
| description               |  string (max 500 char) | required                                           |
| picture                   |  string   (url)        | optional                                           |
| zipcode                   |  integer (max 5 num)   | optional                                           |
| users_id                  |  foreign key `('users')`| required                                           |
