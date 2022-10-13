import * as React from "react";
import { SvgProps } from "../types";

const Icon: React.FC<React.PropsWithChildren<SvgProps>> = (props) => {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_256_819)">
      <path d="M3.40753 6.952C3.40753 7.304 3.69553 7.592 4.04753 7.592H11.9915C12.2475 7.592 12.4875 7.44 12.5835 7.2C12.6795 6.96 12.6315 6.688 12.4475 6.504L10.3835 4.44C10.1355 4.192 9.72753 4.192 9.47953 4.44C9.23153 4.688 9.23153 5.096 9.47953 5.344L10.4555 6.32H4.05553C3.69553 6.312 3.40753 6.6 3.40753 6.952V6.952ZM12.6315 9.072C12.6315 8.72 12.3435 8.432 11.9915 8.432H4.04753C3.79153 8.432 3.55153 8.584 3.45553 8.824C3.35953 9.064 3.40753 9.336 3.59153 9.52L5.65553 11.584C5.78353 11.712 5.94353 11.768 6.11153 11.768C6.27953 11.768 6.43953 11.704 6.56753 11.584C6.81553 11.336 6.81553 10.928 6.56753 10.68L5.59153 9.704H11.9915C12.3435 9.712 12.6315 9.424 12.6315 9.072V9.072Z" fill="url(#paint0_linear_256_819)"/>
      <circle cx="8" cy="8" r="7.25" stroke="url(#paint1_linear_256_819)" strokeWidth="1.5"/>
      </g>
      <defs>
      <linearGradient id="paint0_linear_256_819" x1="11.8567" y1="11.768" x2="2.19751" y2="8.4399" gradientUnits="userSpaceOnUse">
      <stop stopColor="#FF6744"/>
      <stop offset="1" stopColor="#FFAE32"/>
      </linearGradient>
      <linearGradient id="paint1_linear_256_819" x1="13" y1="14" x2="3" y2="2" gradientUnits="userSpaceOnUse">
      <stop stopColor="#FF7042"/>
      <stop offset="1" stopColor="#FFA235"/>
      </linearGradient>
      <clipPath id="clip0_256_819">
        <rect width="16" height="16" fill="white"/>
      </clipPath>
      </defs>
    </svg>

  );
};

export default Icon;
