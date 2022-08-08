const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
//MongoDBStore will use to store express-session in database
const MongoDBStore = require('connect-mongodb-session')(session);
const UserModel = require('./models/userModel');
const { PassportAuth } = require('./userauth/userAuth')
const userRoutes = require('./routers/userRoutes')
const logger = require('morgan');


const Auth_URI = process.env.MONGODB_SERVER;
const port = 7000;
const app = express();

//body-parser middleware
app.use(cors({
    origin:true,
    credentials:true
    
}));

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

//to connect your express app to mongodb
mongoose.connect(Auth_URI);
mongoose.connection.once('open', () => {
    console.log('Connected to server');
}).on('error', (err) => {
    console.log(err);
});

//created mongoDBstore to store session in database(collection name:userSession)
let store = new MongoDBStore({
    uri: Auth_URI,
    collection: 'userSessions'
});

// session middleware
app.use(session({
    secret: 'this is my secret key',
    //if false then server will provide session cookie only when you modify session object
    // if true then server will provide session cookie even the when you have not modify session object. and store it in memory
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 60000
    },
    store: store
}))

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//persist to store the user data into session(after successfull authentication) 
passport.serializeUser((user, done) => {
    done(null, user._id);
})
//persist to retrieve user data from session
passport.deserializeUser((id, done) => {
    UserModel.findById(id, (err, user) => {
        done(err, user);
    })
})



// use passport local strategy
passport.use(PassportAuth());


app.use('/api/auth', userRoutes);





app.listen(port, (err) => {
    if (err) {
        console.log('Error ' + err);
        return;
    }
    console.log("server is up and running on port " + port);
})


module.exports = app;