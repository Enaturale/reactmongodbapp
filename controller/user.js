//importing the jsonwebtoken
const jwt = require('jsonwebtoken')

const User = require('../models/user')
exports.createUser = async (req, res) => {
    const {name, email, password, confirmpassword} = req.body
    const isNewUser = await User.isThisEmailInUse(email)
    if (!isNewUser)
        return res.json({
            sucess: false,
            message: 'This email is already in the database. Try signing in.'
        })

    const user = await User({ name, email, password, confirmpassword });
    //    user.isThisEmailInUse()
    res.json(user);
    await user.save()
};

//method for signin
exports.userSignIn = async (req, res) => {
    // res.send('Sign In')
    const {email, password} = req.body
    const user = await User.findOne({email})

    if(!user) return res.json({sucess:false, message:"User not found with the given email!"})

    const isMatch = await user.comparePassword(password)

    if(!isMatch) return res.json({sucess:false, message:"Password does not match"})

    //using the web token for validation
    const token = jwt.sign({userId: user._id }, process.env.JWT_SECRET, {expiresIn: '1d'})

    res.json({sucess: true,user, token})
}