import { Router } from "express";
import { schemaValidator } from "../middleware/schemaValidator";
import { loginSchema, registerDriveSchema, registerOwnerSchema } from "../schemas/auth.schema";
import { loginCtrl, registerDriveCrtl, registerOwnerCrtl } from "../controllers/auth";
import { checkJwt } from "../middleware/session";
import { getFaker } from "../config/faker";

const router = Router();

router.get('/', getFaker);
export {router};