import { useState, useEffect } from "react";
import "./style/App.css";
import beep from "./sound/beep.mp3";
import { ReactComponent as ArrUp } from "./img/arrow-up-solid.svg";
import { ReactComponent as ArrDown } from "./img/arrow-down-solid.svg";
import { ReactComponent as Play } from "./img/play.svg";
import { ReactComponent as Pause } from "./img/pause.svg";
import { ReactComponent as Reset } from "./img/arrows-rotate-solid.svg";
import { ReactComponent as Inst } from "./img/instagram.svg";
import { ReactComponent as Twitter } from "./img/twitter.svg";
import { ReactComponent as YouTube } from "./img/youtube.svg";
import { ReactComponent as Spotify } from "./img/spotify.svg";
import { ReactComponent as TikTok } from "./img/tiktok.svg";
import { ReactComponent as Twitch } from "./img/twitch.svg";

function App() {
  const [timer, setTimer] = useState(25 * 60);
  const [rest, setRest] = useState(5);
  const [work, setWork] = useState(25);
  const [timerOn, setTimerOn] = useState(false);
  const [onBreak, setOnbreak] = useState(false);
  const [lastMin, setLastMin] = useState(false);
  const [breakSound, setBreakSound] = useState(new Audio(beep));

  useEffect(() => {
    document.title = `${formatTime(timer)}`;
  }, [timer]);

  const playBreakSound = () => {
    breakSound.play();
  };

  let interval;

  const controllTime = () => {
    let second = 1000;
    let date = new Date().getTime();
    let nextDate = new Date().getTime() + second;
    let onBreakVariable = onBreak;
    if (!timerOn) {
      interval = setInterval(() => {
        date = new Date().getTime();
        if (date > nextDate) {
          setTimer((prev) => {
            if (prev <= 1 * 60) {
              setLastMin(true);
            }
            if (prev <= 4) {
              playBreakSound();
            }
            if (prev <= 0 && !onBreakVariable) {
              onBreakVariable = true;
              setOnbreak(true);
              return rest * 60;
            } else if (prev <= 0 && onBreakVariable) {
              onBreakVariable = false;
              setOnbreak(false);
              return work * 60;
            }
            return prev - 1;
          });
          nextDate += second;
        }
      }, 30);
      localStorage.clear();
      localStorage.setItem("interval-id", interval);
    }

    if (timerOn) {
      clearInterval(localStorage.getItem("interval-id"));
    }
    setTimerOn(!timerOn);
  };

  const incrRest = () => {
    if (rest >= 15) {
      return;
    }
    setRest(rest + 1);
  };
  const decrRest = () => {
    if (rest <= 1) {
      return;
    }
    setRest(rest - 1);
  };

  const incrWork = () => {
    if (work >= 60) {
      return;
    }
    setWork(work + 1);
    setTimer(timer + 1 * 60);
  };

  const decrWork = () => {
    if (work <= 1) {
      return;
    }
    setWork(work - 1);
    setTimer(timer - 1 * 60);
  };

  const resetAll = () => {
    clearInterval(localStorage.getItem("interval-id"));
    setTimerOn(false);
    setOnbreak(false);
    setLastMin(false);
    setRest(5);
    setTimer(25 * 60);
    setWork(25);
  };

  const formatTime = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    return (
      (minutes < 10 ? "0" + minutes : minutes) +
      ":" +
      (seconds < 10 ? "0" + seconds : seconds)
    );
  };

  return (
    <div
      className="App"
      style={{
        background: onBreak
          ? "linear-gradient(90deg, #4525d6,#2c214f,#12083a)"
          : "linear-gradient(132deg, #393d51,#451229,#2c1c45)",
      }}
    >
      <div className="timerWrapper">
        <h1 id="title">Work Timer</h1>
        <div className="wrapperOption">
          <div id="break">
            <h2 id="break-label">Break Length</h2>
            <div className="IncrLengthDecr">
              <div id="break-decrement">
                <ArrUp
                  id="arrows"
                  width={25}
                  height={25}
                  onClick={incrRest}
                  fill="azure"
                />
              </div>
              <div id="break-length">{rest}</div>
              <div id="break-increment">
                <ArrDown
                  id="arrows"
                  width={25}
                  height={25}
                  onClick={decrRest}
                  fill="azure"
                />
              </div>
            </div>
          </div>

          <div id="session">
            <h2 id="session-label">Session Length</h2>
            <div className="IncrLengthDecr">
              <div id="session-decrement">
                <ArrUp
                  id="arrows"
                  width={25}
                  height={25}
                  onClick={incrWork}
                  fill="azure"
                />
              </div>
              <div id="session-length">{work}</div>
              <div id="session-increment">
                <ArrDown
                  id="arrows"
                  width={25}
                  height={25}
                  onClick={decrWork}
                  fill="azure"
                />
              </div>
            </div>
          </div>
        </div>
        <div id="timer-label">
          <h1 id="sessionTitle">{onBreak ? "Break" : "Session"}</h1>
          <div id="time-left">{formatTime(timer)}</div>
        </div>
        <div id="btnWrap">
          {timerOn === false && (
            <Play
              id="start_stop"
              width={40}
              height={40}
              onClick={controllTime}
              fill="azure"
            />
          )}

          {timerOn === true && (
            <Pause
              id="start_stop"
              width={40}
              height={40}
              onClick={controllTime}
              fill="azure"
            />
          )}

          <Reset
            id="reset"
            width={35}
            height={35}
            onClick={resetAll}
            fill="azure"
            style={{ margin: 3 }}
          />
        </div>
        {onBreak === true && (
          <div className="relaxPlatform">
            <h2 id="relaxTitle">
              You deserve a rest, but remember after the beep you need to get
              back to work
            </h2>
            <div className="platformWrap">
              <a
                target="_blank"
                href="https://www.youtube.com/"
                className="platform"
                rel="noreferrer"
              >
                <YouTube width={70} height={70} />
              </a>
              <a
                target="_blank"
                href="https://www.spotify.com/"
                className="platform"
                rel="noreferrer"
              >
                <Spotify width={70} height={70} fill="#1ed760" />
              </a>
              <a
                target="_blank"
                href="https://www.twitch.tv/"
                className="platform"
                rel="noreferrer"
              >
                <Twitch width={70} height={70} fill="#9147ff" />
              </a>
              <a
                target="_blank"
                href="https://www.instagram.com/"
                className="platform"
                rel="noreferrer"
              >
                <Inst width={70} height={70} />
              </a>
              <a
                target="_blank"
                href="https://www.tiktok.com/"
                className="platform"
                rel="noreferrer"
              >
                <TikTok width={70} height={70} />
              </a>
              <a
                target="_blank"
                href="https://twitter.com/"
                className="platform"
                rel="noreferrer"
              >
                <Twitter width={70} height={70} />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
