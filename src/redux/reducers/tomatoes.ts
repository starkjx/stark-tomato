import {ADD_TOMATO, INIT_TOMATOES, UPDATE_TOMATO} from "../actionTypes";

export default (state: any[]=[], action: any):any => {
  switch ((action.type)) {
    case ADD_TOMATO:
      return [action.payload, ...state];
    case INIT_TOMATOES:
      return state.map(elem =>{
        if(elem.id === action.payload.id){
          return action.payload;
        }else{
          return elem;
        }
      });
    case UPDATE_TOMATO:
      return [action.payload, ...state];
    default: return state;
  }
}