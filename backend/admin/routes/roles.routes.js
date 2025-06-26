const express = require("express");
const router = express.Router();
const {
  create,
  getAll,
  getOne,
  update,
  deleteRole,
} = require("../controllers/roles.controller");
const { checkPermissions } = require("../../middleware/checkPermissions");
const { auth } = require("../../middleware/auth");

// Create a new role
router.post("/create", auth, checkPermissions("create-role"), create);
router.get("/", auth, checkPermissions("list-roles"), getAll);
router.post("/update/:id", auth, checkPermissions("update-role"), update);
router.delete("/delete/:id", auth, checkPermissions("delete-role"), deleteRole);
// Get all roles
module.exports = router;
