import { Router } from "express";
import { cartController } from "../controllers/cartController.js";
import { validate } from "../middleware/validate.js";
import {
  addItemSchema,
  updateItemSchema,
  cartParamsSchema,
} from "../validation/schemas.js";

const router = Router();

router.get("/", cartController.getCart);
router.post("/items", validate(addItemSchema, "body"), cartController.addItem);
router.patch(
  "/items/:productId",
  validate(cartParamsSchema, "params"),
  validate(updateItemSchema, "body"),
  cartController.updateItem
);
router.delete(
  "/items/:productId",
  validate(cartParamsSchema, "params"),
  cartController.removeItem
);

export default router;
