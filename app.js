const express = require('express');
require('dotenv').config();

require('./models/db')

const User = require('./models/user')

const app = express()

const email = 'bukla@gmail.com'

app.post('/create-user', async (req, res) => {
    const isNewUser = await User.isThisEmailInUse(email)
    if (!isNewUser)
        return res.json({
            sucess: false,
            message: 'This email is already in the database. Try signing in.'
        })

    const user = await User({ name: 'Bukola', email: email, password: '1234' });
    //    user.isThisEmailInUse()
    res.json(user);
    await user.save()
})

app.get('/', (req, res) => {
    res.send("<h1>Hello World</h1>");
})

app.listen(8000, () => {
    console.log("port is listening");
})

// mongodb+srv://beeprojects:<password>@cluster0.aejlh2z.mongodb.net/?retryWrites=true&w=majority