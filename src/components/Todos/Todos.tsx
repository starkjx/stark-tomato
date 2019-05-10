import * as React from 'react';
import { connect } from 'react-redux';
import { initTodos, updateTodo} from "../../redux/actions/todosActions";
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import axios from '../../config/axios';
import './Todos.scss';

class Todos extends React.Component<any>{
  constructor(props){
    super(props);
  }

  get unCompletedTodos(){
    return this.unDeletedTodos.filter(elem => !elem.completed)
  }
  get unDeletedTodos(){
    return this.props.todos.filter(elem => !elem.deleted)
  }
  get completedTodos(){
    return this.unDeletedTodos.filter(elem => elem.completed)
  }

  getTodos = async ()=>{
    try{
      const response = await axios.get('todos');
      const todos = response.data.resources.map(elem =>
        Object.assign({}, elem, {editing: false})
      );
      // console.log(response.data);
      this.props.initTodos(todos);
    }catch (e) {
      throw new Error(e);
    }
  }
  componentDidMount(){
    this.getTodos()
  }
  render(){
    return (
      <div className="Todos" id="Todos">
        <TodoInput/>
        <div className="todoLists">
          {
            this.unCompletedTodos.map( elem => {
              return <TodoItem 
                key={elem.id}
                {...elem}/>
            })
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) =>({
  todos: state.todos,
  ...ownProps
});
const mapDispatchToProps = {
  initTodos,
  updateTodo
};

export default connect(mapStateToProps,mapDispatchToProps)(Todos);