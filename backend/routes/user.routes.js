const express = require("express");
const { db } = require("../config/db");


// router middleware
const userRouter = express.Router();


// user routes
userRouter.get("/", (req, res) => {
    try {
        const query = `SELECT * FROM users`
        db.query(query, [], (err, result) => {
            if (err) {
                res.status(400).json({msg:"Error getting user", err})
            }
            else res.status(200).json({"Users":result})
        } )
    } catch (err) {
        res.status(500).json({msg:"Internal Server Error", err})
    }
})


// get single user by id
userRouter.get("/:id", (req, res) => {
    try {
        const { id } = req.params;
        const query = `SELECT * FROM users WHERE id = ${id}`
        db.query(query, [], (err, result) => {
            if (err) {
                res.status(400).json({msg:"Error getting user by id", err})
            }
            else res.status(200).json({"User":result})
        } )
    } catch (err) {
        res.status(500).json({msg: "Internal Server Error", err})
    }
})


// add new user
userRouter.post("/add", (req, res) => {
    try {
        console.log(req.body)
        const { id, name, email, phone, website, company, city } = req.body;
        const query = `INSERT INTO users (id, name, email, phone, website, company, city) VALUES (?, ?, ?, ?, ?, ?, ?)`
        db.query(query, [id, name, email, phone, website, company, city], (err, result) => {
            if (err) {
                // console.log(err)
                res.status(400).json({msg:"Error adding user", err})
            }
            else res.status(200).json({"Added User":result})
        } )
    } catch (err) {
        res.status(500).json({msg: "Internal Server Error", err})
    }
})





// exporting user router
module.exports = {
    userRouter
} 
