import React from "react";
import Svg, { Path } from "react-native-svg";
import { IconProps } from "../Icon.type";

const PlusIcon = (props: Omit<IconProps, "name">) => {
  const { size, color } = props;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 2C12.5523 2 13 2.44772 13 3V21C13 21.5523 12.5523 22 12 22C11.4477 22 11 21.5523 11 21V3C11 2.44772 11.4477 2 12 2Z"
        fill={color}
      />
      <Path
        d="M2 12C2 11.4477 2.44772 11 3 11H21C21.5523 11 22 11.4477 22 12C22 12.5523 21.5523 13 21 13H3C2.44772 13 2 12.5523 2 12Z"
        fill={color}
      />
    </Svg>
  );
};

export default PlusIcon;
