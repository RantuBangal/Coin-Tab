const { db } = require("../config/db");


// user details attacher
const userDetailsAttacher = (req, res, next) => {
    try {
        const { userId } =  req.body;
        const userFindQuery = `SELECT * FROM users WHERE id = ${userId}`;
        db.query(userFindQuery, (err, result) => {
            if(err || result.length === 0) {
                res.status(200).json({"Error Finding user": err})
            }
            else {
                req.body.name = result[0].name;
                req.body.company = result[0].company;
                req.body.userId = result[0].id;
                next();
            }
        })

    } catch(error) {

    }
}


// exporting user details attacher
module.exports = {
    userDetailsAttacher
}