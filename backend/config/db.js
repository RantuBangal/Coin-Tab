const mysql2 = require("mysql2");
require("dotenv").config();


// connecting to DB
const db = mysql2.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
    port: process.env.port
})

db.connect((err)=>{
    if(err) console.log(`error connecting ${err}`);
    else console.log(`Connected to DB`)
})


// exports db
module.exports = {
    db
}