const express = require('express')
const app = express()

app.use(express.static('www'))

app.get('/api', (req, res) => {
  res.json({
    success: true
  });
})

const port = 4001

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
