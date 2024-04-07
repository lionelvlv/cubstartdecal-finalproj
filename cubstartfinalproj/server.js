const PORT = 8000
import express from 'express';
import cors from 'cors';
const app = express()
app.use(express.json())
app.use(cors())

// My API Key PLEASE DON'T SHARE
const API_KEY = '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'

app.post('/completions', async (req, res) => {
    const options = {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "model": "gpt-3.5-turbo",
            "messages": [{"role": "system", "content": "You are a helpful assistant."}],
            max_tokens: 100,
        })
    }
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', options)
        const data = await response.json()
        res.send(data)
    } catch (error) {
        console.log(error)
    }
})

app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`)})