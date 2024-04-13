const { db } = require('../config/db');


// create users table
const createUsersTable = (req, res, next) => {
    try {
        const createUsersTableQuery = 
        `CREATE TABLE IF NOT EXISTS users (
            id INT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            phone VARCHAR(255) NOT NULL,
            website VARCHAR(255) NOT NULL,
            company VARCHAR(255) NOT NULL,
            city VARCHAR(255) NOT NULL
        )`
        db.query(createUsersTableQuery, (err, result) => {
            if(err){
                res.status(200).json({msg: "Error creating user table", err})
            }
            else next();
        })
    } catch (err) {
        res.status(500).json({msg: err});
    }
}


// exporting user table
module.exports = {
    createUsersTable
}