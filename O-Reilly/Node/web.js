var express = require('express');
var path = require('path');

var app = express();
app.set('view engine', 'jade');

app.engine('jade', require('jade').__express);
app.use(express.static(path.join(__dirname, 'public')));

// Routes ###############################################

app.get('/', function(req, res) {
	res.sendfile(__dirname+'/views/index.html');
});

app.get('/sample', function(req, res) {
	res.render('sample', { data: "Hello World" });
});

// End Routes ###############################################

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
	console.log('Listening on ' + port);
});