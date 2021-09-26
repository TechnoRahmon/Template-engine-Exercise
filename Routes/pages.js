const router = require('express').Router()


router
    .get('/' , (req,res)=>{
        
        res.render('index')
    })
    .get('/login',(req,res)=>{
        res.render('login')
    })
    .get('/signup',(req,res)=>{
        res.render('signup')
    })

    module.exports = router; 
