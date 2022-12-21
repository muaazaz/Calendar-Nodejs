const Event = require('../models/event')
const Allday = require('../models/allday')

const get_create_event = (req, res)=>{
    res.render('event',{title:'Create Event'})
}
const create_event = async(req, res)=>{
    try {
        const event = new Event(req.body)
        await event.save()
        res.send({})
    } catch (e) {
        console.log(e)
    }
}
const schedule = async(req, res)=>{
    try {
        const events =await Event.find({owner: req.user._id})
        res.send({events})
    } catch (e) {
        console.log(e)
    }
}
const events = async(req, res)=>{
    try {
        res.render('calender',{title:'Schedule'})
    } catch (e) {
        console.log(e)
    }
}
const get_allday_page = async(req, res)=>{
    res.render('allday',{title:'All Day'})
}
const post_allday = async(req, res)=>{
    try {
        const event = new Allday(req.body)
        await event.save()
        res.send({})
    } catch (e) {
        console.log(e)
    }
}
const get_allday = async(req, res)=>{
    try {
        const events = await Allday.find({owner: req.user._id})
        res.send({events})
    } catch (e) {
        console.log(e)
    }
}
const delete_evt = async(req, res)=>{
    try {
        
        const id = req.params.id
        await Event.findByIdAndDelete(id)
        res.redirect('/events')
    } catch (e) {
        console.log(e)
    }
}
const allday_delete_evt = async(req, res)=>{
    try {
        const id = req.params.id
        await Allday.findByIdAndDelete(id)
        res.redirect('/events')
    } catch (e) {
        console.log(e)
    }
}
const edit_evt_page = async(req,res)=>{
    try {
        const id = req.params.id
        const event = await Event.findById(id)
        res.render('edit',{title:'Editing Page',event})
    } catch (e) {
        console.log(e)
    }
}

const edit_allevt_page = async(req, res)=>{
    try {
        const id = req.params.id
        const daily = await Allday.findById(id)
        res.render('alldayedit',{title:'Editing Page',daily})
    } catch (e) {
        console.log(e)
    }
}
const edit_evt = async(req,res)=>{
    try {
        const id = req.params.id
        const event = await Event.findById(id)
        event.start = req.body.start
        event.end = req.body.end
        event.item = req.body.item
        event.location = req.body.location
        await event.save()
        res.send()
    } catch (e) {
        console.log(e)
    }
}

const edit_allevt = async(req, res)=>{
    try {
        const id = req.params.id
        const daily = await Allday.findById(id)
        daily.item = req.body.item
        daily.location = req.body.location
        await daily.save()
        res.send()
    } catch (e) {
        console.log(e)
    }
}

module.exports = {
    get_create_event,
    create_event,
    schedule,
    events,
    get_allday_page,
    post_allday,
    get_allday,
    delete_evt,
    allday_delete_evt,
    edit_evt_page,
    edit_allevt_page,
    edit_allevt,
    edit_evt
}