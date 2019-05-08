import * as React from 'react';
import {connect} from 'react-redux';
import axios from "../../config/axios";
import {addTomato, initTomatoes} from '../../redux/actions/tomatoesActions';
import TomatoBegin from './TomatoBegin'
import './Tomatoes.scss';

interface ITomatoesProps {
  addTomato: (payload: any) => any;
  tomatoes: any[];
  unfinishedTomato: any;
}

class Tomatoes extends React.Component<ITomatoesProps>{
  constructor(props){
    super(props);
  }

  get unfinishedTomatoes(){
    return this.props.tomatoes.filter(
      elem => !elem.description && !elem.ended_at)[0];
  }
  getToamtoes = async ()=>{
    try{
      const response =await axios.get('tomatoes');
      console.log(response.data);
    }catch (e) {
      throw new Error(e);
    }
}

  startTomato = async () =>{
    try{
      const response = await axios.post(
        'tomatoes',
        {duration: 1500000});
      this.props.addTomato(response.data.resource);
    }catch (e) {
      throw new Error(e);
    }
  }
  componentDidMount(){
    this.getToamtoes()
  }

  render(){
    return (
      <div className="Tomatoes" id="Tomatoes">
        <TomatoBegin startTomato={this.startTomato} unfinishedTomato={this.unfinishedTomatoes}/>
      </div>
    )
  };
}

const mapStateToProps = (state, ownProps) =>({
  tomatoes: state.tomatoes,
  ...ownProps
});
const mapDispatchToProps = {
  addTomato,
  initTomatoes
};

export default connect(mapStateToProps,mapDispatchToProps)(Tomatoes);