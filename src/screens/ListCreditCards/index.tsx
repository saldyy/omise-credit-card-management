import React from "react";
import { ActivityIndicator, FlatList, StyleSheet } from "react-native";
import { useGetListCreditCardsQuery } from "../../stores/apis/CreditCards";
import CreditCardItem from "../../components/CreditCardItem";
import { SafeAreaView } from "react-native-safe-area-context";

const ListCreditCards = () => {
  const { data, isLoading, isFetching } = useGetListCreditCardsQuery({
    limit: 10,
    offset: 0,
  });

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <SafeAreaView style={{ backgroundColor: "#fff" }}>
      <FlatList
        data={data?.results}
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
        keyExtractor={item => item.name}
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
