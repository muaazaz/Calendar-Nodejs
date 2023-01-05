const express = require('express')
const controller = require('../controllers/eventCont')
const auth = require('../middleware/auth')
const router = express.Router()

//Form page for a new event 
router.get('/create_event',controller.get_create_event)
//To create a new event in DB
router.post('/events', controller.create_event)
//To fetch all events from db
router.get('/schedule',auth,controller.schedule)
//To render calendar page
router.get('/events',auth,controller.events)
//Form page for a new all day event
router.get('/allday', auth,controller.get_allday_page)
//To fetch all allday events from DB
router.get('/alldayevents',auth, controller.get_allday)
//To Create a new allday event
router.post('/allday', auth,controller.post_allday)
//To delete a event from db
router.get('/delete/event/:id', auth, controller.delete_evt)
//To  delete a allday event from db
router.get('/delete/alldayevent/:id', auth, controller.allday_delete_evt)
//To render edit page form
router.get('/edit/:id', auth, controller.edit_evt_page)
//To render allday event edit page
router.get('/alldayedit/:id', auth, controller.edit_allevt_page)
//To edit a timely event in DB
router.post('/edit/:id', auth, controller.edit_evt)
//To edit a allday event in DB
router.post('/alldayedit/:id', auth, controller.edit_allevt)



module.exports = router