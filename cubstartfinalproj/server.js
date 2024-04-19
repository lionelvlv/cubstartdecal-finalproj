const PORT = 8000
import express from 'express';
import cors from 'cors';
import {db} from './firebase.js';
import {collection, getDocs} from 'firebase/firestore';
const usersCollection = collection(db, 'users');
import { getAuth } from "firebase/auth";
const data = await getDocs(usersCollection);
console.log(data)
import { doc, setDoc, updateDoc, deleteDoc, query, where } from "firebase/firestore";

const app = express()
app.use(express.json())
app.use(cors())
let user
// How to get UUID of user that's currently logged in?
async function getUsername() {
    const auth = getAuth();
    user = auth.currentUser;
    if (user) {
        console.log(user.displayName + " is logged in woot woot")
        return user.displayName;
    } else {
        console.log("No user is logged in")
        return null;
    }
}

async function createNewUser(user) {
    await setDoc(doc(usersCollection, user, {convo: null}));
}

// Returns the convo of a user in the database
async function getPrevConvo(user) {
    // Should be loaded everytime we go to home or something
    // Export this function?
    // Have frontend logic work in App.jsx, but use this function to load the data.. probably
    const q = query(usersCollection, where("user", "==", user));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs[0].data().convo
}

async function updateConvo(user, NewConvo) {
    await updateDoc(doc(usersCollection, user), {
        convo: NewConvo
    });
}

async function deleteConvo(user) {
    await deleteDoc(doc(usersCollection, user));
}

// My API Key PLEASE DON'T SHARE
const API_KEY = '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'
const convos = new Map()
const personality = "You are helpful and funny"
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
        convo.push({"role": "system", "content": personality})
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
        getUsername()
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal Server Error');
    }
})

// Listens on Port 8000 for now
app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`)})
