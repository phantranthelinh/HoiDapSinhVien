const express = require('express')
const dotenv = require('dotenv')
const connectDatabase = require('./src/config/database')
const QnARoute = require('./src/Routes/QnARoute')
const departmentRoute = require('./src/Routes/departmentRoute')
const messageRoute = require('./src/Routes/messageRoute')
const userRoute = require('./src/Routes/userRoute')
const bodyParser = require('body-parser')
const path = require('path')
const cors = require('cors')
const fs = require('fs')
var cron = require('node-cron')
const exec = require('child_process').exec
var temp_dir = path.join(process.cwd(), '/public')

if (!fs.existsSync(temp_dir)) fs.mkdirSync(temp_dir)

const { notFound, errorHandler } = require('./src/middleware/Error')

dotenv.config()
connectDatabase()

const app = express()
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/public', express.static(path.join(__dirname, 'public')))

//ROUTES

app.use('/api/qnas', QnARoute)
app.use('/api/departments', departmentRoute)
app.use('/api/users', userRoute)
app.use('/api/messages', messageRoute)

//BACKUP DATABASE

const DB_NAME = 'hoidapsv'
const ARCHIVE_PATH = path.join(__dirname, '/backup', `${DB_NAME}.gzip`)

function backupMongoDB() {
  const child = exec('mongodump', [`--db=${DB_NAME}`, `--archive=${ARCHIVE_PATH}`, '--gzip'])

  child.stdout.on('data', (data) => {
    console.log('stdout:\n', data)
  })
  child.stderr.on('data', (data) => {
    console.log('stderr:\n', Buffer.from(data).toString())
  })
  child.on('error', (error) => {
    console.log('error:\n', error)
  })
  child.on('exit', (code, signal) => {
    if (code) console.log('Process exit with code:', code)
    else if (signal) console.log('Process killed with signal:', signal)
    else console.log('Backup is successfull ✅')
  })
}
// Backup every day at 12:00
cron.schedule(
  '0 0 * * *',
  () => {
    backupMongoDB()
  },
  { scheduled: true, timezone: 'Asia/Ho_Chi_Minh' }
)

//HANDLE ERROR
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 1000

app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT)
})
