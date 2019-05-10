import * as React from 'react';
import './CountDown.scss'

interface ICountDownProps {
  timer: number;
  duration: number;
  onFinish: () => void;
}
interface ICountDownState {
  countDown: number;
}

let timerId: NodeJS.Timeout;

class CountDown extends React.Component<ICountDownProps,ICountDownState>{
  constructor(props){
    super(props);
    this.state = {
      countDown: this.props.timer
    }
  }

  get countDown(){
    const min = Math.floor(this.state.countDown/(1000*60));
    const sec = Math.floor(this.state.countDown/1000%60);
    return `${min}: ${sec < 10 ? `0${sec}` : sec}`;

  }

  componentDidMount() {

    timerId = setInterval(()=>{
      const time = this.state.countDown;
      this.setState({countDown: time - 1000});
      document.title = `${this.countDown} - Stark tomato`;
      if(time < 1000){
        // 完成倒计时
        document.title = `Stark tomato`;
        this.props.onFinish();
        clearInterval(timerId);
      }
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(timerId);
  }

  render(){
    const percent = 1- this.state.countDown / this.props.duration
    return (
      <div className="CountDown" id="CountDown">
        <span className="restTime">{this.countDown}</span>
        <div className="progress"
             style={{width: `${percent*100}%`}}
        />
      </div>
    )
  }
}

export default CountDown;