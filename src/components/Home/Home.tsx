import * as React from 'react';
import { Dropdown, Icon, Menu} from 'antd';
import Todos from '../Todos/Todos';
import Tomatoes from '../Tomatoes/Tomatoes';
import axios from 'src/config/axios';
import history from 'src/config/history';
import './Home.scss';

interface IRouter {
  history: any;
}
interface IHomeState {
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


class Home extends React.Component<IRouter, IHomeState>{
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
      <div className="Home" id="Home">
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
          <Tomatoes/>
          <Todos/>
        </main>
      </div>
    )
  };
}

export default Home;