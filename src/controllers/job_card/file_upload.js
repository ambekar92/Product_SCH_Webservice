const fs = require('fs');
const pool = require('../../config/db.js')
const csv = require('fast-csv');
const app = require('../../routers/routers.js')
const multer = require('multer');
// const express = require('express');

// const app = express();
 
global.__basedir = __dirname;
 
// -> Multer Upload Storage
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
	   cb(null, __basedir)
	},
	filename: (req, file, cb) => {
	   cb(null, file.originalname)
	}
});
 
const upload = multer({storage: storage});

// -> Express Upload RestAPIs
// app.post('/api/uploadfile', upload.single("uploadfile"), (req, res) =>{
// 	importCsvData2MySQL(__basedir +'/' +req.file.filename);
// 	res.json({
// 				'msg': 'File uploaded/import successfully!', 'file': req.file
// 			});
// });

// -> Import CSV File to MySQL database
function importCsvData2MySQL(filePath){
    let stream = fs.createReadStream(filePath);
    let csvData = []
    let csvStream = csv
        .parse()
        .on("data", function (data) {
            // console.log(data)
            csvData.push(data);
            
        })
        .on("end", function () {
            // Remove Header ROW
            csvData.shift();
            console.log(csvData);
            // Create a connection to the database
            
            // const pool = new Pool({
            // user: 'postgres',
            // host: 'localhost',
            // database: 'postgres',
            // password: 'root',
            // port: 5432,
            
            // })
 
            // Open the MySQL connection
            // pool.connect((error) => {
            //     if (error) {
            //         console.error(error);
            //     } else {

                    console.log('connected to database')
                    const query = { 
                        name:"sample",
                        text:"INSERT INTO public.file_upload (id,name) values ($1,$2)",
                        rowMode:'array'
                        // values:[csvData]
                                              
                        }
                        console.log(csvData.length)
                        for(i=0;i<=csvData.length-1;i++){
                    pool.query(query,csvData[i])
                //     ,(error, response) => {
                //         console.log(error || response);
                      
                //     });
                // }
                }
            // });
			
			// delete file after saving to MySQL database
			// -> you can comment the statement to see the uploaded CSV file.
			fs.unlinkSync(filePath)
        });
 
    stream.pipe(csvStream);
}

module.exports = {importCsvData2MySQL,storage,upload};
// Create a Server
// let server = app.listen(3000,"localhost", function () {
 
//   let host = server.address().address
//   let port = server.address().port
 
//   console.log("App listening at http://%s:%s", host, port)
 
// })