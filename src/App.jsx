import React, { useContext } from 'react'
import image from './assets/ai.png';
import { CiMicrophoneOn } from "react-icons/ci";
import { datacontext } from './context/UserContext';
const App = () => {
  let {recognition} = useContext(datacontext);
  // speak("hello prince how are you dood");
  return (
    <div className="main">
      <img src={image} alt="" id="assistant"/>
      <span>Hi! I'm your Virtual Assitant Sir</span>
      <button onClick={() =>{
        recognition.start()
      }}>Click here <CiMicrophoneOn />
      </button>
    </div>
  )
}

export default App;
