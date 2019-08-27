const bodyParser = require('body-parser')
const express = require('express')
const app = express();

const test = require('../controllers/test/test.js')
const fp = require('../controllers/job_card/file_upload.js')

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/users', test.getUsers)
app.post('/user', test.getuser)

app.post('/api/uploadfile', fp.upload.single("uploadfile"), (req, res) =>{
	fp.importCsvData2MySQL(__basedir +'/' +req.file.filename);
	res.json({
				'msg': 'File uploaded/import successfully!', 'file': req.file
			});
});


module.exports= app ;