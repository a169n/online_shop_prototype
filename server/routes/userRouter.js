const express = require("express");

const {
  getAllUsers,
  getUserById,
  deleteUserById,
  createNewUser,
  updateUserById,
  searchUsers,
  makeUserAdminById
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/users", getAllUsers);
router.get("/users/search", searchUsers);
router.get("/user/:id", getUserById);
router.post("/user", createNewUser);
router.put("/user/:id", updateUserById);
router.put("/user/:id/make-admin", makeUserAdminById);
router.delete("/user/:id", protect, deleteUserById);

module.exports = router;
