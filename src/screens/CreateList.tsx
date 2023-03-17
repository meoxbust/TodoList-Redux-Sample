import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
  TouchableNativeFeedback,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import color from "../utils/color";
import { useDispatch } from "react-redux";
import { addList } from "../redux/actions/actions";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../config/firebase";
import { useNavigation } from "@react-navigation/native";
import { Navigation } from "../types";

const colors = [
  "#e11d48",
  "#db2777",
  "#c026d3",
  "#9333ea",
  "#7c3aed",
  "#4f46e5",
  "#2563eb",
];

const CreateList = () => {
  const [currentColor, setCurrentColor] = useState(colors[0]);
  const [text, setText] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigation<Navigation>();

  const handleCreateList = async () => {
    try {
      if (!text.trim()) return Alert.alert("List name is required!");
      // handle save data db
      setLoading(true);
      const listTodo = {
        title: text,
        background: currentColor,
        todos: [],
        createdAt: Timestamp.now(),
      };
      const docRef = await addDoc(collection(db, "todos"), listTodo);
      dispatch(addList({ ...listTodo, id: docRef.id }));
      navigate.navigate("Home");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableNativeFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Text style={styles.title}>Create Todo List</Text>
        <TextInput
          value={text}
          onChangeText={(newText) => setText(newText)}
          style={styles.textInput}
          placeholder="List Name?"
        />
        <View style={styles.wrapColor}>
          {colors.map((color) => (
            <TouchableOpacity
              key={color}
              onPress={() => setCurrentColor(color)}
              style={[styles.colorItem, { backgroundColor: color }]}
            />
          ))}
        </View>
        <TouchableOpacity
          onPress={handleCreateList}
          style={[
            styles.createButton,
            { backgroundColor: currentColor, opacity: loading ? 0.5 : 1 },
          ]}
        >
          <Text style={styles.createButtonText}>
            {loading ? <ActivityIndicator color="#fff" /> : "Create"}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableNativeFeedback>
  );
};

export default CreateList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: { fontSize: 30, fontWeight: "700" },
  textInput: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    width: "100%",
    marginTop: 30,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  wrapColor: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 30,
    gap: 5,
  },
  colorItem: {
    width: 40,
    height: 40,
    borderRadius: 8,
  },
  createButton: {
    marginTop: 30,
    width: "100%",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  createButtonText: { color: color.white, fontSize: 16, fontWeight: "700" },
  closeIcons: { position: "absolute", top: 0, right: 0, padding: 10 },
});
