const express = require('express');
require('dotenv').config();

require('./models/db')

const userRouter = require('./routes/user')

const User = require('./models/user')

const app = express()

//the middleware function
// app.use((req, res, next) => {
//     req.on('data', chunk => {
//       const data = JSON.parse(chunk)
//       req.body = data;
//       next();
//     })
   
// })

app.use(express.json());
app.use(userRouter)

app.get('/test', (req,res) => {
    res.send("Hello World")
})


app.get('/', (req, res) => {
    res.send("<h1>Hello World</h1>");
})

app.listen(8000, () => {
    console.log("port is listening");
})

// mongodb+srv://beeprojects:<password>@cluster0.aejlh2z.mongodb.net/?retryWrites=true&w=majority