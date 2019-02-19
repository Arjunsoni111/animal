var express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    MongoStore = require('connect-mongo')(session),
    lusca = require('lusca'),
    Gen = require('../app/modules/module.generic'),
    helmet = require('helmet'),
    Dev = require('./env/' + process.env.NODE_ENV),
    compression = require('compression');

module.exports = function (db) {
    var app = express();
    app.use(compression());
    app.use(cookieParser());
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: Dev.SESSION_SECRET,
        store: new MongoStore({
            mongooseConnection: db.connection,
            ttl: 86400,
            collection: Dev.SESSION_COLLECTION
        })
    }));
    app.use(helmet());
    app.use(lusca({
        xframe: 'SAMEORIGIN',
        p3p: 'ABCDEF',
        hsts: {
            maxAge: 31536000,
            includeSubDomains: true,
            preload: true
        },
        xssProtection: true,
        nosniff: true
    }));
    app.use(function (req, res, next) {
        res.setHeader("Access-Control-Allow-Origin", Dev.SITE_PATH);
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE,PATCH");
        res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-forwarded-for");
        next();
    });
    app.use(function (req, res, next) {
        if (req.body) {
            Object.keys(req.body).forEach(function (key) {
                if (typeof req.body[key] == "string") {
                    req.body[key] = req.body[key].trim();
                }
            });
        }
         if (req.body.data) {
             req.body = Gen.getRequest(req.body.data);
         }
        require('../app/routes/route.animal')(app);
        next();
    })
    return app;
}
