const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
    start:{
        type: String
    },end:{
        type: String
    },item:{
        type: String
    },location:{
        type: String
    },owner:{
        type: mongoose.Types.ObjectId
    },
    strt:{
        type:Number
    }
},{
    timestamps: true
})

const Event = mongoose.model('event',eventSchema)

module.exports = Event