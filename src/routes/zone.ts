import { Router } from "express";
import { schemaValidator } from "../middleware/schemaValidator";
import { createZoneOnlySchema, createZoneSchema, deleteOneZoneSchema, getOneZoneSchema, getZonesSchema, updateOneZoneSchema } from "../schemas/zone.schema";
import { checkJwt } from "../middleware/session";
import { createOnlyZoneCtrl, createZoneCtrl, deleteOneZoneCtrl, getOneZoneCtrl, getZonesCtrl, updateOneZoneCtrl } from "../controllers/zone";

const router = Router();

router.get('/', checkJwt, schemaValidator(getZonesSchema), getZonesCtrl);
router.get('/:id', checkJwt, schemaValidator(getOneZoneSchema), getOneZoneCtrl);
router.post('/create', checkJwt, schemaValidator(createZoneSchema), createZoneCtrl);
router.post('/only', checkJwt, schemaValidator(createZoneOnlySchema), createOnlyZoneCtrl);
router.delete('/:id', checkJwt, schemaValidator(deleteOneZoneSchema), deleteOneZoneCtrl);
router.put('/only/:id', checkJwt, schemaValidator(updateOneZoneSchema), updateOneZoneCtrl);
export {router};


