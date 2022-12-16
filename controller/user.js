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
}
