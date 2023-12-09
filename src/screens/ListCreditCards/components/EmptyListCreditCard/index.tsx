import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { COLOR } from "../../../../styles/themes";
import { useNavigation } from "@react-navigation/native";

export default () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image source={require("../../../../assets/credit_card.png")} />
      <Text style={[styles.titleText, styles.mv10]}>{"No cards found"}</Text>
      <Text style={styles.titleText}>
        {"We recommend adding a card\nfor easy payment"}
      </Text>
      <Pressable
        style={styles.mt10}
        onPress={() => {
          navigation.navigate("AddCard");
        }}>
        <Text style={[styles.titleText, styles.link]}>{"Add New Card"}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  mv10: {
    marginVertical: 10,
  },
  mt10: {
    marginTop: 10,
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 18,
    color: COLOR.TEXT_PRIMARY,
    textAlign: "center",
  },
  link: {
    color: COLOR.PRIMARY,
  },
});
