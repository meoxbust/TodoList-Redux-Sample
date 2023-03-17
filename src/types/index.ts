import { Timestamp } from "firebase/firestore";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";

export interface Todo {
  id: number;
  name: string;
  completed: boolean;
  createdAt: Timestamp;
}

export interface ListTodo {
  title: string;
  todos: Todo[];
  background: string;
  id: string;
  createdAt: Timestamp;
}

export type RootStackParamList = {
  Home: undefined;
  ListTodoDetail: { id: string };
  CreateList: undefined;
};

export type Navigation = NativeStackNavigationProp<RootStackParamList>;

export type Route = RouteProp<RootStackParamList>;
