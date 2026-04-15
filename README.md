
# Bookmark Manager with Server-Side Metadata Fetching 

Build a MERN Stack Bookmark Manager where 2 folders are there:- Server and Client. In Server side I craete different files and folders like models, controllers, services, routes etc for CRUD and also add password hashing using bcrypt, jwt for authentication & authorization, CORS for connect with frontend, router and also create one .env.local file for PORT, MONGO_URI and JWT_SECRET.
In Client side I craete login & registeration pages with all the validation and JWT auth, Display all the bookmarks, Delete the Bookmark, Also add search functionality.



## Tech Stack

**Client:** React, TypeScript, HTML, CSS, BootStrap, React Router, Axios
**Server:** Mongoose, Express, Dotenv, Router, Cors




## Installation

Install Server & Run

```bash
 cd server
 npm install
 npm run dev
```

Install Client & Run

```bash
 cd client
 npm install
 npm run dev
```

## ENV Variables
##### PORT=5000, 
MONGO_URI=mongodb://localhost:27017/assignment, 
JWT_SECRET=secretKey
## API for testing

POST http://localhost:5000/register 
content-type: application/json

{
    "email": "nishtha@gmail.com",
    "password": "123456"
}

###
POST http://localhost:5000/login
content-type: application/json

{
    "email": "nishtha@gmail.com",
    "password": "123456"
}

###
GET http://localhost:5000/users


###
POST http://localhost:5000/addBookmark
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ZGYzZjk3YmRlMWZjZDQyYmJiZDhkZCIsImlhdCI6MTc3NjI0ODA4NSwiZXhwIjoxNzc2MjUxNjg1fQ.xB8A1gRQUdm6FxF-2BXmbHMkXQaDKfrySgCAT1whjAs

{
    "userId":"69df3f97bde1fcd42bbbd8dd",
    "url": "http://www.bookmyshow.com",
    "domain": ".com",
    "title":"BookmyShow",
    "description":"This is the bookmyshow domain",
    "tags":"xyz"
}

###
GET http://localhost:5000/getBookmarkById/69df484611c49b47e6ffec13

###
GET http://localhost:5000/getBookmark?search=Book

###
DELETE http://localhost:5000/delBookmark/69df484611c49b47e6ffec13

