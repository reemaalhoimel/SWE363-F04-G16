const Moderator = require("../models/Moderator");
const router = require("express").Router();

// Get list of all moderators
router.get("/", async (req, res) => {
    try {
        const moderators = await Moderator.find(); // Await the result
        res.json(moderators); // Send the JSON response
    } catch (err) {
        res.status(400).json({ error: err.message }); // Handle errors
    }
});

// Add a new moderator to the database
router.post("/", async (req, res) => {
    try {
        const moderator = new Moderator(req.body); // Create new moderator from request body
        const savedModerator = await moderator.save(); // Save to database
        res.status(201).json(savedModerator); // Respond with the saved moderator
    } catch (err) {
        res.status(400).json({ error: err.message }); // Handle errors
    }
});

// Get a moderator by username
router.get("/:username", async (req, res) => {
    const { username } = req.params; // Extract username from the URL

    try {
        const moderator = await Moderator.findOne({ username }); // Query by username
        if (!moderator) {
            return res.status(404).json({ error: "Moderator not found" }); // Handle not found
        }
        res.json(moderator); // Send the moderator data
    } catch (err) {
        res.status(500).json({ error: err.message }); // Handle errors
    }
});

// Update a moderator by username
router.put("/:username", async (req, res) => {
    const { username } = req.params;
    const moderatorData = req.body;

    try {
        const result = await Moderator.updateOne({ username }, moderatorData); // Update by username
        if (result.matchedCount === 0) {
            return res.status(404).json({ error: "Moderator not found" });
        }
        res.sendStatus(204);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a moderator by username
router.delete("/:username", async (req, res) => {
    const { username } = req.params;

    try {
        const result = await Moderator.deleteOne({ username }); // Delete by username
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "Moderator not found" });
        }
        res.sendStatus(204);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;