const express = require("express");
const {
    createStat,
    getAllStats,
    updateStat,
    deleteStat,
    getAvailableCollections
} = require("../controllers/statsController");
const { authenticateUser, authorizeRoles } = require("../middelware/authMiddelware");

const router = express.Router();

// Create a new stat
router.post(
    "/createStat",
    authenticateUser,
    authorizeRoles(["admin", "editor", "moderator"]),
    createStat
);

// Get all stats
router.get("/", getAllStats);

// Update a stat by ID
router.put(
    "/:id",
    authenticateUser,
    authorizeRoles(["admin", "editor", "moderator"]),
    updateStat
);

// Delete a stat by ID
router.delete(
    "/:id",
    authenticateUser,
    authorizeRoles(["admin", "editor", "moderator"]),
    deleteStat
);

router.get("/available-collections", getAvailableCollections);


module.exports = router;
