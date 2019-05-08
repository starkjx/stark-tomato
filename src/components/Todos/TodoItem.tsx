import * as React from 'react';
import { connect } from 'react-redux';
import axios from "../../config/axios";
import {editTodo, updateTodo} from '../../redux/actions/todosActions';
import { Checkbox, Icon } from 'antd';
import './TodoItem.scss';
import classNames from 'classnames';

interface ITodoItemProps {
  id: number;
  completed: boolean;
  description: string;
  editing: boolean;
  deleted: boolean;
  editTodo: (id: number) => any;
  updateTodo: (payload: any) => any;
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

  updateTodo = async (params: any) =>{
    try{
      const response = await axios.put(`todos/${this.props.id}`, params)
      this.props.updateTodo(response.data.resource)
    }catch (e) {
      throw new Error(e);
    }
  }
  editTodo = () => {
    this.props.editTodo(this.props.id);
  }
  onKeyUp = (e) =>{
    if(e.keyCode === 13 && this.state.editText !== ''){
      // 更新todo
      this.updateTodo({description: this.state.editText});
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
                onClick={ () =>this.updateTodo({deleted: true})}/>
        </div>
      </div>
    );
    const Text =
      <span className="text" onDoubleClick={this.editTodo}>
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
          onChange={e => this.updateTodo({completed: e.target.checked})}
        />
        {this.props.editing ? Editing : Text}
      </div>
    )
  };
}

const mapStateToProps = (state, ownProps) =>({
  todos: state.todos,
  ...ownProps
});
const mapDispatchToProps = {
  editTodo,
  updateTodo
};

export default connect(mapStateToProps,mapDispatchToProps)(TodoItem);