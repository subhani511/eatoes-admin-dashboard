const express = require("express");
const router = express.Router();

const {
  getAllMenuItems,
  getMenuItemById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  toggleAvailability,
  searchMenuItems,
} = require("../controllers/menuController");

router.get("/", getAllMenuItems);
router.get("/search", searchMenuItems);
router.get("/:id", getMenuItemById);
router.post("/", createMenuItem);
router.put("/:id", updateMenuItem);
router.delete("/:id", deleteMenuItem);
router.patch("/:id/availability", toggleAvailability);

module.exports = router;
