import { vars } from "@pancakeswap/ui/css/vars.css";
import React, { useEffect } from "react";
import styled from "styled-components";
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
import { ArrowForwardIcon, LogoWithTextIcon, ArrowForwardBuy, ArrowForwardBuyMobile } from "../Svg";
import { ThemeSwitcher } from "../ThemeSwitcher";
import { FooterProps } from "./types";

const MenuItem1212: React.FC<React.PropsWithChildren<FooterProps>> = ({
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
            <Box mr="50px" style={{ lineHeight: "40px", textAlign: "left" }}>
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
                padding: "0 12px",
                color: "rgba(255, 183, 74, 1)",
                background: "linear-gradient(285.68deg, #FF6744 6.56%, #FFAE32 98.03%)",
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
  // useEffect(() => {
  //   console.error('---', cakePriceUsd)
  // },[cakePriceUsd])
  return (
    <Main>
      <Content>
        <Top className="pc">
          <img className="logo" src="/images/base/logo_footer.png" alt="" />
          <Right>
            <LangSelector
              currentLang={currentLang}
              langs={langs}
              setLang={setLang}
              color="textSubtle"
              dropdownPosition="top-right"
            />
            <Boxs>
              <img src="/images/org_logo.svg" alt="" width="40px" />
              <p> {/* {cakePriceUsd } */}</p>
              {/* {cakePriceUsd && <p>{cakePriceUsd}</p>} */}

              {/* <CakePrice cakePriceUsd={cakePriceUsd} color="textSubtle" /> */}
            </Boxs>
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
          </Right>
        </Top>
        <Top className="mobile">
          <Line>
            <img className="logo" src="/images/base/logo_footer.png" alt="" />
            <Lang>
              <img src="/images/lange.svg" alt="" />
              <LangSelector
                currentLang={currentLang}
                langs={langs}
                setLang={setLang}
                color="textSubtle"
                dropdownPosition="top-right"
              />
            </Lang>
          </Line>
          <Line>
            <Boxs>
              <img src="/images/org_logo.svg" alt="" width="24px" />
              <p> </p>
              {/* {cakePriceUsd && <p>{cakePriceUsd}</p>} */}
            </Boxs>
            <Button
              data-theme="light"
              as="a"
              href="https://orangeswap.org/swap"
              target="_blank"
              scale="sm"
              className="buy_bake"
              endIcon={<ArrowForwardBuyMobile color="#fff" />}
            >
              <span style={{ marginRight: "4px" }}>{buyCakeLabel}</span>
            </Button>
          </Line>
        </Top>
        <Soild> </Soild>
        <Bottom>
          <HrefLink>
            <img src="/images/twier.svg" alt="" width="130px" />
            <img src="/images/telegram.svg" alt="" width="130px" />
            <span>(中文)</span>
            <img src="/images/telegram.svg" alt="" width="130px" />
            <span>(英文)</span>
          </HrefLink>
          <Theme>
            <ThemeSwitcher isDark={isDark} toggleTheme={toggleTheme} />
          </Theme>
        </Bottom>
      </Content>
    </Main>
  );
};

const Main = styled.div`
  width: 100%;
  background: linear-gradient(285.68deg, #ff5b36 6.56%, #ffb74a 98.03%);
  min-width: 1440px;
  @media (max-width: 768px) {
    min-width: 100%;
    /* overflow-x: hidden; */
  }
`;
const Content = styled.div`
  width: 1440px;
  margin: 0 auto;
  padding: 58px 0 154px;
  @media (max-width: 768px) {
    padding: 23px 15px 131px 20px;
    width: 100%;
  }
`;
const Top = styled.div`
  padding: 0 100px;
  display: flex;
  height: 82px;
  justify-content: space-between;
  align-items: center;
  .logo {
    height: 100%;
  }
  &.mobile {
    display: none;
  }
  @media (max-width: 768px) {
    padding: 0;
    height: auto;
    &.pc {
      display: none;
    }
    &.mobile {
      display: block;
    }
    .logo {
      height: 49px;
    }
  }
`;
const Line = styled.div`
  display: flex;
  height: 49px;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  &:first-child {
    margin-bottom: 16px;
  }
  .buy_bake {
    /* width: 134px; */
    display: inline-block;
    height: 28px;
    line-height: 28px;
    border-radius: 0px 16px;
    padding: 0 12px;
    color: rgba(255, 183, 74, 1);
    background-color: #ffffff !important;
    span {
      font-weight: 600;
      font-size: 14px;
    }
  }
`;
const Lang = styled.div`
  display: flex;
  height: 26px;
  padding: 0 13px;
  /* width: 100px; */
  background: #ffffff;
  border-radius: 13px;
  img {
    width: 17px;
    margin-right: 3px;
  }
  .lange_text {
    font-size: 14px !important;
    color: rgba(255, 174, 50, 1) !important;
  }
  .lange_btn {
    width: auto !important;
    height: 100% !important;
    padding: 0 !important;
  }
  & > div {
    & > div {
      left: -40px !important;
    }
  }
`;
const Soild = styled.div`
  height: 1px;
  width: 100%;
  margin: 40px 0;
  background: #e2e2e2;
  @media (max-width: 768px) {
    margin: 8px 0 22px;
  }
`;
const Right = styled.div`
  display: flex;
  .buy_bake {
    width: 170px;
    height: 40px;
    background: #ffffff;
    border-radius: 0;
    color: rgba(255, 183, 74, 1);
  }
`;

const Boxs = styled.div`
  margin: 0 50px;
  line-height: 40px;
  display: flex;
  p {
    line-height: 40px;
    display: inline-block;
    margin-left: 13px;
    color: #fff;
  }
  @media (max-width: 768px) {
    margin: 0;
  }
`;
const Bottom = styled.div`
  padding: 0 100px;
  display: flex;
  height: 40px;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 768px) {
    display: block;
    padding: 0;
    height: 20px;
    width: 100%;
  }
`;
const HrefLink = styled.div`
  line-height: 40px;
  display: block;
  span {
    margin-right: 64px;
    margin-left: 10px;
    font-family: "PingFang SC";
    font-size: 20px;
    color: #ffffff;
  }
  img {
    width: 32px;
    position: relative;
    top: 8px;
    &:first-child {
      margin-right: 64px;
    }
  }
  @media (max-width: 768px) {
    line-height: 20px;
    width: 100%;
    span {
      margin-right: 20px;
      margin-left: 4px;
      font-family: "PingFang SC";
      font-size: 14px;
    }
    img {
      width: 20px;
      position: relative;
      top: 4px;
      &:first-child {
        margin-right: 20px;
      }
    }
  }
`;

const Theme = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`;

export default MenuItem;
