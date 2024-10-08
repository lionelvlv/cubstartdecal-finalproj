import "./chat.css";  
function Chat({ currentTitle, currentChat }) {
    return (
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
    );
  }

export default Chat;