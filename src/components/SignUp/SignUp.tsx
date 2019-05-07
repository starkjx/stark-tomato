import * as React from 'react';
import { Input, Icon, Button } from 'antd';
import axios from 'src/config/axios';
import { Link } from 'react-router-dom';
import './SignUp.scss'

interface ISignUpState {
  account: string,
  password: string,
  passwordConformation: string
}

class SignUp extends React.Component<any, ISignUpState>{
  constructor(props){
    super(props);
    this.state = {
      account: '',
      password: '',
      passwordConformation: ''
    }
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange = (key: keyof ISignUpState, value: string)=>{
    const newState = {};
    newState[key] = value;
    this.setState(newState);
  }

  onSubmit = async()=>{
    const{ account, password, passwordConformation} = this.state;
    try{
      await axios.post('sign_up/user',{
        account,
        password,
        password_confirmation: passwordConformation
      })
      this.props.history.push('/');
      console.log('success');
    }catch (e) {
      throw new Error(e)
    }
  }
  render(){
    const{ account, password, passwordConformation} = this.state;
    return (
      <div className="SignUp" id="SignUp">
        <h1>Stark tomato注册</h1>
        <Input
          placeholder="请输入你的用户名"
          prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
          value={account}
          onChange={(e) => this.onChange('account', e.target.value)}
        />
        <Input.Password
          value={password}
          placeholder="请输入密码"
          onChange={(e) => this.onChange('password', e.target.value)}
        />
        <Input.Password
          value={passwordConformation}
          placeholder="请确认密码"
          onChange={(e) => this.onChange('passwordConformation', e.target.value)}
        />
        <Button type="primary" className="SignUpButton" onClick={this.onSubmit}>注册</Button>
        <p>已有账号？请点击<Link to="/login">登录</Link></p>
      </div>
    )
  };
}

export default SignUp;