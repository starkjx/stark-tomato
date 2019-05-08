import * as React from 'react';
import { Input } from 'antd';

interface ITodoInputState {
  description: string;
}

interface ITodoInputProps {
  addTodo: (params: any) => void;
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
      this.props.addTodo({description: this.state.description});
      this.setState({
        description: ''
      });
    }
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

export default TodoInput;