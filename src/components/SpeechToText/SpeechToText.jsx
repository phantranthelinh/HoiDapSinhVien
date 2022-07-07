import React from "react";

import { MdSettingsVoice } from "react-icons/md";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useEffect, useState } from "react";

const SpeechToText = () => {
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    // 👇️ toggle
    setIsActive((current) => !current);

    // 👇️ or set to true
    // setIsActive(true);
  };
  // const startListening = () =>
  //   SpeechRecognition.startListening({ continuous: true });

  const startVoice = () => {
    SpeechRecognition.startListening();
    console.log("start");
  };

  const stopVoice = () => {
    SpeechRecognition.stopListening();
    console.log("end");
  };

  const voiceClick = (e) => {
    // startVoice() ? startVoice() : stopVoice();
    startVoice();
    stopVoice();
    handleClick();
  };

  // setInput(transcript);
  //   useEffect(() => {
  //     SpeechRecognition.stopListening({ continue: true });
  //   }, []);
  return (
    <>
      <div className="voice-frame" onClick={voiceClick}>
        <MdSettingsVoice style={{ fill: isActive ? "#008000" : "black" }} />
      </div>

      <div>
        <p>{transcript}</p>
      </div>
    </>
  );
};

export default SpeechToText;
