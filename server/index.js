const express = require('express')
cons app = express()

app.get('/', (req, res) => {
  res.send('vous etes connect au serveur')
})

app.listen(65335, () => {
  console.log('listening port 65335')
})