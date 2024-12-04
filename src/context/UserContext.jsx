import React, { createContext, useState } from "react";
import run from "../API";
export const datacontext = createContext(null);

const UserContext = ({ children }) => {
  let [speaking, setSpeaking] = useState(false);
  let [texting, setTexting] = useState("Listening...");
  let [response, setResponse] = useState(false);
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
        let newText = text.split("**")&&text.split("*")&&text.replace("google", "Prince Sharma")&&text.replace("Google", "Prince Sharma")
        setTexting(newText);
        speak(newText);
        setResponse(true);
        setTimeout(()=>{
          setSpeaking(false)
        }, 5000)
    }
    // now speech recognition for recognize what user said to our virtual assitant(js inbuilt free function)
    let speechRecognition=window.SpeechRecognition || window.webkitSpeechRecognition
    let recognition = new speechRecognition()
    recognition.onresult=(e)=>{
        let currentIndex = e.resultIndex;
        let transcript = e.results[currentIndex][0].transcript
        console.log(transcript)
        setTexting(transcript)
        takeCommand(transcript.toLowerCase())
        // aiResponse(transcript)
    }

    const takeCommand = (command) => {
      if(command.includes("open") && command.includes("youtube")){
        window.open("https://www.youtube.com/", "_blank")
        speak("opening Youtube")
        setResponse(true);
        setTexting("opening Youtube...")
        setTimeout(()=>{
          setSpeaking(false)
        }, 5000)
      }else if(command.includes("open") && command.includes("google")){
        window.open("https://www.google.com/", "_blank")
        speak("opening google")
        setResponse(true);
        setTexting("opening Google...")
        setTimeout(()=>{
          setSpeaking(false)
        }, 5000)
      }else if(command.includes("open") && command.includes("instagram")){
        window.open("https://www.instagram.com/", "_blank")
        speak("opening instagram")
        setResponse(true);
        setTexting("opening Instagram...")
        setTimeout(()=>{
          setSpeaking(false)
        }, 5000)
      }else if(command.includes("open") && command.includes("leetcode")){
        window.open("https://leetcode.com/problemset/", "_blank")
        speak("opening Leetcode")
        setResponse(true);
        setTexting("opening Leetcode...")
        setTimeout(()=>{
          setSpeaking(false)
        }, 5000)
      }else if(command.includes("time")){
        let time = new Date().toLocaleString(undefined, 
          {hour:"numeric", minute:"numeric"}
        )
        speak(time);
        setTexting(time)
        setResponse(true);
        setTimeout(()=>{
          setSpeaking(false)
        }, 5000)
      }else if(command.includes("date")){
        let date = new Date().toLocaleString(undefined,
          {day:"numeric", month:"short"}
        )
        speak(date);
        setTexting(date)
        setResponse(true);
        setTimeout(()=>{
          setSpeaking(false)
        }, 5000)
      }
        else{
        aiResponse(command)
      }
    }

    let value={
        recognition, 
        speaking, 
        setSpeaking,
        texting,
        setTexting,
        response,
        setResponse
    }
  return (
    <div>
      <datacontext.Provider value={value}>{children}</datacontext.Provider>
    </div>
  );
};

export default UserContext;
