import { View, Text } from "react-native";
import React from "react";
import { Todo } from "../types";
import Checkbox from "expo-checkbox";

interface TodoItemProps {
  item: Todo;
  background: string;
  handleChange: (idTodo: number) => void;
}

const TodoItem = ({ item, background, handleChange }: TodoItemProps) => {
  return (
    <View
      style={{
        padding: 10,
        borderWidth: 1,
        borderColor: background,
        borderRadius: 5,
        flexDirection: "row",
        alignItems: "center",
      }}
      key={item.id}
    >
      <Checkbox
        value={item.completed}
        onValueChange={() => handleChange(item.id)}
        color={item.completed ? background : undefined}
        style={{ marginRight: 10 }}
      />
      <Text style={{ fontSize: 16, fontWeight: "600" }}>{item.name}</Text>
    </View>
  );
};

export default TodoItem;
