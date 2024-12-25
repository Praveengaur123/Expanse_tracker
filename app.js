const path=require('path')

const express =require('express')

const adminRoute=require('./route/admin')

const bodyParser=require('body-parser')

const cors=require('cors')

const app=express()

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json)

app.use(express.static(path.join(__dirname,'public')))
app.use(adminRoute)


app.listen(5050)