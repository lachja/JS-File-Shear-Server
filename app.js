const express = require('express')
const fileUpload = require('express-fileupload')
const serverIndex = require('serve-index')
const path = require('path')

const app = express()

app.set('view engine', 'ejs')
app.use(fileUpload(),express.json())

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

app.listen(3000, () => console.log('🚀 on port: 3000'))