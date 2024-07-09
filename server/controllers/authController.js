import User from "../models/model.User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  // Implement the registration logic here

  try {
    // hashing password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
      photo: req.body.photo,
    });

    await newUser.save();
    res.status(200).json({ success: true, message: "Successfully created" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to create user." });
  }
};

// user login
export const login = async (req, res) => {
  const email = req.body.email;

  try {
    const user = await User.findOne({
      email,
    });

    // if user is not found
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // check for password if user exists

    const checkCorrectPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    // if password is incorrect
    if (!checkCorrectPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect password" });
    }

    const { password, role, ...rest } = user._doc;

    // create token
    const token = jwt.sign(
      {
        id: user._id,

        role: user.role,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "15d" }
    );

    // set token in the browser cookies and send response to the client

    res
        .cookie('accessToken', token, {
            httpOnly: true,
            expires: token.expiresIn
        })
        .status(200)
        .json({
            token,
            data: { ...rest },
            role,
        })
  } catch (err) {
    res.status(500).json({success:false, message: 'Failed to login'})
  }
};
