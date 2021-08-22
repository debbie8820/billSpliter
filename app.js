const { urlencoded } = require('express')
const express = require('express')
const app = express()

if (process.env.NODE_ENV !== "production") {
  require('dotenv').config()
}

app.use(urlencoded({ extended: true }))

app.listen(process.env.PORT, () => {
  console.log(`App is running on port ${process.env.PORT}`)
})

app.use((err, req, res) => {
  return res.status(500).json({ Error: String(err) })
})