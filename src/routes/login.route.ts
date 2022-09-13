import { Router } from "express";

import { Login } from "../controllers/login.controller";

const login = new Login();
const router = Router();

router.post("/", login.login);

export default router;
