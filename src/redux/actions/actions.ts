import { ListTodo, Todo } from "../../types";
import { ADD_LIST, ADD_TODO, FINISH_TODO, GET_LIST } from "./contants";

export const addList = (payload: ListTodo) => {
  return {
    type: ADD_LIST,
    payload,
  };
};

export const getList = (list: ListTodo[]) => {
  return {
    type: GET_LIST,
    payload: list,
  };
};

export const addTodo = (payload: { id: string; todo: Todo }) => {
  return {
    type: ADD_TODO,
    payload,
  };
};

export const finishTodo = (idList: string, idTodo: number) => {
  return {
    type: FINISH_TODO,
    payload: {
      idList,
      idTodo,
    },
  };
};
