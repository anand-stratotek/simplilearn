const mongoose = require('mongoose');
const config = require('config');
const { check, validationResult } = require('express-validator');
const bcyrpt = require('bcryptjs');
const express = require('express');
const Users = require('../../models/Users');
const router = express.Router();
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

//@route  POST api/user
//@desc   Register User
//@access Public

router.post(
  '/',
  [
    check('email', 'Please enter valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more character'
    ).isLength({
      min: 6,
    }),
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    try {
      //See if user exists
      let user = await Users.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ mgs: 'User already exists' }] });
      }

      user = new Users({
        email,
        password,
      });

      //Encrypting the password using bcrypt

      //Creating a Salt
      const salt = await bcyrpt.genSalt(10);
      //Creating the hashed password
      user.password = await bcyrpt.hash(password, salt);

      //Saving the user in database
      await user.save();

      //Getting Secret key form config
      const secretKey = config.get('jwtSecret');
      //Creating a Payload
      const payload = {
        user: {
          id: user.id, //with mongoose we can use id instead _id
        },
      };

      //return json webtoken

      jwt.sign(payload, secretKey, { expiresIn: 36000 }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
