"use client";
import React, { useState } from "react";
import * as speechsdk from "microsoft-cognitiveservices-speech-sdk"; // Make sure to import the correct module

import { getTokenOrRefresh } from "../utils/auth";

const SpeechToText = () => {
  const [displayText, setDisplayText] = useState(
    "Speak into your microphone..."
  );

  const sttFromMic = async () => {
    try {
      const tokenObj = await getTokenOrRefresh(); // Assuming getTokenOrRefresh is defined elsewhere
      const speechConfig = speechsdk.SpeechConfig.fromAuthorizationToken(
        tokenObj.token,
        tokenObj.region
      );
      speechConfig.speechRecognitionLanguage = "en-US";

      const audioConfig = speechsdk.AudioConfig.fromDefaultMicrophoneInput();
      const recognizer = new speechsdk.SpeechRecognizer(
        speechConfig,
        audioConfig
      );

      setDisplayText("Speak into your microphone...");

      recognizer.recognizeOnceAsync((result) => {
        let newDisplayText;
        if (result.reason === speechsdk.ResultReason.RecognizedSpeech) {
          newDisplayText = `RECOGNIZED: Text=${result.text}`;
        } else {
          newDisplayText =
            "ERROR: Speech was cancelled or could not be recognized. Ensure your microphone is working properly.";
        }

        setDisplayText(newDisplayText);
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h2>Speech-to-Text</h2>
      <button onClick={sttFromMic}>Start Recognition</button>
      <p>{displayText}</p>
    </div>
  );
};

export default SpeechToText;
