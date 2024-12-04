const Post = require("../models/Post");
const router = require("express").Router();

// Get list of all posts
router.get("/", async (req, res) => {
    try {
        const posts = await Post.find(); // Await the result
        res.json(posts); // Send the JSON response
    } catch (err) {
        res.status(400).json({ error: err.message }); // Handle errors
    }
});

// Add a new post to the database
router.post("/", async (req, res) => {
    try {
        const post = new Post(req.body); // Create new post from request body
        const savedPost = await post.save(); // Save to database
        res.status(201).json(savedPost); // Respond with the saved post
    } catch (err) {
        res.status(400).json({ error: err.message }); // Handle errors
    }
});

// Get all posts for a specific courseCode
router.get("/:courseCode", async (req, res) => {
    const { courseCode } = req.params;

    try {
        const posts = await Post.find({ courseCode }); // Fetch posts by courseCode
        if (posts.length === 0) {
            return res.status(404).json({ error: "No posts found for this courseCode" });
        }
        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get a specific post by courseCode and id
router.get("/:courseCode/:id", async (req, res) => {
    const { courseCode, id } = req.params;

    try {
        const post = await Post.findOne({ courseCode, id }); // Fetch post by courseCode and id
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }
        res.json(post);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a post by courseCode and id
router.put("/:courseCode/:id", async (req, res) => {
    const { courseCode, id } = req.params;
    const postData = req.body;

    try {
        const result = await Post.updateOne({ courseCode, id }, postData); // Update by courseCode and id
        if (result.matchedCount === 0) {
            return res.status(404).json({ error: "Post not found" });
        }
        res.sendStatus(204); // Successfully updated
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a post by courseCode and id
router.delete("/:courseCode/:id", async (req, res) => {
    const { courseCode, id } = req.params;

    try {
        const result = await Post.deleteOne({ courseCode, id }); // Delete by courseCode and id
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "Post not found" });
        }
        res.sendStatus(204); // Successfully deleted
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;