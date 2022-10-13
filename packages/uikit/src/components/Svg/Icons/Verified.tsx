import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<React.PropsWithChildren<SvgProps>> = (props) => {
  return (
    <Svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.5 0L9.3541 1.79366L11.9084 1.43237L12.3541 3.97329L14.6329 5.18237L13.5 7.5L14.6329 9.81763L12.3541 11.0267L11.9084 13.5676L9.3541 13.2063L7.5 15L5.6459 13.2063L3.09161 13.5676L2.6459 11.0267L0.367076 9.81763L1.5 7.5L0.367076 5.18237L2.6459 3.97329L3.09161 1.43237L5.6459 1.79366L7.5 0Z" fill="url(#paint0_linear_107_179)"/>
      <path d="M10.8448 5.14754C10.6379 4.95082 10.2931 4.95082 10.0862 5.14754L6.2931 8.81967L4.91379 7.5082C4.7069 7.31148 4.36207 7.31148 4.15517 7.5082C3.94828 7.70492 3.94828 8.03279 4.15517 8.22951L5.87931 9.86885C6.01724 10 6.15517 10 6.2931 10C6.43103 10 6.56897 9.93443 6.7069 9.86885L10.8448 5.93443C11.0517 5.67213 11.0517 5.34426 10.8448 5.14754Z" fill="white"/>
      <defs>
      <linearGradient id="paint0_linear_107_179" x1="7.50446e-08" y1="0.681818" x2="17.3965" y2="10.9333" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FF6A43"/>
      <stop offset="1" stopColor="#FFAD34"/>
      </linearGradient>
      </defs>
    </Svg>
  );
};

export default Icon;
