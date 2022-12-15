const mongoose = require('mongoose');

//users data to store in the database
// const user = {
//     name: '',
//     email:'',
//     password:'',
//     profileimage:''
// }

//this blueprint is called a schema
//next we determine the data and types
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    profileimage:{
        type: Buffer,
        // required: false,
    }

})


userSchema.statics.isThisEmailInUse = async function(email){
    if(!email) throw new Error("Invalid Entry")
    
    try {
        const user = await this.findOne({email})
        if(user) return false
      
        return true
        
    } catch (error) {
        console.log("Error is inside isThisEmailInUse method ", error.message);
        return false
        
    }
 
}

// userSchema.methods.isThisEmailInUse

// model.exports = 
module.exports =mongoose.model('User', userSchema)