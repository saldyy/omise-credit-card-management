import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import Omise from "../../services/omise";
import { COLOR } from "../../styles/themes";
import TextInput from "../../components/TextInput";
import LoadingButton from "../../components/LoadingButton";
import { useAppDispatch } from "../../stores";
import { addCreditCard } from "../../stores/reducer/CreditCards";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";

export const AddCard = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const [cardNumber, setCardNumber] = useState("4242 4242 4242 4242");
  const [cardName, setCardName] = useState("Bruce Wayne");
  const [expiryDate, setExpiryDate] = useState("42/42");
  const [cvc, setCVC] = useState("424");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onChangeCardNumber = (number: string) => {
    setCardNumber(
      number
        .replace(/\s?/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim(),
    );
  };

  const onChangeExpiryDate = (expiryDate: string) => {
    setExpiryDate(
      expiryDate
        .replace(/\/?/g, "")
        .replace(/(\d{2})/g, "$1/")
        .replace(/\/$/, ""),
    );
  };

  const addCard = async () => {
    try {
      setIsSubmitting(true);
      const result = await Omise.createToken({
        card: {
          name: cardName,
          number: cardNumber.replace(/\s/g, ""),
          expiration_month: expiryDate.split("/")[0],
          expiration_year: `20${expiryDate.split("/")[1]}`,
          security_code: cvc,
        },
      });
      dispatch(addCreditCard({ data: result }));
      navigation.navigate("ListCreditCards");
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Something went wrong",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={[styles.container, StyleSheet.absoluteFill]}>
      <View>
        <View style={styles.cardInputField}>
          <Text style={styles.title}>{"ATM/Debit/Credit card number"}</Text>
          <TextInput
            onChangeText={onChangeCardNumber}
            value={cardNumber}
            placeholder="**** **** **** ****"
            placeholderTextColor={COLOR.TEXT_SECONDARY}
            keyboardType="numeric"
            maxLength={19}
            rightIcon={
              <View style={styles.cardIconContainer}>
                <Image
                  source={require("../../assets/card_visa_icon.png")}
                  style={styles.cardIcon}
                />
                <Image
                  source={require("../../assets/card_master_mastercard_icon.png")}
                  style={styles.cardIcon}
                />
                <Image
                  source={require("../../assets/card_jcb_payment_icon.png")}
                  style={styles.cardIcon}
                />
              </View>
            }
          />
        </View>
        <View style={styles.cardInputField}>
          <Text style={styles.title}>{"Name on Card"}</Text>
          <TextInput
            onChangeText={setCardName}
            value={cardName}
            placeholder="John Doe"
            placeholderTextColor={COLOR.TEXT_SECONDARY}
          />
        </View>
        <View
          style={[
            styles.cardInputField,
            { width: "100%", flexDirection: "row" },
          ]}>
          <View style={{ flex: 1, marginRight: 5 }}>
            <Text style={styles.title}>{"Expiry Date"}</Text>
            <TextInput
              onChangeText={onChangeExpiryDate}
              value={expiryDate}
              maxLength={5}
              keyboardType="numeric"
              placeholder="MM/YY"
              placeholderTextColor={COLOR.TEXT_SECONDARY}
            />
          </View>
          <View style={{ flex: 1, marginLeft: 5 }}>
            <Text style={styles.title}>{"CVV"}</Text>
            <TextInput
              onChangeText={setCVC}
              value={cvc}
              maxLength={3}
              keyboardType="numeric"
              placeholder="CVC"
              placeholderTextColor={COLOR.TEXT_SECONDARY}
            />
          </View>
        </View>
      </View>
      <View style={styles.submitButtonContainer}>
        <LoadingButton
          isLoading={isSubmitting}
          onPress={addCard}
          title="Submit"
          style={{ borderRadius: 50 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  submitButtonContainer: {
    marginBottom: 20,
    borderRadius: 50,
  },
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    justifyContent: "space-between",
  },
  cardInputField: { marginVertical: 10 },
  cardIconContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardIcon: {
    height: 35,
    width: 35,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 10,
  },
  column: {},
});

export default AddCard;
