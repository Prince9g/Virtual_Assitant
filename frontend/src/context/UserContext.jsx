import React, { createContext, useState } from "react";
import run from "../API"; // now using OpenRouter run()

export const datacontext = createContext(null);

const UserContext = ({ children }) => {
  let [speaking, setSpeaking] = useState(false);
  let [texting, setTexting] = useState("Listening...");
  let [response, setResponse] = useState(false);

  // ✅ Text-to-Speech
  const speak = (text) => {
    window.speechSynthesis.cancel();
    let textSpeak = new SpeechSynthesisUtterance(text);
    textSpeak.volume = 1;
    textSpeak.rate = 1;
    textSpeak.pitch = 1;
    textSpeak.lang = "en-GB"; // you had hi-GB, but that's not standard
    window.speechSynthesis.speak(textSpeak);
  };

  // ✅ Get AI response from OpenRouter
 const aiResponse = async (prompt) => {
  let text = await run(prompt);

  let newText =
    text
      ?.replace(/google/gi, "Prince Sharma")
      .replace(/\*/g, "") // <-- removes all asterisks
      || "No response from AI";

  setTexting(newText);
  speak(newText);
  setResponse(true);
  setTimeout(() => {
    setSpeaking(false);
  }, 5000);
};

  // ✅ Speech Recognition (browser API)
  let speechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  let recognition = new speechRecognition();

  recognition.onresult = (e) => {
    let currentIndex = e.resultIndex;
    let transcript = e.results[currentIndex][0].transcript;
    console.log("User said:", transcript);
    setTexting(transcript);
    takeCommand(transcript.toLowerCase());
  };

  // ✅ Commands
  const takeCommand = (command) => {
    if (command.includes("open") && command.includes("youtube")) {
      window.open("https://www.youtube.com/", "_blank");
      speak("Opening YouTube");
      setTexting("Opening YouTube...");
    } else if (command.includes("open") && command.includes("google")) {
      window.open("https://www.google.com/", "_blank");
      speak("Opening Google");
      setTexting("Opening Google...");
    } else if (command.includes("open") && command.includes("instagram")) {
      window.open("https://www.instagram.com/", "_blank");
      speak("Opening Instagram");
      setTexting("Opening Instagram...");
    } else if (command.includes("open") && command.includes("leetcode")) {
      window.open("https://leetcode.com/problemset/", "_blank");
      speak("Opening LeetCode");
      setTexting("Opening LeetCode...");
    } else if (command.includes("time")) {
      let time = new Date().toLocaleString(undefined, {
        hour: "numeric",
        minute: "numeric",
      });
      speak(time);
      setTexting(time);
    } else if (command.includes("date")) {
      let date = new Date().toLocaleString(undefined, {
        day: "numeric",
        month: "short",
      });
      speak(date);
      setTexting(date);
    } else {
      aiResponse(command);
    }

    setResponse(true);
    setTimeout(() => {
      setSpeaking(false);
    }, 5000);
  };

  let value = {
    recognition,
    speaking,
    setSpeaking,
    texting,
    setTexting,
    response,
    setResponse,
  };

  return (
    <datacontext.Provider value={value}>{children}</datacontext.Provider>
  );
};

export default UserContext;
