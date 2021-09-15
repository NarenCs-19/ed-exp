require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy; 
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session); 
const crypto = require('crypto');
const cors = require('cors');
const e = require("express");
const { CommandStartedEvent } = require("mongodb");

const app = express();
var CorsOptions = {
    origin:"http://localhost:3000/"
}
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(cors(CorsOptions));

//CREATING DATABSE CONNECTION
var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'ed-exp',
    multipleStatements: true
});

connection.connect((err)=>{
    if(err)
        console.log(err);
    else
        console.log("connected to db successfully");
});

app.use(session({
    key: 'session_cookie_name',
    secret: 'session_cookie_secret',
    store: new MySQLStore({
        host: 'localhost',
        port: 3306,
        user: 'root',
        database: 'cookie_user'
    }),
    resave:false,
    saveUninitialized:false,
    cookie:{
        maxAge: 10*60*60*24,
    }
}));

app.use(passport.initialize());
app.use(passport.session());

const verifycallback = (username,password,done)=>{
    connection.query('SELECT * FROM USERS WHERE EMAIL= ?',[username],(err,result)=>{
        if(err){
            return done(err);
        }
        else if(result.length){
            if(isValidPwd(password,result[0].HASH_PWD,result[0].SALT)){
                user = {id:result[0].ID,fullName:result[0].FULLNAME,email:result[0].EMAIL,hashPwd:result[0].HASH_PWD,salt:result[0].SALT};
                return done(null,user);
            }
            else{
                return done(null,false,{message: 'Invalid username or password'});
            }
        }
        else{
            return done(null,false,{message:'Username doesn\'t exist'});
        }
    });
}

passport.use(new LocalStrategy({usernameField:'email',passwordField:'password'},verifycallback));

passport.serializeUser(function(user,done){
    console.log('inside serialize');
    done(null,user.id);
});

passport.deserializeUser(function(userId,done){
    console.log("inside deserializer");
    connection.query('SELECT * FROM USERS WHERE ID = ?',[userId],(err,result)=>{
        if(err)
            console.log(err);
        done(null,result[0]);
    });
});

//CHECKS WHETHER THE USERNAME ALREADY EXISTS
function userExists(req,res,next){
    connection.query('SELECT * FROM USERS WHERE EMAIL= ?',[req.body.email],(err,result)=>{
        if(err){
            console.log(err);
        }
        else if(result.length>0){
            console.log('user already exists');
            res.send({message:'User already exists'});
        }
        else{
            next();
        }
    });
}

function isValidPwd(password,hashPwd,salt){
    var hashPwdVerify = crypto.pbkdf2Sync(password,salt,10000,60,'sha512').toString('hex');
    return hashPwdVerify === hashPwd; 
}

//GENERATES A HASHED PWD(SALTING)
function generatePwd(password){
    var salt = crypto.randomBytes(32).toString('hex');
    var hash = crypto.pbkdf2Sync(password,salt,10000,60,'sha512').toString('hex');
    return {salt:salt, hash:hash};
}


//HANDLES THE USER'S REGISTER
app.post("/register",userExists,(req,res)=>{
    const {fullName,email,password} = req.body;
    const {salt,hash} = generatePwd(password);
    if(!(fullName && email && password))
        res.send({message:'Missing credentials'});
    else{
    connection.query('INSERT INTO USERS(FULLNAME,EMAIL,HASH_PWD,SALT) VALUES(?,?,?,?)',[fullName,email,hash,salt],(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log('registered successfully');
            res.send({message:'success'}); 
        }
    })
    }
});


//HANDLES THE USER'S LOGIN
app.post("/login",(req,res,next)=>{passport.authenticate('local',(err,user,info)=>{
        if(err)
            res.send(err);
        else if(user){ 
            res.send('success');
        }
        else{
            res.send(info);
        }
    })(req, res, next);
}
);

//HANDLES THE USER'S SESSION LOGOUT
app.get('/logout',(req,res)=>{
    req.logout();
    res.send('/login');
});


port = process.env.PORT || 5000;    //RUNNING PORT
app.listen(port); 



