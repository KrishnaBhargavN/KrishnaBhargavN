"use client";
import { useState } from "react";

const Test = () => {
  const [transcription, setTranscription] = useState("");

  const startSpeechRecognition = () => {
    const recognition = new window.webkitSpeechRecognition(); // for Chrome, replace with SpeechRecognition() for other browsers

    recognition.onresult = (event) => {
      const last = event.results.length - 1;
      const text = event.results[last][0].transcript;
      setTranscription(text);
    };

    recognition.start();
  };

  return (
    <div>
      <button onClick={startSpeechRecognition}>Start Speech Recognition</button>
      <p>{transcription}</p>
    </div>
  );
};

export default Test;
