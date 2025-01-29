const express = require('express');
const router = express.Router();


//Index - posts
router.get("/",(req, res)=>{
    res.send("GET for posts");
})

//show - users
router.get("/:id",(req, res)=>{
    res.send("GET FOR POSTS ID");
})

//POST - users
router.post("/", (req, res)=>{
    res.send("POST FOR POSTS");
})

//DELETE - users
router.delete("/:id",(req, res)=>{
    res.send("DELETE FOR POSTS ID");
})


module.exports = router;