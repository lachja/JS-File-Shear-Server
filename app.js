const express = require('express')
const fileUpload = require('express-fileupload')
const serverIndex = require('serve-index')
const copression = require('compression')
const cluster = require('cluster')
const os = require('os')
const path = require('path')

const app = express()

const numberOfCpuCors = os.cpus().length

app.set('view engine', 'ejs')
app.use(
    fileUpload(),
    express.json(),
    copression())

app.get('/', async (req, res, next) => {
    res.render('index')
})

app.use('/ftp', express.static('public/ftp'), serverIndex('public/ftp', {icons: true}))

app.post('/single', async(req, res, next) => {
    try {
        const file = req.files.mFile
        const savePath = path.join(__dirname, 'public', 'ftp', file.name)
        await file.mv(savePath)
        res.redirect('/ftp')
    } catch (error) {
        console.log(error)
        res.send('Error uploading file')
    }

})

if (cluster.isMaster) {
    for (let i = 0; i < numberOfCpuCors; i++){
        cluster.fork()
    }
} else {
    app.listen(3000, () => console.log( process.pid + ' 🚀 on port: 3000 | http://localhost:3000/'))
}

