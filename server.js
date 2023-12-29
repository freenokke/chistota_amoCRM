const app = require('./app/app')
const PORT = process.env.PORT || 8888
const DB = require('./app/model/dataController')

app.listen(PORT, () => {
  console.log(`Server has run on port ${PORT}`)
  console.log(`DB state: ${JSON.stringify(DB.getData())}`)
})