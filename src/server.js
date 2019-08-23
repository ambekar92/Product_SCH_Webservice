const app = require('./routers/routers.js')

const port = 3000

  app.listen(port, () => {
    console.log('App running on port',port )
  })