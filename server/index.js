var app = require('./server.js');
var port = process.env.PORT || 8000;

app.listen(port, function() {
	console.log('expense tracking system is running on: ', port);
})