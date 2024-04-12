function Input({ value, setValue, getMessages }) {
    return (
      <div className='input-container'>
        <input value={value} onChange={(e) => setValue(e.target.value)}/>
        <div id="submit" onClick={getMessages}>click me</div>
      </div>
    );
  }

export default Input;