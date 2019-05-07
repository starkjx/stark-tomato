import * as React from 'react';
import {Button} from 'antd';
import axios from 'src/config/axios';

interface IRouter {
  history: any;
}
interface IIndexState {
  user: any;
}

class Index extends React.Component<IRouter, IIndexState>{
  constructor(props){
    super(props);
    this.state = {
      user: {}
    };
    this.Logout = this.Logout.bind(this);
  }
  async componentWillMount(){
    await  this.getMe();
  }
  getMe = async ()=>{
    try{
      const response = await axios.get("me")
      this.setState({
        user: response.data
      })
      // console.log(response);
    }catch (e) {
      // console.log(e);
    }
  }
  Logout = ()=>{
    localStorage.setItem('x-token', '');
    this.props.history.push('/login')
  }

  render(){
    return (
      <div className="Index">
        <p>欢迎,{this.state.user.account}</p>
        <Button onClick={this.Logout}>登出</Button>
      </div>
    )
  };
}

export default Index;