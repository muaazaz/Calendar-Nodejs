const express = require('express')
const controller = require('../controllers/eventCont')
const auth = require('../middleware/auth')
const router = express.Router()

router.get('/create_event',controller.get_create_event)

router.post('/events', controller.create_event)

router.get('/schedule',auth,controller.schedule)

router.get('/events',auth,controller.events)

router.get('/allday', auth,controller.get_allday_page)

router.get('/alldayevents',auth, controller.get_allday)

router.post('/allday', auth,controller.post_allday)

router.get('/delete/event/:id', auth, controller.delete_evt)

router.get('/delete/alldayevent/:id', auth, controller.allday_delete_evt)

router.get('/edit/:id', auth, controller.edit_evt_page)

router.get('/alldayedit/:id', auth, controller.edit_allevt_page)

router.post('/edit/:id', auth, controller.edit_evt)

router.post('/alldayedit/:id', auth, controller.edit_allevt)



module.exports = router