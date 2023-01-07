import { check, validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";


export const validateSignUpRequest = [
check("username").notEmpty().withMessage("Username is required"),
check("email").isEmail().withMessage("Valid Email required"),
check("password")
   .isLength({ min: 2 })
   .withMessage("Password must be at least 2 character long"),
];
export const validateSignIpRequest = [
check("email").isEmail().withMessage("Valid Email required"),
check("password")
    .isLength({ min: 2 })
    .withMessage("Password must be at least 2 character long"),
]
export const isRequestValidated = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.array().length > 0) {
      return res
              .status(StatusCodes.BAD_REQUEST)
              .json({ message: errors.array()[0].msg });
  }
  next();
};
