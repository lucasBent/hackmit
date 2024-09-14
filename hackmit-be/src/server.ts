import express from 'express'
import cors from 'cors'

const app = express()
const port = 3000
app.use(cors())

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`)
})

app.get('/', async (req, res) => {
    res.status(200).send({
        message: 'Hello world!',
    })
})
