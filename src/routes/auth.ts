import { Request, Response, Router } from "express";
import {TokenValidation} from "../libs/validateToken"

const router: Router = Router();

import {singIn, singUp, Profile} from "../controllers/auth.controllers"

router.post("/singup", singUp)
router.post("/singin", singIn)

router.get("/profile", TokenValidation, Profile)


export default router;