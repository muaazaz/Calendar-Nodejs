const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const userRouter = require('./routers/user')
const eventRouter = require('./routers/event')
const userCheck = require('./middleware/userCheck')

const app = express()

app.use(express.static('public'))
app.use(express.json())
app.use(cookieParser())
app.set('view engine','ejs')


app.get('*',userCheck)
app.use(eventRouter)
app.use(userRouter)

mongoose.set('strictQuery', true)
mongoose.connect(process.env.DATABASE_URI).then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log('App is up in running at PORT: ' + process.env.PORT)
    })
})

app.get('/',(req, res)=>{
    res.render('index',{title:'CALENDER APP'})
})