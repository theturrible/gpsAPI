var restify = require('restify');
var util = require('util'),fs = require('fs');
 
var server = restify.createServer({
  name: 'myapp',
  version: '1.0.0'
});
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
 

function getFiles (dir, files_){
    files_ = files_ || [];
    var files = fs.readdirSync(dir);
    for (var i in files){
        var name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory()){
            getFiles(name, files_);
        } else {
        	if(files[i].indexOf('.gpx') > 0){
            	files_.push(files[i].replace('.gpx', ''));
            }
        }
    }
    return files_;
}

server.get('/echo/:name', function (req, res, next) {
  console.log(req.params.name);
  res.send(req.params);
  return next();
});
 
 server.get('/tracks', function (req, res, next) {
 	var files = getFiles('tracks');
 	console.log(files);
 	res.send(files);
  	return next();
});

server.get('/track/:name', function (req, res, next) {
	var tj = require('togeojson'),
	    fs = require('fs'),
	    // node doesn't have xml parsing or a dom. use jsdom
	    jsdom = require('jsdom').jsdom;
	var util = require('util');
	var kml = jsdom(fs.readFileSync('tracks/'+ req.params.name + '.gpx', 'utf8'));
	var geoJSON = tj.gpx(kml);
	res.send(geoJSON);
});


server.listen(8080, function () {
  console.log('%s listening at %s', server.name, server.url);
});

