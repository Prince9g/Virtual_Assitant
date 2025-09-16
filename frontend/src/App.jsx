import React, { useContext } from 'react'
import image from './assets/ai.png';
import speakImg from './assets/speak.gif'
import aigif from './assets/aiVoice.gif'
import { CiMicrophoneOn } from "react-icons/ci";
import { datacontext } from './context/UserContext';
const App = () => {
  let {recognition, speaking, setSpeaking, texting, setTexting, response, setResponse} = useContext(datacontext);
  // speak("hello prince how are you dood");
  return (
    <div className="main">
      <img src={image} alt="" id="assistant"/>
      <span>Hi! I'm your Virtual Assitant Sir</span>
      {!speaking ? <button onClick={() =>{
        setTexting("Listening...")
        setSpeaking(true)
        setResponse(false)
        recognition.start()
      }}>Click here <CiMicrophoneOn />
      </button> 
      : 
      <div className="response">
        {!response ? <img src={speakImg} alt="" id="speak"/> 
      :   <img src={aigif} alt="" id="aigif"/>
      }
        
        <p>{texting}</p>
      </div>
       }
      
    </div>
  )
}

export default App;
