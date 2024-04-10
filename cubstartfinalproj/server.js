const PORT = 8000
import express from 'express';
import cors from 'cors';
const app = express()
app.use(express.json())
app.use(cors())

// My API Key PLEASE DON'T SHARE
const API_KEY = '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'
const convos = new Map()

// POST Request
app.post('/completions', async (req, res) => {
    if (req.body.message === undefined || req.body.title === undefined) {
        res.status(400).send('Bad Request')
        return;
    }
    let messages
    let convo
    const request = {"role": "user", "content": req.body.message}

    if (convos.has(req.body.title)) {
        convo = convos.get(req.body.title);
        messages = convo;
        console.log("convo obtained!", req.body.title)
        console.log(convo)
    } else {
        let title = req.body.message
        convos.set(title, []);
        convo = convos.get(title);
        console.log("new convo created!", title)
        messages = convo;
        convo.push({"role": "system", "content": "You are helpful and funny"})
    }

    messages.push(request);    

    
    const options = {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "model": "gpt-3.5-turbo",
            "messages": messages,
            max_tokens: 100,
        })
    }
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', options)
        const data = await response.json()
        convo.push(data.choices[0].message)
        console.log("updated convo with AI response!")
        console.log(convo)
        res.send(data)
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal Server Error');
    }
})

// Listens on Port 8000 for now
app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`)})