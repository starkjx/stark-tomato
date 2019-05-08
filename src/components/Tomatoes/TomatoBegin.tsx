import * as React from 'react';
import { Button } from 'antd';
import axios from '../../config/axios';
import './TomatoBegin.scss';

class TomatoBegin extends React.Component{
  startTomato = async () =>{
    try{
      const response = await axios.post(
        'tomatoes',
        {duration: 1500000});
      console.log(response);
    }catch (e) {
      throw new Error(e);
    }
  }
  render(){
    return (
      <div className="TomatoBegin" id="TomatoBegin">
        <Button
          className="TomatoButton"
          onClick={this.startTomato}>
          开始一个番茄时间
        </Button>
      </div>
    )
  };
}

export default TomatoBegin;