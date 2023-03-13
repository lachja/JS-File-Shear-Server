const express = require('express')
const fileUpload = require('express-fileupload')
const serverIndex = require('serve-index')
const copression = require('compression')
const cluster = require('cluster')
const os = require('os')
const path = require('path')
const cors = require('cors')
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express()
const numberOfCpuCors = os.cpus().length

const port = 3000

app.set('view engine', 'ejs')
app.use(
    fileUpload(),
    express.json(),
    copression(),
    cors(),
    bodyParser.json()
)

/*
app.get('/', async (req, res, next) => {
    res.render('index')
})
*/

app.get("/getFile/:filename", (req, res) => {

    const file = path.join(__dirname, '/public/ftp/', req.params.filename);
    res.setHeader('Content-disposition', `attachment; filename=${req.params.filename}`);
    res.setHeader('Content-Type', 'application/octet-stream');
    
    const stream = fs.createReadStream(file);
    stream.on('data', chunk => {
        res.write(chunk);
    });
    stream.on('end', () => {
        res.end();
    });
});

app.get('/getFiles', async (req, res, next) => {
    fs.readdir(__dirname + '/public/ftp', (err, files) => {
        if (err) {
            res.status(500).send({ error: 'Error reading folder' });
            return;
        }
        res.send({ files });
    });
})

/*
app.use('/ftp', express.static('public/ftp'), serverIndex('public/ftp', {icons: true}))
*/

app.delete('/delete/:fileName', (req, res) => {
    const fileName = req.params.fileName;
    const filePath = path.join(__dirname, "public/ftp", fileName);
    fs.unlink(filePath, (err) => {
        if (err) {
        res.status(500).send({ message: "Fehler beim Löschen der Datei" });
        } else {
        res.send({ message: `Datei ${fileName} erfolgreich gelöscht` });
        }
    });
});

app.post('/single', async(req, res, next) => {
    try {
        const file = req.files.mFile
        const savePath = path.join(__dirname, 'public', 'ftp', file.name)
        console.log(typeof(file));
        console.log(file);
        await file.mv(savePath)
        res.redirect('/ftp')
    } catch (error) {
        console.log(error)
        res.send('Error uploading file')
    }
})

app.post('/upload', async(req, res) => {

    const filename = req.headers['content-name'];

    const filePath = path.join(__dirname, '/public/ftp/' + filename)
    const stream = fs.createWriteStream(filePath);

    stream.on('open', () => {
        console.log('Stream open ...  0.00%');
        req.pipe(stream);
    });

    stream.on('data', (buffer) => {
        console.log(">>> Data:");
        console.log(buffer);
    })

    stream.on('drain', () => {
        const written = parseInt(stream.bytesWritten);
        const total = parseInt(req.headers['content-length']);
        const pWritten = ((written / total) * 100).toFixed(2);
        console.log(`Processing  ...  ${pWritten}%`);
    });

    stream.on('close', () => {
        console.log('Processing  ...  100%');
        console.log('Stream Closed');
        res.sendStatus(200);
    });

    stream.on('error', err => {
        console.error(err);
        res.status(500).send({ status: 'error', err });
    });
    
});

if (cluster.isMaster) {
    for (let i = 0; i < numberOfCpuCors; i++){
        cluster.fork()
    }
} else {
    app.listen(port, () => console.log( process.pid + ` 🚀 on port:${port} | http://localhost:${port}/`))
}

