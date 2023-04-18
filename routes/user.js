const express = require("express");
const { check, validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const auth = require("../middleware/auth");

const User = require("../model/User"); //default citename/User, look below for what follows
const Club_info = require("../model/Club_Info"); //default citename/User, look below for what follows

/**
 * @method - POST
 * @param - /signup
 * @description - User SignUp
 */

// Define payload outside the router function
// Define a new endpoint for getting all posts
router.get("/allposts", async (req, res) => {
  try {
    // Query the database for all posts
    const allPosts = await Club_info.find().sort({ createdAt: -1 });

    // Return all the posts in the response
    res.json(allPosts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Define a new endpoint for getting a specific club by name
router.get("/specific_club/:name", async (req, res) => {
  try {
    // Extract the club name from the request parameters
    const name = req.params.name;

    // Query the database for the club with the given name
    const club = await Club_info.findOne({ name });

    // Return the club in the response
    if (!club) {
      return res.status(404).json({ msg: "Club not found" });
    }

    res.json(club);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post(
  "/clubsignup",
  [
    check("name", "Please Enter a Valid Club name"),
    check("tags", "Club tag"),
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

    const { name, tags, description } = req.body;
    try {
      let newClub = await Club_info
      .findOne({
        name
      });
      if (newClub) {
        return res.status(400).json({
          msg: "Club Already Exists"
        });
      }

      newClub = new Club_info
      ({
        name,
        tags,
        description
      });


      await newClub.save();

      const payload = {
        newClub: {
          id: name.id
        }
      };

      jwt.sign(
        payload,
        "randomString",
        {
          expiresIn: 10000
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            token
          });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send("NICE NEW CLUB ADDED");
    }
  }
);


router.post(
  "/signup",
  [
    check("username", "Please Enter a Valid Username")
      .not()
      .isEmpty(),
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

    const { username, email, password } = req.body;
    try {
      let user = await User.findOne({
        email
      });
      if (user) {
        return res.status(400).json({
          msg: "User Already Exists"
        });
      }

      user = new User({
        username,
        email,
        password
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        "randomString",
        {
          expiresIn: 10000
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            token
          });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Error in Saving");
    }
  }
);


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
