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

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && value) {
      getMessages(); 
    }
  };


  return (
    <div className="App">
          {/* Home page content */}
          <div className="content-area">
          <section className="main">
              {!currentTitle && <h1>Office Hours AI Tutor</h1>}
              <ul className="feed">
                {currentChat.map((chatMessage, index) => (
                  <li key={index}>
                    <p className='role'>{chatMessage.role}</p>
                    <p className='message'>{chatMessage.content}</p>
                  </li>
                ))}
              </ul>
          </section>
            <div className='input-container'>
              {/* Don't ask me what this does LOL */}
              <input value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              />
              </div>
              </div> 
              <aside className="sidebar">
                <button onClick={createNewChat}>+ New Chat</button>
                <ul className="history">
                  {uniqueTitles?.map((uniqueTitle, index) => <li key={index} onClick={() => handleClick(uniqueTitle)}>{uniqueTitle}</li>)}
                </ul>
              <div> {/* Other sidebar content if needed */}</div>
                <div className="token-count">
                  <p>Available tokens</p>
                  <p>0/5</p>
                </div>
              </aside>
        </div>  
  );
}

export default App