const express = require('express')
const router = express.Router()
const path = require('path')


router.get('^/$|/index(.html)?', (req,res) => { //Regex
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
}) 

module.exports = router