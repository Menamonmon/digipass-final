import { NextPage } from "next";
import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
interface CountdownTimerProps {
  duration: number;
}

const minuteSeconds = 60;
const hourSeconds = 3600;
const daySeconds = 86400;

const timerProps = {
  isPlaying: true,
  size: 120,
  strokeWidth: 6,
};
const renderTime = (seconds: number, minutes: number) => {
  return (
    <div className="time-wrapper">
      <div className="time">
        {minutes}:{seconds}
      </div>
    </div>
  );
};
const getTimeSeconds = (time: number) => (minuteSeconds - (time % 60)) | 0;
const getTimeMinutes = (time: number) =>
  ((time % hourSeconds) / minuteSeconds) | 0;
const getTimeHours = (time: number) => ((time % daySeconds) / hourSeconds) | 0;
const getTimeDays = (time: number) => (time / daySeconds) | 0;
const getTime = (time: number) => time;
const CountdownTimer: React.FC<CountdownTimerProps> = ({ duration }) => {
  const durationinseconds = duration * 60;
  const startTime = Date.now() / 1000; // use UNIX timestamp in seconds
  const endTime = startTime + duration * 60; // use UNIX timestamp in seconds

  const remainingTime = endTime - startTime;
  return (
    <div className="scale-125">
      <CountdownCircleTimer
        isPlaying
        duration={durationinseconds}
        colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
        colorsTime={[
          durationinseconds * 0.75,
          durationinseconds * 0.5,
          durationinseconds * 0.25,
          0,
        ]}
        initialRemainingTime={remainingTime % minuteSeconds}
        onComplete={(totalElapsedTime) => ({
          shouldRepeat: remainingTime - totalElapsedTime > 0,
        })}
      >
        {({ elapsedTime, color }) => (
          <span style={{ color }}>
            {renderTime(
              getTimeSeconds(elapsedTime),
              getTimeMinutes(durationinseconds - elapsedTime)
            )}
          </span>
        )}
      </CountdownCircleTimer>
    </div>
  );
};

export default CountdownTimer;
