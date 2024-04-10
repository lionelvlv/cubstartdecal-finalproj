import { useEffect, useState } from 'react'
import './App.css'

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
        message: value,
        title: currentTitle
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
      <section className="sidebar">
        <button onClick={createNewChat}>+ New Chat</button>
        <ul className="history">
          {uniqueTitles?.map((uniqueTitle, index) => <li key={index} onClick={() => handleClick(uniqueTitle)}>{uniqueTitle}</li>)}
        </ul>
      </section>
      <section className="main">
        {!currentTitle && <h1>Office Hours AI Tutor</h1>}
        <ul className="feed">
          {currentChat.map((chatMessage, index) => <li key={index}>
            <p className='role'>{chatMessage.role}</p>
            <p className='message'>{chatMessage.content}</p>
            </li>)}
        </ul>
      </section>
      <div className='input-container'>
        {/* Don't ask me what this does LOL */}
        <input value={value} onChange={(e) => setValue(e.target.value)}/>
        <div id="submit" onClick={getMessages}>click me</div>
      </div>
    </div>
  )
}

export default App
