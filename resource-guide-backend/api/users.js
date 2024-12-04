const User = require("../models/User");
const router = require("express").Router();

// Get list of all users
router.get("/", async (req, res) => {
    try {
        const users = await User.find(); // Await the result
        res.json(users); // Send the JSON response
    } catch (err) {
        res.status(400).json({ error: err.message }); // Handle errors
    }
});

// Add a new user to the database
router.post("/", async (req, res) => {
    try {
        const user = new User(req.body); // Create new user from request body
        const savedUser = await user.save(); // Save to database
        res.status(201).json(savedUser); // Respond with the saved user
    } catch (err) {
        res.status(400).json({ error: err.message }); // Handle errors
    }
});

// Get an user by username
router.get("/:username", async (req, res) => {
    const { username } = req.params; // Extract username from the URL

    try {
        const user = await User.findOne({ username }); // Query by username
        if (!user) {
            return res.status(404).json({ error: "User not found" }); // Handle not found
        }
        res.json(user); // Send the user data
    } catch (err) {
        res.status(500).json({ error: err.message }); // Handle errors
    }
});

// Update a user by username
router.put("/:username", async (req, res) => {
    const { username } = req.params;
    const userData = req.body;

    try {
        const result = await User.updateOne({ username }, userData); // Update by username
        if (result.matchedCount === 0) {
            return res.status(404).json({ error: "User not found" });
        }
        res.sendStatus(204);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a user by username
router.delete("/:username", async (req, res) => {
    const { username } = req.params;

    try {
        const result = await User.deleteOne({ username }); // Delete by username
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "User not found" });
        }
        res.sendStatus(204);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;