const router = require('express').Router()
const fs = require('fs')

router
    .post('/signup' , (req,res)=>{

        // extract the data from the body of the request !
        //console.log('body : ' , req.body);
        const { fullname , email, password } = req.body;

        // validate the data
        if ( !fullname || !email || !password ){
            res.render('signup' , {error : 'All Fields Are Required !'})
        }

        // read json file and get users array from the file
       let users =  fs.readFileSync('./Routes/users.json')
        let data = { "name" : fullname , "email":email , "password" :password }
  
       users= JSON.parse(users)
       console.log(users);
        // add the new user to the users array
        users.push(data)

        users = JSON.stringify(users, null ,2 )
        // overwrite the json file with updated array
      fs.writeFile('./Routes/users.json', users , (err)=>{
            if ( err )
                console.log(err);
            else
            res.render('respond' , { signupMessage : 'Thank You, You have been registered Successfully!'})
      })

    })


    .post('/login',(req,res)=>{
            // extract data from the body of request
            const { email , password } = req.body ;
            console.log(req.body);
            // validate the data
            if (!email || !password ) { 
              return   res.render('login' , { error :'All Fields Are Required !'})
            }


            // read json file and get users array
            let users = fs.readFileSync('./Routes/users.json')

            users = JSON.parse(users)

            // compare the user data with users array
           let AuthUser =  users.filter(user => user.email === email && user.password === password )[0]

           if (AuthUser  && AuthUser.name ){
                 // login = true > respond with thank message
                res.render('respond' , {loginMessage:'Welcome '+AuthUser.name})

           }
           else{
            // longin = false > respond with error message in the login page
            res.render('login' , {error :'Invalid Email Or Password'})
           }

    })


module.exports = router 