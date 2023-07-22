const express = require('express')
const router = express.Router()
const{getVideoController , 
    postVideoController ,
    specificVideoController,
    votesVideoController,
    viewsVideoController} = require('../controllers/videos.controllers')

const postValidation = require('../validations/video.validations')  
const {votesValidation}= require('../validations/video.validations')  
const validate = require('../middlewares/validate')
router.get('/videos', getVideoController)
router.post('/videos', postVideoController)
router.get('/videos/:id' , specificVideoController)
router.patch('/videos/:id/votes',votesVideoController)
router.patch('/videos/:id/views' , viewsVideoController)
module.exports = router