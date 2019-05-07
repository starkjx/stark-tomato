import * as React from 'react';
import {Button} from 'antd'

interface IRouter {
  history: any;
}

class Index extends React.Component<IRouter>{
  constructor(props){
    super(props);
    this.login = this.login.bind(this);
  }

  login(){
    this.props.history.push('login');
  }
  render(){
    return (
      <div className="Index">
        <Button onClick={this.login}>登录</Button>
      </div>
    )
  };
}

export default Index;