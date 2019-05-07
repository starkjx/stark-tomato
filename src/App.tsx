import * as React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import './App.scss';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import Index from './components/Index/Index';



class App extends React.Component{
  render(){
    return (
      <Router>
        <Route path="/" exact={true} component={Index} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
      </Router>
    )
  }
}

export default App;
// function App() {
//   return (
//     <Router>
//       <div>
//         <Header/>
//         <Route exact={true} path="/" component={Home}/>
//         <Route path="/about" component={About}/>
//         <Route path="/topics" component={Topics}/>
//       </div>
//     </Router>
//   );
// }
//
// function Home() {
//   return <h2>Home</h2>;
// }
//
// function About() {
//   return <h2>About</h2>;
// }
//
// function Topic({match}) {
//   return <h3>Requested Param: {match.params.id}</h3>;
// }
//
// function Topics({match}) {
//   return (
//     <div>
//       <h2>Topics</h2>
//       <ul>
//         <li>
//           <Link to={`${match.url}/components`}>Components</Link>
//         </li>
//         <li>
//           <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
//         </li>
//       </ul>
//
//       <Route path={`${match.path}/:id`} component={Topic}/>
//       <Route
//         exact={true}
//         path={match.path}
//         render={() => <h3>Please select a topic.</h3>}
//       />
//     </div>
//   );
// }
//
// function Header() {
//   return (
//     <ul>
//       <li>
//         <Link to="/">Home</Link>
//       </li>
//       <li>
//         <Link to="/about">About</Link>
//       </li>
//       <li>
//         <Link to="/topics">Topics</Link>
//       </li>
//     </ul>
//   );
// }
//
// export default App;
