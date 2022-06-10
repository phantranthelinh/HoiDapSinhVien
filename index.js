const express = require('express')
const dotenv = require('dotenv')
const connectDatabase = require('./src/config/database')
const QnARoute = require('./src/Routes/QnARoute')
const departmentRoute = require('./src/Routes/departmentRoute')
const newQuestionRouter = require('./src/Routes/newQuestion')
const userRoute = require('./src/Routes/userRoute')
const bodyParser = require('body-parser')
const cors = require('cors')
var multipart = require('connect-multiparty')
const { notFound, errorHandler } = require('./src/middleware/Error')
dotenv.config()
connectDatabase()

const app = express()
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(multipart())

//ROUTES

app.use('/api/qnas', QnARoute)
app.use('/api/departments', departmentRoute)
app.use('/api/users', userRoute)
app.use('/api/newquestions', newQuestionRouter)

//HANDLE ERROR
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 1000

app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT)
})
