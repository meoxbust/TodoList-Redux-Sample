import { ListTodo } from "../../types";
import { ADD_LIST, ADD_TODO, FINISH_TODO, GET_LIST } from "../actions/contants";

interface InitialStateType {
  listTodo: ListTodo[];
}

interface Payload {
  type: string;
  payload?: any;
}

const initialState: InitialStateType = {
  listTodo: [],
};

const appReducer = (
  state: InitialStateType = initialState,
  action: Payload
): InitialStateType => {
  switch (action.type) {
    case ADD_LIST: {
      return {
        ...state,
        listTodo: [action.payload, ...state.listTodo],
      };
    }
    case GET_LIST: {
      return {
        ...state,
        listTodo: action.payload,
      };
    }
    case ADD_TODO: {
      return {
        ...state,
        listTodo: state.listTodo?.map((list) => {
          if (list?.id === action.payload?.id) {
            return {
              ...list,
              todos: [...list.todos, action.payload.todo],
            };
          }
          return list;
        }),
      };
    }
    case FINISH_TODO: {
      return {
        ...state,
        listTodo: state.listTodo?.map((item) => {
          if (item.id === action.payload.idList) {
            return {
              ...item,
              todos: item.todos?.map((todo) => {
                if (todo.id === action.payload.idTodo) {
                  return {
                    ...todo,
                    completed: !todo.completed,
                  };
                }
                return todo;
              }),
            };
          }
          return item;
        }),
      };
    }
    default: {
      return state;
    }
  }
};

export default appReducer;
