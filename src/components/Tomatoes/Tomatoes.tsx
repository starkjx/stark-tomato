import * as React from 'react';
import {connect} from 'react-redux';
import axios from "../../config/axios";
import _ from 'lodash';
import {format} from 'date-fns'
import {addTomato, updateTomato} from '../../redux/actions/tomatoesActions';
import TomatoBegin from './TomatoBegin';
import TomatoList from './TomatoList';
import './Tomatoes.scss';

interface ITomatoesProps {
  addTomato: (payload: any) => any;
  initTomatoes: (payload: any[]) => any;
  updateTomato: (payload: any) => any;
  tomatoes: any[];
}

class Tomatoes extends React.Component<ITomatoesProps>{
  constructor(props){
    super(props);
  }

  get unfinishedTomato(){
    return this.props.tomatoes.filter(
      elem => !elem.description && !elem.ended_at && !elem.aborted)[0]
  }
  get finishedTomatoes(){
    const finishedTomatoes = this.props.tomatoes.filter(
      elem => elem.description && elem.ended_at && !elem.aborted
    );
    const obj = _.groupBy(finishedTomatoes,(tomato)=>{
      return format(tomato.started_at, 'YYYY-MM-D');
    });
    return obj;
  }

  startTomato = async () =>{
    try{
      const response = await axios.post(
        'tomatoes', {duration: 1500000});
      this.props.addTomato(response.data.resource);
    }catch (e) {
      throw new Error(e);
    }
  }

  render(){
    return (
      <div className="Tomatoes" id="Tomatoes">
        <TomatoBegin
          startTomato={this.startTomato}
          unfinishedTomato={this.unfinishedTomato}
          updateTomato={this.props.updateTomato}
        />
        <TomatoList finishedTomatoes={this.finishedTomatoes}/>
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
  updateTomato
};

export default connect(mapStateToProps,mapDispatchToProps)(Tomatoes);