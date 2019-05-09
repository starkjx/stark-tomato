import * as React from 'react';
import { Button, Input, Icon } from 'antd';
import axios from '../../config/axios';
import './TomatoBegin.scss';
// import CountDown from "./CountDown";
import CountDownHook from './CountDownHook'

interface ITomatoBeginProps {
  startTomato: ()=>void;
  unfinishedTomato: any;
  updateTomato: (payload: any)=> void;
}
interface ITomatoBeginState {
  description: string;
}

class TomatoBegin extends React.Component<ITomatoBeginProps,ITomatoBeginState>{
  constructor(props){
    super(props);
    this.state = {
      description: ''
    };
  }

  onKeyUp = (e)=>{
    if(e.keyCode === 13 && this.state.description !== ''){
      this.addDescription();
    }
  }

  onFinish = ()=>{
    this.render();
  }

  addDescription = async ()=>{
    try{
      const response = await axios.post(
        `tomatoes/${this.props.unfinishedTomato.id}`,
        {
          description: this.state.description,
          ended_at: new Date()
        });
      this.props.updateTomato(response.data.resource)
      this.setState({description: ''});

    }catch (e) {
      throw new Error(e);
    }
  }

  render(){
    let html = <div/>
    if(this.props.unfinishedTomato === undefined){
      html =
        <Button
          className="TomatoButton"
          onClick={() =>{this.props.startTomato()}}>
          开始一个番茄时间
        </Button>;
    }else{
      const startedAt = Date.parse(this.props.unfinishedTomato.started_at);
      const duration = this.props.unfinishedTomato.duration;
      const timeNow = new Date().getTime();


      if(timeNow - startedAt > duration){
        html = <div>
          <Input value={this.state.description}
                 placeholder="请输入你刚刚完成的任务"
                 onChange={e=>this.setState({description: e.target.value})}
                 onKeyUp={e=>this.onKeyUp(e)}
          />
          <Icon type="close-circle" />
        </div>
      }else if(timeNow - startedAt < duration){
        const timer = duration - timeNow + startedAt
        html = <CountDownHook timer={timer} onFinish={this.onFinish}/>
      }
    }

    return (
      <div className="TomatoBegin" id="TomatoBegin">
        {html}
      </div>
    )
  };
}

export default TomatoBegin;