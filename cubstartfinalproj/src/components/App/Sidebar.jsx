import Navbar from "../Navbar";
import "./sidebar.css";

function Sidebar({ uniqueTitles, handleClick, createNewChat }) {
    return (
      <aside className="sidebar">
        <button onClick={createNewChat}>+ New Chat</button>
        <ul className="history">
          {uniqueTitles?.map((uniqueTitle, index) => (
            <li key={index} onClick={() => handleClick(uniqueTitle)}>
              {uniqueTitle}
            </li>
          ))}
        </ul>
        <div className="token-count">
          <p>Available tokens</p>
          <p>0/10000</p>
        </div>
      </aside>
    );
  }

export default Sidebar;