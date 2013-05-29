
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , cons = require('consolidate')
  , path = require('path');

var app = express();

// all environments
app.engine('dust', cons.dust);
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'dust');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session({ secret: 'dashr', key: 'sid', ));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

// run from command line or loaded as a module (for testing)
if (require.main === module) {
    var server = http.createServer(app);
    server.listen(app.get('port'), function() {
        console.log('Express server listening on port ' + app.get('port'));
    });
} else {
    exports = module.exports = app;
}

