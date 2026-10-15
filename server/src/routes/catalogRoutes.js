import { Router } from "express";
import { catalogController } from "../controllers/catalogController.js";
import { validate } from "../middleware/validate.js";
import {
  productQuerySchema,
  productIdSchema,
} from "../validation/schemas.js";

const router = Router();

router.get("/categories", catalogController.listCategories);
router.get(
  "/products",
  validate(productQuerySchema, "query"),
  catalogController.listProducts
);
router.get(
  "/products/:id",
  validate(productIdSchema, "params"),
  catalogController.getProduct
);

export default router;
