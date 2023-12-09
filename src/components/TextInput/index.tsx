import React, { ReactNode } from "react";
import {
  StyleSheet,
  StyleSheetProperties,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import { COLOR } from "../../styles/themes";

type CustomTextInputProps = {
  containerStyle?: StyleSheetProperties;
  rightIcon?: ReactNode;
};

export default (props: TextInputProps & CustomTextInputProps) => {
  return (
    <View style={styles.container}>
      <TextInput style={{ flex: 1 }} {...props} />
      {props.rightIcon && <>{props.rightIcon}</>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: COLOR.TEXT_SECONDARY,
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 5,
  },
});
