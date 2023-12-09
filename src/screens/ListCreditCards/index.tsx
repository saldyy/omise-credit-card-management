import React, { useEffect } from "react";
import { FlatList, View, Pressable, StyleSheet } from "react-native";
import CreditCardItem from "../../components/CreditCardItem";
import { useNavigation } from "@react-navigation/native";
import Icon from "../../components/Icon";
import { COLOR } from "../../styles/themes";
import { useAppSelector } from "../../stores";
import { selectCreditCards } from "../../stores/reducer/CreditCards";
import EmptyListCreditCard from "./components/EmptyListCreditCard";
import Omise from "../../services/omise";
import Toast from "react-native-toast-message";

export const ListCreditCards = () => {
  const navigation = useNavigation();
  const creditCards = useAppSelector(selectCreditCards);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View>
          <Pressable
            onPress={() => {
              navigation.navigate("AddCard");
            }}>
            <Icon size={20} color={COLOR.PRIMARY} name={"plus"} />
          </Pressable>
        </View>
      ),
    });
  }, []);

  const chargeAmountFromCard = async (cardId: string) => {
    try {
      const amount = Math.round(Math.random() * 10000);
      const result = await Omise.charge({
        amount,
        currency: "thb",
        card: cardId,
      });
      console.log(result, "res");
      Toast.show({
        type: "success",
        text1: `Successfully charge ${amount} thb from your card.`,
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: `Something went wrong`,
      });
    }
  };

  if (creditCards.length === 0) {
    return <EmptyListCreditCard />;
  }

  return (
    <View style={{ backgroundColor: "#fff" }}>
      <FlatList
        data={creditCards}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatListContainer}
        renderItem={({ item }) => {
          return (
            <CreditCardItem
              onPress={async () => {
                chargeAmountFromCard(item.id);
              }}
              cardData={{
                cardName: item?.card?.name || "",
                last4Digit: item?.card?.last_digits || "",
                expiration:
                  item?.card?.expiration_month && item?.card?.expiration_year
                    ? `${item?.card?.expiration_month}/${item?.card?.expiration_year}`
                    : "",
              }}
            />
          );
        }}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flatListContainer: {
    paddingHorizontal: 20,
    backgroundColor: "white",
  },
});

export default ListCreditCards;
