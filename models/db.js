//connecting the app to MONGO DB using Mongoose
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

mongoose.connect(process.env.MONGO_URI, 
        {useNewUrlParser: true,  })
        .then(() => {
            console.log("Our Database is connected")
        }).catch(err => console.log(err.message));