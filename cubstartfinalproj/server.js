const PORT = 8000
import express from 'express';
import cors from 'cors';
const app = express()
app.use(express.json())
app.use(cors())

// My API Key PLEASE DON'T SHARE
const API_KEY = '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'

const mongose = require('mongoose');
const dbConnectionUrl = "mongodb+srv://ddoski:<password>@cluster0.oslttaf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const dbName = "chatLogs";
const convoSchema = new mongose.Scheme({
    title: String,
    convo: Array,
})
const Convo = mongose.model('Convo', convoSchema);

const personality = "You are a friendly tutor here to help people with their homework. You respond concisely and do your best to help out and are funny. You sometimes make references to UC Berkeley things.";

// POST Request
app.post('/completions', async (req, res) => {
    const title = req.body.title;
    const messages = [
        // The first message is always by the system and is the instructions for the GPT model to follow. 
        // TODO: Add more instructions for the GPT model to follow, add personality?, or some other goofy stuff 
        {"role": "system", "content": personality},
    ]

    // Maybe a good idea to pull last N messages? Like 10 messages? To save tokens of course.
    const context = await Convo.findOne({ title: title });

    if (context === null || context === undefined || !context) {
        messages.apppend({"role": "user", "content": req.body.message})
        const context = new Convo({
            title: req.body.title,
            convo: messages
        });
        await context.save();
    } else {
        context.convo.apppend({"role": "user", "content": req.body.message})
        messages = context.convo
    }

    const options = {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "model": "gpt-3.5-turbo",
            "messages": messages,
            // max_tokens: 100,
        })
    }
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', options)
        const data = await response.json()
        res.send(data)
        messages.apppend({"role": data.choices[0].role, "content": data.choices[0].content})
        Convo.updateOne({title}, {convo: messages})
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal Server Error');
    }
})

async function start() {
    await mongoose.connect(dbConnectionUrl, { dbName })

    console.log(`Connected to the mongoDB database '${dbName}'`)

    app.listen(PORT, () => {
        console.log('Server listening on port 3000')
    })
}

start()