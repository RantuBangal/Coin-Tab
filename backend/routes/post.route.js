const express = require("express");
const { db } = require("../config/db");
const { userDetailsAttacher } = require("../middlewares/userAttacher.middleware");


// router middleware
const postRouter = express.Router();


// post routes

// add new post
postRouter.post("/add", userDetailsAttacher, (req, res) => {
    try {
        const { id, name, title, body, company, userId } = req.body;
        const query = `INSERT INTO posts (id, name, title, body, company, userId) VALUES (?, ?, ?, ?, ?, ?)`
        db.query(query, [id, name, title, body, company, userId], (err, result) => {
            if (err) res.status(400).json({msg: "Error adding new post", err})
            else res.status(200).json({"Added all Posts": result})
        } )
    } catch (err) {
        res.status(500).json({msg: err})
    }
})


// get all posts of user by id
postRouter.get("/:userId", (req, res) => {
    try {
        const { userId } = req.params;
        const query = `SELECT * FROM posts WHERE userId = ?`
        db.query(query, [userId], (err, result) => {
            if (err) {
                res.status(400).json({msg: "Error Getting Posts for user", err})
            }
            else res.status(200).json({"Posts": result})
        } )
    } catch (err) {
        res.status(500).json({msg: err})
    }
})


// exporting post router
module.exports = {
    postRouter
}