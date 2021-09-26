const express= require('express')
const app = express()
const bodyParser = require('body-parser')
const log = require('morgan')
const pug = require('pug')

const PageRouts = require('./Routes/pages')
const UsersRoutes = require('./Routes/users')

app.set('view engine' , 'pug')

app.use(express.static('views'))
app.use(bodyParser.urlencoded({extended:false}))
app.use(log('dev'))


app.use('/' , PageRouts)
app.use('/users' , UsersRoutes)

app.listen(5000, ()=>{
    console.log('Serer is Running on PORT : 5000 ');
})










