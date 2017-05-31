var http = require('http');
var url = require('url');

var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function convertDateToNatural(date) {
	return months[date.getMonth()]+" "+date.getDate()+", "+date.getFullYear();
}

var server = http.createServer(function(req, res) {
	var request = url.parse(req.url, true);
	var parameter = decodeURIComponent(request.path.slice(1));
	var date = new Date(isNaN(parameter) ? parameter : parseInt(parameter));

	var returnObject = {
		unix: null,
		natural: null
	};

	if(date != 'Invalid Date') {
		returnObject["unix"] = date.getTime();
		returnObject["natural"] = convertDateToNatural(date);
	}

	res.writeHead(200, { 'Content-Type': 'application/json' });
	res.end(JSON.stringify(returnObject));
});
server.listen(process.env.PORT || 8000);