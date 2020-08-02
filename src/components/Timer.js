import React from 'react';
import './Menu.css';
// https://github.com/peterdurham/timers-demo

export default class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: this.props.status,
            timeStart: 0,
            time: 0
        };
    }

    startTimer = () => {
        this.setState({
            status: true,
            timeStart: Date.now() - this.state.time,
            time: this.state.time
        });
        this.timer = setInterval(() => {
            this.setState({ time: Date.now() - this.state.timeStart });
        }, 10);
    }

    stopTimer = () => {
        this.setState({
            status: false,
        });
        clearInterval(this.timer);
    }

    resetTimer = () => {
        this.setState({
            timeStart: 0,
            time: 0
        });
    }

    setStatus = bool => {
        if (bool) {
            if (this.state.status) return;
            this.resetTimer();
            setTimeout(() => {
                this.startTimer();
            }, 0);
        }
        else {
            this.stopTimer();
        }
    }
    
    render() {
        const { time } = this.state;
        const centiseconds = ("0" + (Math.floor(time / 10) % 100)).slice(-2);
        const seconds = ("0" + (Math.floor(time / 1000) % 60)).slice(-2);
        const minutes = ("0" + (Math.floor(time / 60000) % 60)).slice(-2);
      return (
        <div className="timer">
          <div className="timer-header">Timer</div>
          <div className="timer-display">
              {minutes} : {seconds} : {centiseconds}
          </div>
        </div>
      );
    }
  }
