import * as React from 'react';
import { Button, Input, Icon, Modal } from 'antd';
import axios from '../../config/axios';
import './TomatoBegin.scss';
import CountDown from "./CountDown";
// import CountDownHook from './CountDownHook'

interface ITomatoBeginProps {
  startTomato: ()=>void;
  unfinishedTomato: any;
  updateTomato: (payload: any)=> void;
}
interface ITomatoBeginState {
  description: string;
}

const confirm = Modal.confirm;

class TomatoBegin extends React.Component<ITomatoBeginProps,ITomatoBeginState>{
  constructor(props){
    super(props);
    this.state = {
      description: ''
    };
  }

  onKeyUp = (e)=>{
    if(e.keyCode === 13 && this.state.description !== ''){
      this.updateTomato({
        description: this.state.description,
        ended_at: new Date()
      });
      this.setState({description: ''});
    }
  }

  onFinish = ()=>{
    this.forceUpdate();
  }

  abortTomato = ()=>{
    this.updateTomato({aborted: true})
    document.title = `Stark tomato`;

  }

  updateTomato = async (params: any)=>{
    try{
      const response = await axios.put(
        `tomatoes/${this.props.unfinishedTomato.id}`,params);
      this.props.updateTomato(response.data.resource)
    }catch (e) {
      throw new Error(e);
    }
  }

  showConfirm = ()=> {
    confirm({
      title: '当前正在一个番茄时间内，要放弃该番茄吗？',
      onOk: ()=>{
        console.log('确认');
        this.abortTomato();
      },
      onCancel(){
        console.log('取消')
      },
      cancelText: '取消',
      okText: '确认',
    });
  }

  render(){
    let html = <div/>
    if(this.props.unfinishedTomato === undefined){
      html =
        <Button
          className="startTomatoButton"
          onClick={() =>{this.props.startTomato()}}>
          开始一个番茄时间
        </Button>;
    }else{
      const startedAt = Date.parse(this.props.unfinishedTomato.started_at);
      const duration = this.props.unfinishedTomato.duration;
      const timeNow = new Date().getTime();


      if(timeNow - startedAt > duration){
        html = <div className="inputWrapper">
          <Input value={this.state.description}
                 placeholder="请输入你刚刚完成的任务"
                 onChange={e=>this.setState({description: e.target.value})}
                 onKeyUp={e=>this.onKeyUp(e)}
          />
          <Icon type="close-circle" className="abort"
                onClick={this.showConfirm}/>
        </div>
      }else if(timeNow - startedAt < duration){
        const timer = duration - timeNow + startedAt
        html = (
          <div className="countDownWrapper">
            <CountDown timer={timer} onFinish={this.onFinish} duration={duration}/>
            <Icon type="close-circle" className="abort"
                  onClick={this.showConfirm}/>
          </div>
        )
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