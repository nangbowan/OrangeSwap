import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<React.PropsWithChildren<SvgProps>> = (props) => {
  return (
    <svg width="28" height="26" viewBox="0 0 36 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M31.8123 4.90909H0V7.09091H31.8123L28.3961 10.4727L29.9389 12L36 6L30.0491 0L28.5063 1.52727L31.8123 4.90909Z" fill="url(#paint0_linear_230_261)"/>
<defs>
<linearGradient id="paint0_linear_230_261" x1="32.9748" y1="12" x2="8.29797" y2="-8.77741" gradientUnits="userSpaceOnUse">
<stop stop-color="#FF5B36"/>
<stop offset="1" stop-color="#FFB74A"/>
</linearGradient>
</defs>
</svg>

  );
};

export default Icon;
