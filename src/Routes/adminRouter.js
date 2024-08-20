import express from "express";
import {
    registerAdmin,
    getAllAdmins,
    updateAdminById,
    deleteAdminById,
    getAdminById,
} from "../Controllers/adminController.js";

const router = express.Router();

// Define routes
router.get("/admin", getAllAdmins);
router.get("/admin/:id", getAdminById);
router.post("/admin/register", registerAdmin);
router.put("/admin/update/:id", updateAdminById);
router.delete("/admin/delete/:id", deleteAdminById);

export default router;
