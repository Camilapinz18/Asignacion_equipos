const express = require('express')
const cors = require('cors');
const morgan=require('morgan')
require('dotenv').config()
const db=require('./db/db')
const PORT = process.env.PORT
const app = express()

/*Middlewares*/
app.use(express.json())
app.use(cors());
app.use(morgan('dev'))

/*Routes*/
const brandRoutes=require('./routes/brand.routes')

app.use('/api/v1/brands',brandRoutes)


/*Server and DB*/
db()
app.listen(PORT, () => {
  console.log(`Server started at ${PORT} port`)
})
