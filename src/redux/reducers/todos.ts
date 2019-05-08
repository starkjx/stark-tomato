import { ADD_TODO, INIT_TODOS, UPDATE_TODO, EDIT_TODO } from '../actionTypes';
export default (state: any[] = [], action: any):any =>{
  switch (action.type) {
    case ADD_TODO:
      return [action.payload, ...state];
    case INIT_TODOS:
      return [...action.payload];
    case UPDATE_TODO:
      return state.map(elem =>{
        if(elem.id === action.payload.id){
          return action.payload;
        }else{
          return elem;
        }
      });
    case EDIT_TODO:
      return state.map(elem =>{
        if(elem.id === action.payload){
          return Object.assign({}, elem, {editing: true});
        }else{
           return Object.assign({}, elem, {editing: false});
        }
      });
    default:
      return state
  }
}