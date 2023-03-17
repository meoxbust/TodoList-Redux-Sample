import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import ListTodoItem from "../components/ListTodoItem";
import { RootState } from "../redux/store";
import color from "../utils/color";
import { useDispatch, useSelector } from "react-redux";
import { getList } from "../redux/actions/actions";
import Loading from "../components/Loading";
import useFetch from "../hooks/useFetch";
import { getTodos } from "../services/todos";
import { useNavigation } from "@react-navigation/native";
import { Navigation } from "../types";

const Home = () => {
  const { listTodo } = useSelector((state: RootState) => state.app);
  const { data, error, loading } = useFetch("getTodos", getTodos);

  const dispatch = useDispatch();
  const navigate = useNavigation<Navigation>();

  useEffect(() => {
    if (data?.length === 0) return;
    dispatch(getList(data));
  }, [data?.length]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <View>Server not found!</View>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.todoTile}>
        <View style={styles.wrap}>
          <Text style={styles.title}>Todo</Text>
          <Text style={[styles.title, styles.textBlue]}>List</Text>
        </View>
        <TouchableOpacity onPress={() => navigate.navigate("CreateList")}>
          <View style={styles.addButton}>
            <AntDesign name="plus" size={30} color={color.primary} />
          </View>
          <Text style={styles.addList}>Add List</Text>
        </TouchableOpacity>
      </View>

      {listTodo.length > 0 ? (
        <FlatList
          ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
          showsHorizontalScrollIndicator={false}
          keyExtractor={({ title }) => title}
          horizontal={true}
          data={listTodo}
          renderItem={({ item }) => <ListTodoItem item={item} />}
        />
      ) : (
        <View style={styles.viewTodoEmty}>
          <Text style={{ fontSize: 16, fontWeight: "600" }}>Not todo...</Text>
        </View>
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 50,
  },
  wrap: {
    flexDirection: "row",
    gap: 5,
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
  },
  textBlue: {
    color: color.primary,
    fontWeight: "600",
  },
  addButton: {
    marginTop: 15,
    borderWidth: 1,
    borderColor: color.primary,
    padding: 5,
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  todoTile: {
    paddingVertical: 100,
    alignItems: "center",
  },
  addList: {
    color: color.primary,
    marginTop: 10,
  },
  viewTodoEmty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    width: "100%",
    borderRadius: 8,
  },
});
