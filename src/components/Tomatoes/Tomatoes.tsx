import * as React from 'react';
import {connect} from 'react-redux';
import {addTomato} from '../../redux/actions';
import TomatoBegin from './TomatoBegin'
import './Tomatoes.scss';

class Tomatoes extends React.Component{
  render(){
    return (
      <div className="Tomatoes" id="Tomatoes">
        <TomatoBegin/>
      </div>
    )
  };
}

const mapStateToProps = (state, ownProps) =>({
  tomatoes: state.tomatoes,
  ...ownProps
});
const mapDispatchToProps = {
  addTomato
};

export default connect(mapStateToProps,mapDispatchToProps)(Tomatoes);