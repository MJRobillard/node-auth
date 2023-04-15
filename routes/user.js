const express = require("express");
const { check, validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const auth = require("../middleware/auth");

const User = require("../model/User"); //default citename/User, look below for what follows

/**
 * @method - POST
 * @param - /signup
 * @description - User SignUp
 */

router.post(
  "/club_post",
  [
    check("club_name", "Please enter a valid club name").not().isEmpty(),
    check("description", "Please enter a valid description").isLength({
      min: 6
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const { club_name, description } = req.body;

    const payload = {
      description: {
        desc: description
      },
      club_name: {
        name: club_name
      }
    };

    try {
      // Save the payload to the JSON file or database here
      res.status(200).json({
        message: "Club post created successfully",
        payload: payload
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({
        message: "Server Error"
      });
    }
  }
);

router.get("/club_description/:name", async (req, res) => {
  const { name } = req.params;

  try {
    // Find the club in the database or JSON file based on the given name
    const club = await Club.findOne({ name });
    if (!club) {
      return res.status(404).json({
        message: "Club not found"
      });
    }

    const { description } = club;
    res.status(200).json({
      message: "Club description retrieved successfully",
      description: description
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "Club get Server Error"
    });
  }
});

router.post(
  "/login",
  [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid password").isLength({
      min: 6
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({
        email
      });
      if (!user)
        return res.status(400).json({
          message: "User Not Exist"
        });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({
          message: "Incorrect Password !"
        });

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        "randomString",
        {
          expiresIn: 3600
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            token
          });
        }
      );
    } catch (e) {
      console.error(e);
      res.status(500).json({
        message: "Server Error"
      });
    }
  }
);

/**
 * @method - POST
 * @description - Get LoggedIn User
 * @param - /user/me
 */


router.get("/me", auth, async (req, res) => {
  try {
    // request.user is getting fetched from Middleware after token authentication
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (e) {
    res.send({ message: "Error in Fetching user" });
  }
});


module.exports = router;
