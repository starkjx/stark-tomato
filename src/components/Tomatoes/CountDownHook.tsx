
import React, {useState, useEffect, FunctionComponent} from 'react';

interface ICountDownHookProps {
  timer: number;
  onFinish: () => void;
}


let timerId: NodeJS.Timeout;

const CountDownHook: FunctionComponent<ICountDownHookProps> = (props)=>{
  const [countDown,setCountDown] = useState(props.timer);
  const min = Math.floor(countDown/(1000*60));
  const sec = Math.floor(countDown/1000%60);
  const time = `${min}: ${sec < 10 ? `0${sec}` : sec}`;

  useEffect(()=>{
    document.title = `${time} - Stark tomato`;
    timerId = setInterval(()=>{
      setCountDown(countDown - 1000)
      if(countDown < 0){
        // 完成倒计时
        props.onFinish();
        document.title = `Stark tomato`;
        clearInterval(timerId);
      }
    }, 1000)

    return function clearup() {
      clearInterval(timerId)
    }
  })

  return (
    <div className="CountDown">
      {time}
    </div>
  )
}

export default CountDownHook;