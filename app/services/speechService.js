// services/speechService.js
import {
  SpeechConfig,
  AudioConfig,
  SpeechRecognizer,
} from "microsoft-cognitiveservices-speech-sdk";

import { AZURE_SPEECH_KEY, AZURE_REGION } from "../utils/constants";

export const transcribeAudio = async (audioBlob) => {
  const speechConfig = SpeechConfig.fromSubscription(
    AZURE_SPEECH_KEY,
    AZURE_REGION
  );
  const audioConfig = AudioConfig.fromBlobAudio(audioBlob);

  const recognizer = new SpeechRecognizer(speechConfig, audioConfig);

  return new Promise((resolve, reject) => {
    recognizer.recognizeOnceAsync((result) => {
      if (result.reason === ResultReason.RecognizedSpeech) {
        resolve(result.text);
      } else {
        reject(new Error(`Speech recognition failed: ${result.reason}`));
      }
    });
  });
};
