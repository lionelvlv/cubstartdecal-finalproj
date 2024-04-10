import { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './Login'
import Register from "./Register";
import Reset from "./Reset";
import Dashboard from "./Dashboard";
import Chat from './chat';
import Input from './input';
import Sidebar from './sidebar';


function App() {
  const [value, setValue] = useState(null)
  const [message, setMessage] = useState(null)
  const [previousChats, setPreviousChats] = useState([])
  const [currentTitle, setCurrentTitle] = useState(null)

  const handleClick = (uniqueTitle) => {
    setCurrentTitle(uniqueTitle)
    setValue("")
    setMessage(null)
  }
  const createNewChat = () => {
    setCurrentTitle(null)
    setValue("")
    setMessage(null)
  }

  const getMessages = async () => {
    const options = {
      method: "POST",
      body: JSON.stringify({
        message: value
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }
    try {
      const response = await fetch('http://localhost:8000/completions', options)
      const data = await response.json()
      console.log(data)
      setMessage(data.choices[0].message)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    console.log(currentTitle, value, message)
if (!currentTitle && value && message) {
  setCurrentTitle(value)
} 
else if (currentTitle && value && message) {
  setPreviousChats(prevChats => (
    [...prevChats, 
      {
        title: currentTitle,
        role: 'user',
        content: value
      },
      {
        title: currentTitle,
        role: message.role,
        content: message.content
      }
    ]
  ))
  }
}, [message, currentTitle])
  const currentChat = previousChats.filter(previousChat => previousChat.title === currentTitle)
  const uniqueTitles = Array.from(new Set(previousChats.map(previousChat => previousChat.title)))
  console.log(uniqueTitles)

  return (
    

    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/reset" element={<Reset />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
      <Sidebar uniqueTitles={uniqueTitles} handleClick={handleClick} createNewChat={createNewChat} />
      <Chat currentTitle={currentTitle} currentChat={currentChat} />
      <Input value={value} setValue={setValue} getMessages={getMessages} />
    </div>
  )
}

export default App
