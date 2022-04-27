const express = require('express');
const mysqlConnexion = require('./database');
const router = require('./router/route');
const app = express();
const cookieParser = require('cookie-parser')
const session = require('express-session');
app.set('views', './views');
app.set('view engine', 'ejs');
app.use('/public', express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended:false }));
app.use(cookieParser())

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge:6000000 }
}))



mysqlConnexion.connect((error) => {
    if (error) {
        
    }else{
        console.log('Connexion a la base de donnees reussie');
        app.use('/',router)
    }
})

// Create connection



app.listen(3000, () =>{
    console.log("The server listen on port 3000");
})