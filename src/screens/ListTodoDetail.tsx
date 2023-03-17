import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import React from "react";
import { ListTodo, Navigation, Route, Todo } from "../types";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { updateDoc, doc, Timestamp } from "firebase/firestore";
import { useState } from "react";
import { db } from "../config/firebase";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, finishTodo } from "../redux/actions/actions";
import { RootState } from "../redux/store";
import TodoItem from "../components/TodoItem";

const ListTodoDetail = () => {
  const { params } = useRoute<Route>();
  const navigate = useNavigation<Navigation>();
  const [text, setText] = useState("");

  const { listTodo } = useSelector((state: RootState) => state.app);
  const dispatch = useDispatch();

  const list = listTodo?.find((list) =>
    params ? list.id === params.id : {}
  ) as ListTodo;

  const addTodos = async () => {
    const docRef = doc(db, `todos/${list?.id}`);
    const newTodo = {
      id: Math.random(),
      name: text,
      completed: false,
      createdAt: Timestamp.now(),
    };
    await updateDoc(docRef, {
      todos: [...(list?.todos as Todo[]), newTodo] as Todo[],
    });
    dispatch(addTodo({ id: list?.id as string, todo: newTodo }));
    setText("");
  };

  const handleChange = (idTodo: number) => {
    const docRef = doc(db, `todos/${list?.id}`);
    updateDoc(docRef, {
      todos: list.todos.map((todo) => {
        if (todo.id === idTodo) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
        return todo;
      }),
    });
    dispatch(finishTodo(list.id, idTodo));
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <View style={styles.header}>
          <Ionicons
            onPress={() => navigate.goBack()}
            name="arrow-back"
            size={30}
          />
          <Text numberOfLines={1} style={styles.headerTitle}>
            {list?.title}
          </Text>
          <View />
        </View>
        <View style={[styles.line, { backgroundColor: list?.background }]} />
      </View>
      <View
        style={{
          flex: 1,
          marginTop: 10,
          paddingHorizontal: 16,
        }}
      >
        <FlatList
          ItemSeparatorComponent={() => <View style={{ marginBottom: 10 }} />}
          data={list?.todos}
          renderItem={({ item }) => (
            <TodoItem
              handleChange={handleChange}
              item={item}
              background={list.background}
            />
          )}
        />
      </View>
      <View style={{ padding: 16, flexDirection: "row" }}>
        <TextInput
          value={text}
          onChangeText={(newText) => setText(newText)}
          placeholder="Todos..."
          style={{
            borderWidth: 1,
            borderColor: list?.background,
            borderRadius: 8,
            paddingHorizontal: 16,
            paddingVertical: 10,
            flex: 1,
            marginRight: 10,
          }}
        />
        <TouchableOpacity
          onPress={addTodos}
          style={{
            height: 50,
            width: 50,
            borderWidth: 1,
            borderColor: list?.background,
            borderRadius: 8,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <AntDesign name="plus" color={list.background} size={30} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ListTodoDetail;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignItems: "center",
  },
  headerTitle: { fontSize: 25, fontWeight: "700", paddingHorizontal: 10 },
  line: {
    width: "100%",
    height: 3,
  },
});
