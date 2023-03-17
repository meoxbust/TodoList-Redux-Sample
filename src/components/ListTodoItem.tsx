import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import color from "../utils/color";
import { ListTodo, Navigation } from "../types";
import { useNavigation } from "@react-navigation/native";

interface ListTodoItemProps {
  item: ListTodo;
}

export default function ListTodoItem({ item }: ListTodoItemProps) {
  const remaining = item?.todos?.filter((todo) => !todo.completed)?.length;
  const completed = item?.todos?.filter((todo) => todo.completed)?.length;

  const navigate = useNavigation<Navigation>();

  return (
    <TouchableOpacity
      onPress={() => navigate.navigate("ListTodoDetail", { id: item.id })}
    >
      <View style={[styles.listTodo, { backgroundColor: item.background }]}>
        <Text numberOfLines={1} style={styles.listTodoTitle}>
          {item.title}
        </Text>
        <View style={styles.listTodoWrap}>
          <Text style={styles.listTodoNumber}>{remaining}</Text>
          <Text style={styles.listTodoText}>Remaining</Text>
        </View>
        <View style={styles.listTodoWrap}>
          <Text style={styles.listTodoNumber}>{completed}</Text>
          <Text style={styles.listTodoText}>Completed</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  listTodo: {
    height: "100%",
    padding: 30,
    width: 250,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  listTodoTitle: {
    fontSize: 30,
    fontWeight: "700",
    color: color.white,
    textAlign: "center",
  },
  listTodoNumber: {
    color: color.white,
    fontSize: 35,
    fontWeight: "700",
  },
  listTodoText: {
    color: color.white,
    fontSize: 16,
    fontWeight: "600",
  },
  listTodoWrap: {
    alignItems: "center",
  },
});
