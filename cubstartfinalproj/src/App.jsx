import { useEffect, useState } from 'react'
import './css/App.css'
import Sidebar from './components/App/Sidebar'
import Chat from './components/App/Chat'
import Input from './components/App/Input'
import Navbar from './components/Navbar'
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
    <div>
      <Navbar />
      <Sidebar uniqueTitles={uniqueTitles} handleClick={handleClick} createNewChat={createNewChat} />
      <Chat currentTitle={currentTitle} currentChat={currentChat} />
      <Input value={value} setValue={setValue} getMessages={getMessages} />
    </div>
  );
}

export default App