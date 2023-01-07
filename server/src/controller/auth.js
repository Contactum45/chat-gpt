import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import shortid from "shortid";
export const signUp = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
     return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Please Provide Required Information",
     });
  }

  const hash_password = bcrypt.hashSync(req.body.password, 8);
 
  const userData = {
     username,
     email,
     hash_password,
  };

  const user = await User.findOne({ email });
  if (user) {
     return res.status(StatusCodes.BAD_REQUEST).json({
        message: "User already registered",
     });
  } else {
   User.create(userData).then((data, err) => {
     if (err) {
      res.status(StatusCodes.BAD_REQUEST).json({ message:err });
     }
     else {
      const jwtKey = process.env.JWT_SECRET
      const userId = data._id
      const token = jwt.sign({ userId }, jwtKey, {
        algorithm: "HS256",
        expiresIn: 5000000,
      })
       res
        .status(StatusCodes.CREATED)
        .json({ message: "User created Successfully", token: token });
     }
     });
  }
};
export const signIn = async (req, res) => {
  try {
   const {email, password } = req.body;
     if (!email || !password) {
        res.status(StatusCodes.BAD_REQUEST).json({
           message: "Please enter email and password",
        });
     }
 
     const user = await User.findOne({ email: email });
    
     if (user) {
      var passwordIsValid = bcrypt.compareSync(
         password,
         user.hash_password
       );
     if (passwordIsValid) {
      const jwtKey = process.env.JWT_SECRET
      const userId = user._id
      const token = jwt.sign({ userId }, jwtKey, {
        algorithm: "HS256",
        expiresIn: 5000000,
      })
  const { _id, username, email } = user;
  res.status(StatusCodes.OK).json({
   token,
       user: { _id, username, email },
  });
 } else {
  res.status(StatusCodes.UNAUTHORIZED).json({
     message: "Incorrect password..",
  });
 }
} else {
  res.status(StatusCodes.BAD_REQUEST).json({
      message: "User does not exist..!",
  });
}
} catch (error) {
   res.status(StatusCodes.BAD_REQUEST).json({message: "Something went wrong..."});
  }
};
