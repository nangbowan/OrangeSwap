import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<React.PropsWithChildren<SvgProps>> = (props) => {
  return (
    <svg width="37" height="13" viewBox="0 0 37 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M32.2542 5.02793H0V7.26257H32.2542L28.7905 10.7263L30.3547 12.2905L36.5 6.14525L30.4665 0L28.9022 1.56425L32.2542 5.02793Z"
        fill="url(#paint0_linear_566_579)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_566_579"
          x1="33.4328"
          y1="12.2905"
          x2="8.20338"
          y2="-8.73814"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#FF6744" />
          <stop offset="1" stop-color="#FFAE32" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Icon;
