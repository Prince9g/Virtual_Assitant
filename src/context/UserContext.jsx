import React, { createContext } from "react";
import run from "../API";
export const datacontext = createContext(null);

const UserContext = ({ children }) => {
  // let [speaking, setSpeaking]
    const speak = (text) =>{
        // speech synthesis to convert text to speech (js inbuilt free class)
        window.speechSynthesis.cancel()
        let textSpeak = new SpeechSynthesisUtterance(text)
        textSpeak.volume=1
        textSpeak.rate=1
        textSpeak.pitch=1
        textSpeak.lang="hi-GB"
        window.speechSynthesis.speak(textSpeak)
    }
    const aiResponse = async(prompt) =>{
        let text = await run(prompt);
        speak(text);
    }
    // now speech recognition for recognize what user said to our virtual assitant(js inbuilt free function)
    let speechRecognition=window.SpeechRecognition || window.webkitSpeechRecognition
    let recognition = new speechRecognition()
    recognition.onresult=(e)=>{
        let currentIndex = e.resultIndex;
        let transcript = e.results[currentIndex][0].transcript
        console.log(transcript)
        aiResponse(transcript)
    }
    let value={
        recognition
    }
  return (
    <div>
      <datacontext.Provider value={value}>{children}</datacontext.Provider>
    </div>
  );
};

export default UserContext;
