import { Router } from "express";
import catalogRoutes from "./catalogRoutes.js";
import cartRoutes from "./cartRoutes.js";

const router = Router();

router.get("/health", (req, res) => res.json({ status: "ok" }));
router.use("/", catalogRoutes);
router.use("/cart", cartRoutes);

export default router;
