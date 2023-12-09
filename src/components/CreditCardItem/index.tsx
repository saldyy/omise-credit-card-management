import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Icon from "../Icon";

type CreditCardItemProps = {
  cardNumber: string;
  expiration: string;
  cardName: string;
};

export const CreditCardItem = (props: CreditCardItemProps) => {
  const { cardName, cardNumber, expiration } = props;
  return (
    <View style={[styles.card, styles.elevation]}>
      <View style={[styles.cardItem, styles.marginBottom10]}>
        <Image source={require("../../assets/visa_h16_color.png")} />
      </View>
      <View style={styles.cardItem}>
        <Text>{"****"}</Text>
        <Text>{"****"}</Text>
        <Text>{"****"}</Text>
        <Text>{cardNumber}</Text>
      </View>
      <View style={styles.cardItem}>
        <Text>{"Name on Card"}</Text>
        <Text>{"Expires"}</Text>
      </View>
      <View style={styles.cardItem}>
        <Text style={styles.textBold}>{cardName}</Text>
        <Text style={styles.textBold}>{expiration}</Text>
      </View>
      <Icon name="plus" size={15} color="black" />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    paddingVertical: 45,
    paddingHorizontal: 25,
    width: "100%",
    marginVertical: 10,
  },
  elevation: {
    elevation: 20,
    shadowColor: "#000",
  },
  cardItem: {
    flexDirection: "row",
    width: "85%",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  textBold: {
    fontWeight: "bold",
  },
  marginBottom10: {
    marginBottom: 10,
  },
});

export default CreditCardItem;
