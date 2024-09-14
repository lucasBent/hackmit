import express from 'express'
import cors from 'cors'

import { python } from 'bun_python'
const transformers = python.import('transformers')
const pipe = transformers.pipeline('automatic-speech-recognition', 'ginic/wav2vec-large-xlsr-en-ipa')

const app = express()
const port = 3000
app.use(cors())
app.use(express.json())

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`)
})

app.get('/', async (req, res) => {
    const thing = await pipe(`${__dirname}/sample3.m4a`)
    res.status(200).send({
        message: `${thing}`,
    })
})

app.post('/transcribe', async (req, res) => {
    console.log(req.body.recording)
    const recording = new Audio(req.body.recording)
    const thing = await pipe(`${__dirname}/sample3.m4a`)
    res.status(200).send({
        message: `${thing}`,
    })
})
