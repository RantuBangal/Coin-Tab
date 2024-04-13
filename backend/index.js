const express = require("express");
const cors = require("cors");
const exceljs = require('exceljs');
const { db } = require("./config/db");
const { createUsersTable } = require("./model/user.model");
const { createPostsTable } = require("./model/post.model");
const { userRouter } = require("./routes/user.routes");
const { postRouter } = require("./routes/post.route");
const PORT = 8080 ;


// initializing app
const app = express();


// middlewares
app.use(express.json());
app.use(express.text());
app.use(cors());
app.use('/users', createUsersTable, userRouter);
app.use('/posts', createPostsTable, postRouter);



// routes
app.get("/", (req, res) => {
    res.status(200).json({msg:"Cointab SE-ASSIGNMENT."})
})


// get all the on excel
app.get("/excel/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        // Parameterized query to prevent SQL injection
        const query = `SELECT * FROM posts WHERE userId = ?`;
        db.query(query, [userId], async (err, result) => {
            if (err) {
                return res.status(400).json({msg: "Error fetching posts for user", err });
            } else {
                const workbook = new exceljs.Workbook();
                const worksheet = workbook.addWorksheet('Posts');
                worksheet.columns = [
                    { header: 'ID', key: 'id' },
                    { header: 'Name', key: 'name' },
                    { header: 'Title', key: 'title' },
                    { header: 'Body', key: 'body' },
                    { header: 'Company', key: 'company' },
                ];
                result.forEach(post => worksheet.addRow({
                    id: post.id,
                    name: post.name,
                    title: post.title,
                    body: post.body,
                    company: post.company
                }));

                // Write the workbook to a buffer
                workbook.xlsx.writeBuffer().then(buffer => {
                    res.setHeader(
                        "Content-Type",
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    );
                    res.setHeader(
                        "Content-Disposition",
                        "attachment; filename=Posts.xlsx"
                    );
                    res.send(Buffer.from(buffer)); // Send the buffer as the response
                }).catch(err => {
                    console.error(err);
                    res.status(500).json({ msg: "Error generating Excel file" });
                });
            }
        });
    } catch (err) {
        console.error("Error generating Excel file:", err);
        res.status(500).json({ msg: "Internal server error" });
    }
});


// listening to the port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})