const { db } = require('../config/db');


// create posts table
const createPostsTable = (req, res, next) => {
    try {
        const createPostsTableQuery = 
        `CREATE TABLE IF NOT EXISTS posts (
            id INT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            title VARCHAR(255) NOT NULL,
            body VARCHAR(255) NOT NULL,
            company VARCHAR(255) NOT NULL,
            userId INT NOT NULL
        )`
        db.query(createPostsTableQuery, (err, result) => {
            if(err) {
                res.status(200).json({msg: "Error creating post table", err})
            }
            else next();
        })
    } catch (err) {
        res.json({msg: err});
    }
}


// exporting post table
module.exports = {
    createPostsTable
}