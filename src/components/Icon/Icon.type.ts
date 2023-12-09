import { SvgProps } from "react-native-svg";
import { StyleProp, ViewStyle } from "react-native";

export interface IconProps extends SvgProps {
  size?: number;
  name: IconName;
  width?: number;
  height?: number;
  xmlns?: string;
  style?: StyleProp<ViewStyle>;
}

export type IconName = "plus";
