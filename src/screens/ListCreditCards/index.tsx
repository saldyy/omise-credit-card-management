import React, { useEffect } from "react";
import { FlatList, StyleSheet, View, Pressable } from "react-native";
import CreditCardItem from "../../components/CreditCardItem";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import Icon from "../../components/Icon";
import { COLOR } from "../../styles/themes";
import { useAppSelector } from "../../stores";
import { selectCreditCards } from "../../stores/reducer/CreditCards";
import EmptyListCreditCard from "./components/EmptyListCreditCard";

const ListCreditCards = () => {
  const navigation = useNavigation();
  const creditCards = useAppSelector(selectCreditCards);
  useEffect(() => {
    console.log(creditCards, "in here");
  }, [creditCards]);

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

  // if (isLoading) {
  //   return <ActivityIndicator />;
  // }

  if (creditCards.length === 0) {
    return <EmptyListCreditCard />;
  }

  return (
    <SafeAreaView style={{ backgroundColor: "#fff" }}>
      <FlatList
        data={creditCards}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatListContainer}
        renderItem={({ item }) => {
          return (
            <CreditCardItem
              cardName={item?.name || ""}
              cardNumber="000"
              expiration="02/26"
            />
          );
        }}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flatListContainer: {
    paddingHorizontal: 20,
    backgroundColor: "white",
  },
});

export default ListCreditCards;
