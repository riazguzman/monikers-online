import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";

type CountdownTimerProp = {
  turnEnd: number;
};

const useCountDownTimer = (turnEnd: number) => {
  // State to hold done state
  const [finished, setFinished] = useState(false);

  // State to hold the number of seconds remaining
  const [secondsRemaining, setSecondsRemaining] = useState(
    Math.max(Math.floor((turnEnd - new Date().getTime()) / 1000), 0)
  );

  useEffect(() => {
    // Function to update the state
    const updateTimer = () => {
      const now = new Date().getTime();
      const secondsLeft = Math.max(Math.floor((turnEnd - now) / 1000), 0);
      setSecondsRemaining(secondsLeft);
    };

    // Update the timer immediately
    updateTimer();

    // Set up an interval to update the timer every second
    const intervalId = setInterval(updateTimer, 100);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (secondsRemaining === 0) {
      setFinished(true);
    }
  }, [finished]);

  const CountdownTimer = () => {
    return (
      <View>
        <Text>Time remaining: {secondsRemaining} seconds</Text>
      </View>
    );
  };

  return {
    CountdownTimer: React.memo(CountdownTimer),
    finished,
  };
};

export default useCountDownTimer;
