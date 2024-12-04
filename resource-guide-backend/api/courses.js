const Course = require("../models/Course");
const router = require("express").Router();

// Get list of all courses
router.get("/", async (req, res) => {
    try {
        const courses = await Course.find(); // Await the result
        res.json(courses); // Send the JSON response
    } catch (err) {
        res.status(400).json({ error: err.message }); // Handle errors
    }
});

// Add a new course to the database
router.post("/", async (req, res) => {
    try {
        const course = new Course(req.body); // Create new course from request body
        const savedCourse = await course.save(); // Save to database
        res.status(201).json(savedCourse); // Respond with the saved course
    } catch (err) {
        res.status(400).json({ error: err.message }); // Handle errors
    }
});

// Get a course by code
router.get("/:code", async (req, res) => {
    const { code } = req.params; // Extract course code from the URL

    try {
        const course = await Course.findOne({ code }); // Query by course code
        if (!course) {
            return res.status(404).json({ error: "Course not found" }); // Handle not found
        }
        res.json(course); // Send the course data
    } catch (err) {
        res.status(500).json({ error: err.message }); // Handle errors
    }
});

// Update a course by code
router.put("/:code", async (req, res) => {
    const { code } = req.params;
    const courseData = req.body;

    try {
        const result = await Course.updateOne({ code }, courseData); // Update by course code
        if (result.matchedCount === 0) {
            return res.status(404).json({ error: "Course not found" });
        }
        res.sendStatus(204); // Successfully updated
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a course by code
router.delete("/:code", async (req, res) => {
    const { code } = req.params;

    try {
        const result = await Course.deleteOne({ code }); // Delete by course code
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "Course not found" });
        }
        res.sendStatus(204); // Successfully deleted
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;