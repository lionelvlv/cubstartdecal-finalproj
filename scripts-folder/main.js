// Output GPT responses here
const inputTextArea = document.getElementById('input');
const responseBox = document.getElementById('response-box');
const generateText = () => {
    const inputText = inputTextArea.value;
    fetch('http://localhost:5000/generate-text', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText }),
    })
    .then(response => response.json())
    .then(data => {
        responseBox.innerHTML = `<p>${data.generated_text}</p>`;
    })
    .catch((error) => {
        console.error('Error:', error);
        responseBox.innerHTML = `<p>Error generating text. Please try again.</p>`;
    });
};

// Listen for Enter key in the textarea (optional)
inputTextArea.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault(); // Prevent default action for Enter key
        generateText(); // Call the function to generate text
    }
});
