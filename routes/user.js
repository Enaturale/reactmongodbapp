const express = require('express');

const router = express.Router();

const { createUser, userSignIn } = require('../controller/user');
const { isAuth } = require('../middleware/auth');
const { validateUserSignUp, userValidation, validateUserSignIn } = require('../middleware/Validation/user');
const User = require("../models/user")

//router for user Signup
router.post(
      '/create-user',
      validateUserSignUp,
      userValidation,
      createUser);

//router for signin
router.post('/sign-in', validateUserSignIn, userValidation, userSignIn);

//we need multer to iupload images
const multer = require('multer');
const storage = multer.memoryStorage();

//we need sharp to resize images
const sharp = require('sharp');

//to check if the file is an image file
const fileFilter = (req, res, cb) => {
      if (file.mimetype.startsWith('image')) {
            cb(null, true)
      } else {
            cb("Invalid image file!", false)
      }
}
const uploads = multer({ storage, fileFilter })

//router for uploading image
router.post('/upload-image', isAuth, uploads.single('profile'), async (req, res) => {
      const { user } = req

      if (!user) return res.status(401).json({ sucess: false, message: 'Unauthorized' })

      try {
            const profileBuffer = req.file.buffer
            const { width, height } = await sharp(profileBuffer).metadata()
            const finalProfileImage = await sharp(profileBuffer).resize(Math.round(width * 0.5), Math.round(height * 0.5)).toBuffer()

            await User.findByIdAndUpdate(user._id, { profileimage: finalProfileImage })

            res.status(201).json({success: true, message:"Profile is updated"})
      } catch (error) {
            res.status(500).json({success: false, message:"Server error"})

            console.log(error.message);
      }


})

module.exports = router