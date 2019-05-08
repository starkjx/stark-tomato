import * as React from 'react';
import { connect } from 'react-redux';
import { addTodo } from "../../redux/actions";
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import axios from '../../config/axios';
import './Todos.scss';

interface ITodosState {
  todos: any[];
}

class Todos extends React.Component<any, ITodosState>{
  constructor(props){
    super(props);
    this.state = {
      todos: []
    };
  }

  get unCompletedTodos(){
    return this.unDeletedTodos.filter(elem => !elem.completed)
  }
  get unDeletedTodos(){
    return this.state.todos.filter(elem => !elem.deleted)
  }
  get completedTodos(){
    return this.unDeletedTodos.filter(elem => elem.completed)
  }

  // addTodo = async (params: any) =>{
  //   const {todos} = this.state;
  //   try{
  //     const response = await axios.post('todos', params)
  //     // console.log(response.data);
  //     this.setState({
  //       todos: [response.data.resource,...todos]
  //     });
  //   }catch (e) {
  //     throw new Error(e)
  //   }
  // }
  getTodos = async ()=>{
    try{
      const response = await axios.get('todos');
      const todos = response.data.resources.map(elem =>
        Object.assign({}, elem, {editing: false})
      );
      // console.log(response.data);
      this.setState({todos});
    }catch (e) {
      throw new Error(e);
    }
  }
  updateTodo = async (id: number, params: any) =>{
    const {todos} = this.state;
    try{
      const response = await axios.put(`todos/${id}`, params)
      const newTodos = todos.map(elem =>{
        if(id === elem.id){
          return response.data.resource;
        }else {
          return elem;
        }
      });
      this.setState({
        todos: newTodos
      });
    }catch (e) {
      throw new Error(e);
    }
  }
  toEditing =(id: number) =>{
    const {todos} = this.state;
    const newTodos = todos.map(elem =>{
      if(id === elem.id){
        return Object.assign({},elem,{editing: true})
      }else{
        return Object.assign({},elem,{editing: false})
      }
    });
    this.setState({
      todos: newTodos
    });
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
                update={this.updateTodo}
                toEditing={this.toEditing}
                {...elem}/>
            })
          }
          {
            this.completedTodos.map( elem => {
              return <TodoItem
                key={elem.id}
                update={this.updateTodo}
                toEditing={this.toEditing}
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
  addTodo
};

export default connect(mapStateToProps,mapDispatchToProps)(Todos);