import express from "express"
import mysql from "mysql"
import cors from "cors"

const app = express()

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"peter123",                                                                                            
    database:"marketplace"
})

app.use(express.json())
app.use(cors())


app.get("/", (req,res)=>{
    res.json("hello this is the backend hehe")
})

app.get("/dress", (req,res)=>{
    const q = "SELECT * FROM dress"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post("/dress", (req,res)=>{
    const q = "INSERT INTO dress (`title`,`description`,`price`,`image`)VALUES (?)"
    const values = [

        req.body.title,
        req.body.description,
        req.body.price,
    req.body.image
];

   

    db.query(q,[values], (err,data)=>{
        if(err)return res.json(err)
        return res.json("Dress has been purchased successfully")
    });
});
app.delete("/Dress/:id", (req, res) => {
    const DressId = req.params.id;
    const q = "DELETE FROM dress WHERE id = ?;";

    db.query(q, [DressId], (err, data) => {
        if (err) return res.json(err);
        return res.json("Dress has been deleted successfully");
    });
});

app.put("/Dress/:id", (req, res) => {
    const DressId = req.params.id;
    const q = "UPDATE dress SET `title`= ?, `description`= ?, `price`= ?, `image`= ? WHERE id = ?;";
    const values = [
        req.body.title,
        req.body.description,
        req.body.price,
        req.body.image,
        DressId,
    ];

    db.query(q, values, (err, data) => {
        if (err) return res.json(err);
        return res.json("Dress has been updated successfully");
    });
});

app.post("/signup", (req, res) => {
    const { username, password } = req.body;
    const q = "INSERT INTO users (username, password) VALUES (?, ?)";
    db.query(q, [username, password], (err, data) => {
        if (err) return res.json(err);
        return res.json("User registered successfully");
    });
});

app.post("/login", (req, res) => {
    const { username, password } = req.body;
    const q = "SELECT * FROM users WHERE username = ? AND password = ?";
    db.query(q, [username, password], (err, data) => {
        if (err) return res.json(err);
        if (data.length > 0) {
            return res.json("Login successful");
        } else {
            return res.status(401).json("Invalid username or password");
        }
    });
});


app.get("/logout", (req, res) => {
    return res.json("Logout successful");
});
app.listen(8800, ()=>{
console.log("connected to backend");
})