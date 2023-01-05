const mongoose = require('mongoose')

const alldayeventSchema = new mongoose.Schema({
    time:{
        type: String
    },item:{
        type: String
    },location:{
        type: String
    },owner:{
        type: mongoose.Types.ObjectId
    }
},
{
    timestamps:true
})

const AlldayEvent = mongoose.model('alldayevent',alldayeventSchema)

module.exports = AlldayEvent