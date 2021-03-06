const express = require('express')
const router = express.Router()
const burger = require('../models/burger')

// router page

// load index handlebars file
router.get("/", async function(req, res){
    const data = await burger.selectAll()

    var hbsObject = {
        burgers: data
    }
    console.log('[router GET]', hbsObject)
    res.render("index", hbsObject)
})

// POST newBurger to Menu list
router.post("/api/burgers", async function(req, res){
    console.log('[router POST] reached ..')
    const data = await burger.insertOne({
        burger_string: req.body.name
    })
    console.log('[router POST]', data)
    res.json(data)
})

// change devoured from false to true
router.put("/api/burgers/:id", async function(req, res){
    const id = req.body.id
    const data = await burger.updateOne(id)
    console.log('router PUT', data)
    res.json(data)
})

module.exports = router