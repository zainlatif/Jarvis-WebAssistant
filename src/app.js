// Select the button and content elements from the DOM
const btn = document.querySelector('.talk');
const content = document.querySelector('.content');

let voices = []; // Array to hold available voices

// Function to populate the voices array
function populateVoices() {
    voices = window.speechSynthesis.getVoices(); // Get available voices
}

// Function to speak the provided text using the Web Speech API
function speak(text) {
    const text_speak = new SpeechSynthesisUtterance(text);
    
    // Set properties for speech synthesis
    text_speak.rate = 1;  // Speed of speech
    text_speak.volume = 1;  // Volume level (0 to 1)
    text_speak.pitch = 1;  // Pitch of the voice

    // Select a voice (modify this to choose a specific voice)
    text_speak.voice = voices.find(voice => voice.name === 'Google US English'); // Change to desired voice name

    // Speak the text
    window.speechSynthesis.speak(text_speak);
}

// Function to wish the user based on the current time of day
function wishMe() {
    var day = new Date();  // Get the current date and time
    var hour = day.getHours();  // Get the current hour

    // Determine the appropriate greeting based on the hour
    if (hour >= 0 && hour < 12) {
        speak("Good Morning Boss...");
    } else if (hour >= 12 && hour < 17) {
        speak("Good Afternoon Master...");
    } else {
        speak("Good Evening Sir...");
    }
}

// When the window loads, greet the user and populate voices
window.addEventListener('load', () => {
    populateVoices(); // Populate voices when the page loads
    speak("Hello Sir..");
    wishMe();  // Call the wishMe function to greet the user
});

// Setup Speech Recognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition; // Cross-browser support
const recognition = new SpeechRecognition(); // Create a new instance of SpeechRecognition

// Event listener for when speech is recognized
recognition.onresult = (event) => {
    const currentIndex = event.resultIndex;  // Get the index of the current result
    const transcript = event.results[currentIndex][0].transcript;  // Get the recognized text
    content.textContent = transcript;  // Display the transcript on the page
    takeCommand(transcript.toLowerCase());  // Process the command
};

// Event listener for the button click to start listening
btn.addEventListener('click', () => {
    content.textContent = "Listening....";  // Update content to indicate listening
    recognition.start();  // Start the speech recognition
});

// Function to take action based on the recognized command
function takeCommand(message) {
    // Greeting commands
    if (message.includes('hey') || message.includes('hello')) {
        speak("Hello Sir, How May I Help You?");
    }
    // Open Google
    else if (message.includes("open google")) {
        window.open("https://google.com", "_blank");
        speak("Opening Google...");
    }
    // Open YouTube
    else if (message.includes("open youtube")) {
        window.open("https://youtube.com", "_blank");
        speak("Opening YouTube...");
    }
    // Open Facebook
    else if (message.includes("open facebook")) {
        window.open("https://facebook.com", "_blank");
        speak("Opening Facebook...");
    }
    // Search commands
    else if (message.includes('what is') || message.includes('who is') || message.includes('what are')) {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "This is what I found on the internet regarding " + message;
        speak(finalText);
    }
    // Wikipedia search
    else if (message.includes('wikipedia')) {
        window.open(`https://en.wikipedia.org/wiki/${message.replace("wikipedia", "")}`, "_blank");
        const finalText = "This is what I found on Wikipedia regarding " + message;
        speak(finalText);
    }
    // Time command
    else if (message.includes('time')) {
        const time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        const finalText = time;
        speak(finalText);
    }
    // Date command
    else if (message.includes('date')) {
        const date = new Date().toLocaleString(undefined, { month: "short", day: "numeric" });
        const finalText = date;
        speak(finalText);
    }
    // Open calculator
    else if (message.includes('calculator')) {
        window.open('Calculator:///');
        const finalText = "Opening Calculator";
        speak(finalText);
    }
    // Default search command
    else {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "I found some information for " + message + " on Google";
        speak(finalText);
    }
}

// Populate voices after the voices have loaded
speechSynthesis.onvoiceschanged = populateVoices;
