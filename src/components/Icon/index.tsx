import React from "react";
import { IconName, IconProps } from "./Icon.type";

import PlusIcon from "./Svgs/PlusIcon";

export const Icons: Record<IconName, (props: IconProps) => JSX.Element> = {
  plus: PlusIcon,
};

export default (props: IconProps) => {
  const SvgIcon = Icons[props.name];
  return <SvgIcon {...props} />;
};
