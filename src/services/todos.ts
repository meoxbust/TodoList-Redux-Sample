import { collection, query, getDocs, orderBy } from "firebase/firestore";
import { db } from "../config/firebase";
import { ListTodo } from "../types";

export const getTodos = async () => {
  const list: ListTodo[] = [];
  const q = query(collection(db, "todos"), orderBy("createdAt", "desc"));
  const querySnapShot = await getDocs(q);
  querySnapShot?.forEach((doc) => {
    list.push({ ...(doc.data() as ListTodo), id: doc.id });
  });
  return list;
};
