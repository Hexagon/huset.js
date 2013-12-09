var   config = require('./config.json')
	, http = require('http')
	, fs = require('fs')
	, path = require('path')
    , url = require('url');

/* 
	
	HTTP Server

	based on https://github.com/kenokabe/ConciseStaticHttpServer

*/

console.log('Starting HTTP server...')
var server = http.createServer(function(req, res) {
	var  dir = path.join(__dirname, 'client')
		,uri = url.parse(req.url).pathname
		,filename = path.join(dir, unescape(uri))
		,indexFilename = path.join(dir, unescape('index.html'))
		,stats;
	
	try
	{
	    stats = fs.lstatSync(filename);
	}
	catch (e)
	{
	    stats = false;
	}

	if (stats && stats.isFile())
	{
	    // path exists, is a file
	    var mimeType = config.server.mimetypes[path.extname(filename)
	        .split(".")[1]];
	    res.writeHead(200,
		    {
		        'Content-Type': mimeType
		    });

	    var fileStream =
	        fs.createReadStream(filename)
	        .pipe(res);
	}
	else if (stats && stats.isDirectory())
	{
	    // path exists, is a directory
	    res.writeHead(200,
		    {
		        'Content-Type': "text/html"
		    });
	    var fileStream =
	        fs.createReadStream(indexFilename)
	        .pipe(res);
	}
	else
	{

		// JSON proxy
		if ( unescape(uri).left(12) == '/proxy/json/' ) {

			// Proxyed URL requested
			console.log('Proxyed json requested',uri);

			//http://datafeed.expektra.se/datafeed.svc/spotprice?bidding_area=SE2
			/*request("http://www.sitepoint.com", function(error, response, body) {
				console.log(body);
			});*/

		} else {
			// 404 - Not found
			res.writeHead(404,
			    {
			        'Content-Type': 'text/plain'
			    });
		    res.write('404 Not Found\n');
		    res.end();
		    return;
		}
	}
}).listen(config.server.port, function() {
    console.log('Server running at: http://localhost:'+config.server.port+' ...');
});

module.exports = server;