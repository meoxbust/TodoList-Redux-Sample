import { Provider } from "react-redux";
import store from "./src/redux/store";
import Home from "./src/screens/Home";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListTodoDetail from "./src/screens/ListTodoDetail";
import CreateList from "./src/screens/CreateList";
import { RootStackParamList } from "./src/types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="Home"
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="ListTodoDetail" component={ListTodoDetail} />
          <Stack.Screen name="CreateList" component={CreateList} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
