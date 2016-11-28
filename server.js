var express = require('express');
var app = express();
var path = require('path');
var multer = require('multer');

var port = process.env.PORT || 3000;
var upload = multer({ dest: 'uploads/' });

app.set('json spaces', 20);

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/upload', upload.single('userFile'), function(req, res, next) {
	// var err = new Error();
	// err.status = 404;
	// next(err);
	
	var fileDetails = {
		"name": req.file.originalname,
		"size": req.file.size + ' KB'
	};
	res.json(fileDetails);
});

app.use(function(err, req, res, next) {
	if(err.status !== 404) {
		return next();
	}
	res.send(err.message || 'Internal Server Error')
});

app.listen(port, function() {
	console.log('Server is listening on port ' + port);
})