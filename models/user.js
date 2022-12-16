const mongoose = require('mongoose');

const bcrypted = require('bcrypt')

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
    confirmpassword:{
        type: String,
        required: true,
    },
    profileimage:{
        type: Buffer,
        // required: false,
    }

});

//schema to hash password before storing
userSchema.pre('save', function(next){
    if(this.isModified('password')){
        //to hash the password
        bcrypted.hash(this.password, 8, (err, hash) => {
            if(err) return next(err);

            this.password = hash;
            next();
        })
    }
});

//schema to compare password
userSchema.methods.comparePassword =  async function(password){
   if(!password) throw new Error('Password is missing.')

   try {
    const result =  await bcrypted.compare(password, this.password)
    return result;    
   } catch (error) {
    console.log("Error while comparing password. ", error.message);
    
   }
}

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