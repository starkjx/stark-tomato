import * as React from 'react';
import { Button } from 'antd';
import './TomatoBegin.scss';

interface ITomatoBeginProps {
  startTomato: ()=>void;
  unfinishedTomato: any;
}

class TomatoBegin extends React.Component<ITomatoBeginProps>{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className="TomatoBegin" id="TomatoBegin">
        <Button
          className="TomatoButton"
          onClick={() =>{this.props.startTomato()}}>
          开始一个番茄时间
        </Button>
      </div>
    )
  };
}

export default TomatoBegin;