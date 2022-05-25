const express = require('express')
const dotenv =require('dotenv') 
const connectDatabase = require('./src/config/database')
const QnARoute = require('./src/Routes/QnARoute')
const userRoute = require('./src/Routes/userRoute')
const bodyParser =require("body-parser") 
const {notFound, errorHandler} =require("./src/middleware/Error") 
dotenv.config()
connectDatabase()


const app = express();
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));

//API 

app.use("/api/QAs",QnARoute)
app.use('/api/users',userRoute)


//HANDLE ERROR
app.use(notFound)
app.use(errorHandler)


const PORT =  process.env.PORT || 1000

app.listen(PORT,()=>{ 
  console.log("Server is running on port " + PORT);
})