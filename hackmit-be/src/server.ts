import express from 'express'
import cors from 'cors'
import * as fs from 'node:fs/promises'

import { python } from 'bun_python'
const transformers = python.import('transformers')
const pipe = transformers.pipeline('automatic-speech-recognition', 'ginic/wav2vec-large-xlsr-en-ipa')

const app = express()
const port = 3000
app.use(cors())
app.use(express.json({ limit: '1000kb' }))

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
    try {
        await fs.writeFile('current.mp3', Buffer.from(req.body.recording, 'base64'))
        const thing = await pipe('current.mp3')
        res.status(200).send({
            message: `${thing}`,
        })
    } catch (e) {
        console.error(e)
    }
})
