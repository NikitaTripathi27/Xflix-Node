const {objectId} = require('../validations/custom.validation')
const Joi = require('joi')
const {voteTypes , voteValue} = require('../utils/value')
const  videoValidation = {
    body: Joi.object().keys({
        title:Joi.string().required(),
        genre:Joi.string().required(),
        contentRating:Joi.string().required(),
        releaseDate:Date.now(),
        previewImage:Joi.string().required(),
        videoLink:Joi.string().required()  
    })
}

const votesValidation ={
    params:Joi.object().keys({
        id:Joi.string().custom(objectId)
    }),

    body:Joi.object().keys({
        vote:Joi.string().required().valid(...voteTypes),
        change:Joi.string().required().valid(...voteValue)
    })
}

module.exports = {videoValidation ,votesValidation}
