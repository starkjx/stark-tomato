import * as React from 'react';
import { Checkbox, Icon } from 'antd';
import './TodoItem.scss';
import classNames from 'classnames';

interface ITodoItemProps {
  id: number;
  completed: boolean;
  description: string;
  editing: boolean;
  deleted: boolean;
  update: (id: number, params: any) => void;
  toEditing: (id: number) => void;
}
interface ITodoItemState {
  editText: string;
}

class TodoItem extends React.Component<ITodoItemProps,ITodoItemState> {
  constructor(props) {
    super(props);
    this.state ={
      editText: this.props.description
    };
  }

  update = (params: any) => {
    this.props.update(this.props.id, params);
  }
  toEditing = () => {
    this.props.toEditing(this.props.id);
  }
  onKeyUp = (e) =>{
    if(e.keyCode === 13 && this.state.editText !== ''){
      // 更新todo
      this.update({description: this.state.editText});
    }
  }

  render() {
    const Editing = (
      <div className="editing">
        <input
          type="text"
          value={this.state.editText}
          onChange={e => this.setState({editText: e.target.value})}
          onKeyUp={this.onKeyUp}
        />
        <div className="iconWrapper">
          <Icon type="enter" />
          <Icon type="delete" theme="filled"
                onClick={ () =>this.update({deleted: true})}/>
        </div>
      </div>
    );
    const Text =
      <span className="text" onDoubleClick={this.toEditing}>
        {this.props.description}
      </span>;
    const todoItemClass = classNames({
      completed: this.props.completed,
      editing: this.props.editing,
      TodoItem: true
    });
    return (
      <div className={todoItemClass} id="TodoItem">
        <Checkbox
          checked={this.props.completed}
          onChange={e => this.update({completed: e.target.checked})}
        />
        {this.props.editing ? Editing : Text}
      </div>
    )
  };
}

export default TodoItem;