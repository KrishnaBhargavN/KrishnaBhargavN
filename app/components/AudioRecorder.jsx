"use client";
import React, { useState } from "react";
import {
  SpeechConfig,
  AudioConfig,
  SpeechRecognizer,
  ResultReason,
} from "microsoft-cognitiveservices-speech-sdk";
import { AZURE_REGION, AZURE_SPEECH_KEY } from "../utils/constants";
import axios from "axios";

var text = "";

const AudioRecorder = () => {
  const [isListening, setIsListening] = useState(false);
  var recognizer;

  const speechConfig = SpeechConfig.fromSubscription(
    AZURE_SPEECH_KEY,
    AZURE_REGION
  );
  speechConfig.setProperty("autoDetectSourceLanguageConfig", "false");
  const audioConfig = AudioConfig.fromDefaultMicrophoneInput();

  recognizer = new SpeechRecognizer(speechConfig, audioConfig);
  const startListening = async () => {
    console.log(recognizer.privDisposedRecognizer);
    recognizer.recognizing = (s, e) => {
      // Update current transcription
      console.log(`RECOGNIZING: Text=${e.result.text}`);
      text = e.result.text;
    };

    await recognizer.startContinuousRecognitionAsync();
    setIsListening(true);
  };

  const stopListening = async () => {
    setIsListening(false);
    try {
      console.log(recognizer);
      if (true) {
        // Stop the continuous recognition
        // alert("Krishna Bhargav stopped listening to you");
        // Close the recognizer and microphone stream
        alert("bh");
        await recognizer.stopContinuousRecognitionAsync();
        await recognizer.close();
        await recognizer.dispose();
      }
    } catch (error) {
      console.error("Error stopping listening:", error);
    }
  };

  async function summarise() {
    const data = await axios.post(
      "https://api.oneai.com/api/v0/pipeline",
      {
        input: text,
        steps: [
          {
            skill: "summarize",
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "api-key": "874a8f24-ce81-428e-9c4b-19b6c829edd3",
        },
      }
    );
    console.log(data);
    text = data.data.output[0].text;
    console.log(text);
  }

  return (
    <div>
      <h1 className="text-center m-10 font-bold font">
        Speech-to-Text {isListening ? "Listening" : ""}
      </h1>

      <button
        className="px-3 py-3 bg-indigo-600 rounded-md text-white m-2"
        onClick={isListening ? stopListening : startListening}
      >
        {isListening ? "Stop Listening" : "Start Listening"}
      </button>
      <div>
        <p className="px-3 py-3 bg-sky-800 text-yellow-500 m-2">
          Transcriptions:{text}
        </p>
        <button
          className="px-3 py-3 bg-indigo-600 rounded-md text-white m-2"
          onClick={summarise}
        >
          Summarise
        </button>
      </div>
    </div>
  );
};

export default AudioRecorder;
