import * as React from 'react';
import {format} from 'date-fns';
import './TomatoList.scss';

interface ITomatoListProps {
  finishedTomatoes: any
}

const TomatoItem = (props) =>{
  return (
    <div className="TomatoItem">
      <span className="timeRange">
        {format(props.started_at,'H:mm')}
        -{format(props.ended_at,'H:mm')}
      </span>
      <span className="description">{props.description}</span>
    </div>
  )
}

class TomatoList extends React.Component<ITomatoListProps>{
  constructor(props){
    super(props);
  }

  // componentDidMount() {
  //
  // }

  get dates(){
    const dates = Object.keys(this.props.finishedTomatoes);
    return dates.sort((a,b) => Date.parse(b) - Date.parse(a))
                .splice(0,3);
  }

  render(){
    const list = this.dates.map(date =>{
      const tomatoes = this.props.finishedTomatoes[date];
      return (
        <div key={date} className="dailyTomatoes">
          <div className="title">
            <span className="dateTime">{format(date, 'M月DD日')}</span>
            <span className="finishedCount">完成了{tomatoes.length}个番茄</span>
          </div>
          {tomatoes.map(elem => <TomatoItem key={elem.id} {...elem}/>)}
        </div>
      )
    })

    return (
      <div className="TomatoList" id="TomatoList">
        {list}
      </div>
    )
  }
}

export default TomatoList;