var config = require('./config.json')
  , http = require('http')
  , fs = require('fs')
  , path = require('path')
  , url = require('url');

console.log('Starting HTTP server...')
var server = http.createServer(function(req, res) {

  // Error handling
  req.on('error', function(err) {
    console.log('Server request error: ' + err.errno);
  });
  res.on('error', function(err) {
    console.log('Server response error: ' + err.errno);
  });

  // Require authorization
  var auth = req.headers['authorization'];
  if(!auth && config.server.require_auth) { 

    // Request authorization headers
    res.statusCode = 401;
    res.setHeader('WWW-Authenticate', 'Basic realm="Provide username and password"');     
    res.end('<html><body><h1>Denied</h1></body></html>');

  } else if(auth || !config.server.require_auth) {

    var tmp,buf,plain_auth,creds,username,password;

    if( config.server.require_auth ) {
      tmp = auth.split(' ');
      buf = new Buffer(tmp[1], 'base64');
      plain_auth = buf.toString();
      creds = plain_auth.split(':');
      username = creds[0];
      password = creds[1];
    }
     
    if(((username == config.server.username) && (password == config.server.password)) || !config.server.require_auth) {

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
        if ( unescape(uri).substring(1,12) == '/proxy/json/' ) {

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
    } else {
      res.statusCode = 401; 
      res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');
      res.end('<html><body><h1>Denied</h1></body></html>');
    }
  }
}).listen(config.server.port, function() {
  console.log('\tServer running at: http://localhost:'+config.server.port+' ...');
});

module.exports = server;
