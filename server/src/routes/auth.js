import { Router } from "express";
const router = Router();
import { signUp, signIn } from "../controller/auth.js";
import { isRequestValidated, validateSignUpRequest, validateSignIpRequest } from "../validators/auth.js";


router.route("/signin").post(validateSignIpRequest, isRequestValidated, signIn);


router.route("/signup").post(validateSignUpRequest, isRequestValidated, signUp);


export default router;