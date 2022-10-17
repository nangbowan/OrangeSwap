import { vars } from "@pancakeswap/ui/css/vars.css";
import React from "react";
import { Box, Flex } from "../Box";
import { Link } from "../Link";
import {
  StyledFooter,
  StyledIconMobileContainer,
  StyledList,
  StyledListItem,
  StyledSocialLinks,
  StyledText,
  StyledToolsContainer,
} from "./styles";

import { Button } from "../Button";
import CakePrice from "../CakePrice/CakePrice";
import LangSelector from "../LangSelector/LangSelector";
import { ArrowForwardIcon, LogoWithTextIcon, ArrowForwardBuy } from "../Svg";
import { ThemeSwitcher } from "../ThemeSwitcher";
import { FooterProps } from "./types";
import { flex } from "styled-system";

const MenuItem: React.FC<React.PropsWithChildren<FooterProps>> = ({
  items,
  isDark,
  toggleTheme,
  currentLang,
  langs,
  setLang,
  cakePriceUsd,
  buyCakeLabel,
  ...props
}) => {
  return (
    <StyledFooter data-theme="dark" p={["40px 16px", null, "56px 40px 32px 40px"]} {...props} justifyContent="center">
      <Flex flexDirection="column" width={["100%", null, "1200px;"]}>
        <StyledIconMobileContainer display={["block", null, "none"]}>
          {/* <LogoWithTextIcon isDark width="130px" /> */}
          <Flex order={[1, null, 2]} mb={["16px", null, "0"]} justifyContent="space-between" alignItems="center">
            <img src="/images/base/logo_footer.png" alt="" width="130px" />
            <LangSelector
              currentLang={currentLang}
              langs={langs}
              setLang={setLang}
              color="textSubtle"
              dropdownPosition="top-right"
            />
          </Flex>

          <Flex order={[1, null, 2]} mb={["16px", null, "0"]} justifyContent="space-between" alignItems="center">
            <Box
              mr="50px"
              style={{ lineHeight: "40px", textAlign: 'left'}}
            >
              <img src="/images/org_logo.svg" alt="" width="40px" />
              <p style={{ lineHeight: "40px", display: "inline-block", marginLeft: "13px", color: "#fff" }}>
                {cakePriceUsd}
              </p>
              {/* <CakePrice cakePriceUsd={cakePriceUsd} color="textSubtle" /> */}
            </Box>
            <Button
              data-theme="light"
              as="a"
              href="https://orangeswap.org/swap"
              target="_blank"
              scale="sm"
              style={{
                width: "auto",
                height: "40px",
                borderRadius: "0px 16px",
                padding: '0 12px',
                color: "rgba(255, 183, 74, 1)",
                background: "linear-gradient(285.68deg, #FF6744 6.56%, #FFAE32 98.03%)"
              }}
              // endIcon={<ArrowForwardIcon color="backgroundAlt" />}
              endIcon={<ArrowForwardBuy color="backgroundAlt" />}
            >
              <span style={{ marginRight: "10px" }}>{buyCakeLabel}</span>
            </Button>
          </Flex>
        </StyledIconMobileContainer>
        <Flex
          order={[2, null, 1]}
          flexDirection={["column", null, "row"]}
          justifyContent="space-between"
          alignItems="flex-start"
          mb={["42px", null, "36px"]}
        >
          {items?.map((item) => (
            <StyledList key={item.label}>
              <StyledListItem>{item.label}</StyledListItem>
              {item.items?.map(({ label, href, isHighlighted = false }) => (
                <StyledListItem key={label}>
                  {href ? (
                    <Link
                      data-theme="dark"
                      href={href}
                      target="_blank"
                      rel="noreferrer noopener"
                      color={isHighlighted ? vars.colors.warning : "text"}
                      bold={false}
                    >
                      {label}
                    </Link>
                  ) : (
                    <StyledText>{label}</StyledText>
                  )}
                </StyledListItem>
              ))}
            </StyledList>
          ))}
          <Box display={["none", null, "block"]}>
            {/* <LogoWithTextIcon isDark width="160px" /> */}
            <img src="/images/base/logo_footer.png" alt="" width="160px" />
          </Box>

          <Flex order={[1, null, 2]} mb={["24px", null, "0"]} justifyContent="space-between" alignItems="center">
            <LangSelector
              currentLang={currentLang}
              langs={langs}
              setLang={setLang}
              color="textSubtle"
              dropdownPosition="top-right"
            />
            <Box
              mr="50px"
              ml="50px"
              style={{ lineHeight: "40px", display: "flex", top: "50%", transform: "transform: translateY(-50%)" }}
            >
              <img src="/images/org_logo.svg" alt="" width="40px" />
              <p style={{ lineHeight: "40px", display: "inline-block", marginLeft: "13px", color: "#fff" }}>
                {cakePriceUsd}
              </p>

              {/* <CakePrice cakePriceUsd={cakePriceUsd} color="textSubtle" /> */}
            </Box>
            <Button
              data-theme="light"
              as="a"
              href="https://orangeswap.org/swap"
              target="_blank"
              scale="sm"
              style={{
                width: "170px",
                height: "40px",
                background: "#FFFFFF",
                borderRadius: 0,
                color: "rgba(255, 183, 74, 1)",
              }}
              // endIcon={<ArrowForwardIcon color="backgroundAlt" />}
              endIcon={<ArrowForwardBuy color="backgroundAlt" />}
            >
              <span style={{ marginRight: "10px" }}>{buyCakeLabel}</span>
            </Button>
          </Flex>
        </Flex>

        <StyledSocialLinks order={[2]} pb={["42px", null, "32px"]} mb={["0", null, "32px"]} />
        <StyledToolsContainer
          data-theme="dark"
          order={[1, null, 3]}
          flexDirection={["column", null, "row"]}
          justifyContent="space-between"
        >
          <Flex order={[2, null, 1]} alignItems="center">
            {/* <ThemeSwitcher isDark={isDark} toggleTheme={toggleTheme} />
            <LangSelector
              currentLang={currentLang}
              langs={langs}
              setLang={setLang}
              color="textSubtle"
              dropdownPosition="top-right"
            /> */}
          </Flex>
          <Flex order={[1, null, 2]} mb={["24px", null, "0"]} justifyContent="space-between" alignItems="center">
            <ThemeSwitcher isDark={isDark} toggleTheme={toggleTheme} />
            {/* <Box mr="20px">
              <CakePrice cakePriceUsd={cakePriceUsd} color="textSubtle" />
            </Box>
            <Button
              data-theme="light"
              as="a"
              href="https://orangeswap.org/swap"
              target="_blank"
              scale="sm"
              endIcon={<ArrowForwardIcon color="backgroundAlt" />}
            >
              {buyCakeLabel}
            </Button> */}
          </Flex>
        </StyledToolsContainer>
      </Flex>
    </StyledFooter>
  );
};

export default MenuItem;
