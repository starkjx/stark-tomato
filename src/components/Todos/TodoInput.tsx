import * as React from 'react';
import { connect } from 'react-redux';
import { addTodo } from "../../redux/actions";
import { Input } from 'antd';
import axios from '../../config/axios';

interface ITodoInputState {
  description: string;
}

interface ITodoInputProps {
  addTodo: (payload: any) => any;
}
class TodoInput extends React.Component<ITodoInputProps, ITodoInputState>{
  constructor(props){
    super(props);
    this.state = {
      description: ''
    }
  }
  onChange = (e) => {
    this.setState({
      description: e.target.value
    })
  };
  onKeyUp = (e)=>{
    if(e.keyCode === 13 && this.state.description !== ''){
      // 提交todo
      this.postTodo();
    }
  }
  postTodo = async ()=>{
    try{
      const response = await axios.post(
        'todos',
        {description: this.state.description});
      this.props.addTodo(response.data.resource);
    }catch (e) {
      throw new Error(e);
    }
    this.setState({
      description: ''
    });
  }
  render(){
    const { description } = this.state;
    return (
      <div className="TodoInput" id="TodoInput">
        <Input
          placeholder="添加新任务"
          value={description}
          allowClear={true}
          onChange={this.onChange}
          onKeyUp={this.onKeyUp}
        />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) =>({
  ...ownProps
});
const mapDispatchToProps = {
  addTodo
};

export default connect(mapStateToProps,mapDispatchToProps)(TodoInput);