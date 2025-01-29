const express = require('express');
const router = express.Router();

//Index - users
router.get("/",(req, res)=>{
    res.send("GET for users");
})

//show - users
router.get("/:id",(req, res)=>{
    res.send("GET FOR USER ID");
})

//POST - users
router.post("/", (req, res)=>{
    res.send("POST FOR USERS");
})

//DELETE - users
router.delete("/:id",(req, res)=>{
    res.send("DELETE FOR USER ID");
})


module.exports = router;