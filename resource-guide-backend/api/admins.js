const Admin = require("../models/Admin");
const router = require("express").Router();

// Get list of all admins
router.get("/", async (req, res) => {
    try {
        const admins = await Admin.find(); // Await the result
        res.json(admins); // Send the JSON response
    } catch (err) {
        res.status(400).json({ error: err.message }); // Handle errors
    }
});

// Add a new admin to the database
router.post("/", async (req, res) => {
    try {
        const admin = new Admin(req.body); // Create new admin from request body
        const savedAdmin = await admin.save(); // Save to database
        res.status(201).json(savedAdmin); // Respond with the saved admin
    } catch (err) {
        res.status(400).json({ error: err.message }); // Handle errors
    }
});

// Get an admin by username
router.get("/:username", async (req, res) => {
    const { username } = req.params; // Extract username from the URL

    try {
        const admin = await Admin.findOne({ username }); // Query by username
        if (!admin) {
            return res.status(404).json({ error: "Admin not found" }); // Handle not found
        }
        res.json(admin); // Send the admin data
    } catch (err) {
        res.status(500).json({ error: err.message }); // Handle errors
    }
});

// Update an admin by username
router.put("/:username", async (req, res) => {
    const { username } = req.params;
    const adminData = req.body;

    try {
        const result = await Admin.updateOne({ username }, adminData); // Update by username
        if (result.matchedCount === 0) {
            return res.status(404).json({ error: "Admin not found" });
        }
        res.sendStatus(204);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete an admin by username
router.delete("/:username", async (req, res) => {
    const { username } = req.params;

    try {
        const result = await Admin.deleteOne({ username }); // Delete by username
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "Admin not found" });
        }
        res.sendStatus(204);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
