import "./input.css";

function Input({ value, setValue, getMessages }) {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && value) {
      getMessages(); 
    }
  }
  return (
    <div className="input-container">
      {/* Don't ask me what this does LOL */}
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Type your message..."
      />
    </div>
  );
}

export default Input;
