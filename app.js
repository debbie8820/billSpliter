const { urlencoded } = require('express')
const express = require('express')
const cors = require('cors')
const app = express()

if (process.env.NODE_ENV !== "production") {
  require('dotenv').config()
}

app.use(cors())
app.use(urlencoded({ extended: true }))
app.use(express.json())

app.listen(process.env.PORT, () => {
  console.log(`App is running on port ${process.env.PORT}`)
})

require('./routes')(app)