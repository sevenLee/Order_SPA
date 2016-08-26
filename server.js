var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var morgan = require('morgan');
var config = require('./config');
var express= require('express');
var routes = express.Router();

var app = express();
var port = process.env.PORT || 8080;


// Var
app.set('mySecret', config.secret);

// Middleware
app.use(function(req, res, next) {
    //for CORS
    res.header('Access-Control-Allow-Origin', 'http://localhost:63342');
    res.header('Access-Control-Allow-Headers', 'Content-Type, X-Auth-Appkey, X-Auth-Apptoken, X-Auth-Usertoken, X-Access-Token');

    next();
});
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use('/api', routes);

// Route
routes.get('/', function(req, res){
    res.json({
        message: 'welcome api'
    });
});
routes.post('/auth', function(req, res) {
    console.log('req.body:', req.body);
    console.log('secret:', app.get('mySecret'));

    if(req.body.name === 'seven' && req.body.password === '1234') {

        //create access token
        var accessToken = jwt.sign({
            name: 'seven',
            password: '1234',
            admin: true
        }, app.get('mySecret'), {
            expiresIn: '3m'
        });

        res.json({
            success: true,
            message: 'Token authenticated.',
            token: accessToken
        });
    }else{
        res.json({
            success: false,
            message: 'name or password invalid'
        });
    }
});


// start server
app.listen(port);
console.log('server start!');










