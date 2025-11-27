const express = require("express")
const router = express.Router()
const {addproject, getprojectp, projectall} = require('../Controller/Projectcontr')

router.post('/addpro', addproject)

router.get('/getall', projectall)

router.get('/getp/:studentId', getprojectp)

module.exports= router