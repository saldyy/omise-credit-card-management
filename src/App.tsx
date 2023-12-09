import React from "react";
import { StyleSheet } from "react-native";
import { Provider } from "react-redux";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListCreditCards from "./screens/ListCreditCards";
import AddCard from "./screens/AddCard";
import { store } from "./stores";

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="ListCreditCards"
            component={ListCreditCards}
            options={{
              title: "Cards",
              headerTitleAlign: "center",
              headerShadowVisible: false,
            }}
          />
          <Stack.Screen name="AddCard" component={AddCard} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
  },
  highlight: {
    fontWeight: "700",
  },
});

export default App;
