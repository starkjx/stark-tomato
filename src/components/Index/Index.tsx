import * as React from 'react';
import { Dropdown, Icon, Menu} from 'antd';
import Todos from 'src/components/Todos/Todos';
import axios from 'src/config/axios';
import history from 'src/config/history';
import './Index.scss';

interface IRouter {
  history: any;
}
interface IIndexState {
  user: any;
}

const Logout = ()=>{
  localStorage.setItem('x-token', '');
  history.push('/login')
}

// onClick={handleMenuClick}
const menu = (
  <Menu >
    <Menu.Item key="1"><Icon type="user" />个人设置</Menu.Item>
    <Menu.Item key="2" onClick={Logout}><Icon type="logout" />注销</Menu.Item>
  </Menu>
);


class Index extends React.Component<IRouter, IIndexState>{
  constructor(props){
    super(props);
    this.state = {
      user: {}
    };
  }
  async componentWillMount(){
    await  this.getMe();
  }
  getMe = async ()=>{
      const response = await axios.get("me")
      this.setState({
        user: response.data
      });
  }

  render(){
    return (
      <div className="Index" id="Index">
        <header>
          <span className="logo">Stark tomato</span>
          <Dropdown className="userOptions" overlay={menu}>
            <span >
              {this.state.user && this.state.user.account}
              <Icon type="down"  style={{marginLeft: 8}}/>
            </span>
          </Dropdown>
        </header>
        <main>
          <Todos/>
        </main>
      </div>
    )
  };
}

export default Index;