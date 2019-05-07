import * as React from 'react';
import { Router, Route} from "react-router-dom";
import history from './config/history';
import './App.scss';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import Index from './components/Index/Index';



class App extends React.Component{
  render(){
    return (
      <Router history = {history}>
        <Route path="/" exact={true} component={Index} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
      </Router>
    )
  }
}

export default App;
