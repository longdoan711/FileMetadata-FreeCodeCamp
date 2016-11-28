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

app.get('/upload', function(req, res) {
	res.end('Please choose a file');
})

app.post('/upload', upload.single('userFile'), function(req, res, next) {
	if (req.file !== undefined) {
		var fileDetails = {
			"name": req.file.originalname,
			"size": req.file.size + ' KB'
		};
		res.json(fileDetails);
	} else {
		res.end('Please choose a file');
	}
	
});

app.listen(port, function() {
	console.log('Server is listening on port ' + port);
})