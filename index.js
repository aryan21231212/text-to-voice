let speech = new SpeechSynthesisUtterance();
let button = document.querySelector("#but");
let textarea = document.querySelector("#input");

let voices = [];
let select = document.querySelector("select");

// Function to update the voices list in the dropdown
function updateVoices() {
    voices = window.speechSynthesis.getVoices();
    
    // Check if there are voices available
    if (voices.length === 0) {
        console.error("No voices available.");
        return;
    }
    
    
    select.innerHTML = "";
    
    
    voices.forEach((voice, index) => {
        const option = new Option(voice.name, index);
        select.add(option);
    });

    
    speech.voice = voices[0];
    console.log("Default voice set:", speech.voice.name);
}


if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = updateVoices;
} else {
    
    updateVoices();
}


select.addEventListener('change', () => {
    const selectedIndex = select.value;
    if (selectedIndex && voices[selectedIndex]) {
        speech.voice = voices[selectedIndex];
        console.log("Voice changed to:", speech.voice.name);
    } else {
        console.error("Invalid voice selection.");
    }
});


button.addEventListener('click', () => {
    const text = textarea.value;
     if (!text) {
        console.error("No text to speak.");
        return;
    }

    speech.text = text;
    console.log("Speaking:", text);
    window.speechSynthesis.speak(speech);
});


setTimeout(updateVoices, 1000); 
