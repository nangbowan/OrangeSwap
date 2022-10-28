import throttle from "lodash/throttle";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import BottomNav from "../../components/BottomNav";
import { Box } from "../../components/Box";
import Flex from "../../components/Box/Flex";
import Footer from "../../components/Footer";
import MenuItems from "../../components/MenuItems/MenuItems";
import { SubMenuItems } from "../../components/SubMenuItems";
import { useMatchBreakpoints } from "../../contexts";
import CakePrice from "../../components/CakePrice/CakePrice";
import Logo from "./components/Logo";
import { MENU_HEIGHT, MOBILE_MENU_HEIGHT, TOP_BANNER_HEIGHT, TOP_BANNER_HEIGHT_MOBILE } from "./config";
import { NavProps } from "./types";
import LangSelector from "../../components/LangSelector/LangSelector";
import { MenuContext } from "./context";

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: ${MENU_HEIGHT}px;
  background-color: ${({ theme }) => theme.nav.background};
  border-bottom: 1px solid ${({ theme }) => theme.colors.cardBorder};
  transform: translate3d(0, 0, 0);

  padding-left: 16px;
  padding-right: 16px;
`;

const FixedContainer = styled.div<{ showMenu: boolean; height: number }>`
  position: fixed;
  top: ${({ showMenu, height }) => (showMenu ? 0 : `-${height}px`)};
  left: 0;
  transition: top 0.2s;
  height: ${({ height }) => `${height}px`};
  width: 100%;
  z-index: 20;
`;

const TopBannerContainer = styled.div<{ height: number }>`
  height: ${({ height }) => `${height}px`};
  min-height: ${({ height }) => `${height}px`};
  max-height: ${({ height }) => `${height}px`};
  width: 100%;
`;

const BodyWrapper = styled(Box)`
  position: relative;
  display: flex;
`;

const Inner = styled.div<{ isPushed: boolean; showMenu: boolean }>`
  flex-grow: 1;
  transition: margin-top 0.2s, margin-left 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translate3d(0, 0, 0);
  max-width: 100%;
`;

const Menu: React.FC<React.PropsWithChildren<NavProps>> = ({
  linkComponent = "a",
  banner,
  rightSide,
  isDark,
  toggleTheme,
  currentLang,
  setLang,
  cakePriceUsd,
  links,
  subLinks,
  footerLinks,
  activeItem,
  activeSubItem,
  langs,
  buyCakeLabel,
  children,
}) => {
  const router = useRouter();
  const { isMobile, isMd } = useMatchBreakpoints();
  const [showMenu, setShowMenu] = useState(true);
  const refPrevOffset = useRef(typeof window === "undefined" ? 0 : window.pageYOffset);

  const topBannerHeight = isMobile ? TOP_BANNER_HEIGHT_MOBILE : TOP_BANNER_HEIGHT;

  const totalTopMenuHeight = banner ? MENU_HEIGHT + topBannerHeight : MENU_HEIGHT;
  const isHeader = true;

  useEffect(() => {
    const handleScroll = () => {
      const currentOffset = window.pageYOffset;
      const isBottomOfPage = window.document.body.clientHeight === currentOffset + window.innerHeight;
      const isTopOfPage = currentOffset === 0;
      // Always show the menu when user reach the top
      if (isTopOfPage) {
        setShowMenu(true);
      }
      // Avoid triggering anything at the bottom because of layout shift
      else if (!isBottomOfPage) {
        if (currentOffset < refPrevOffset.current || currentOffset <= totalTopMenuHeight) {
          // Has scroll up
          setShowMenu(true);
        } else {
          // Has scroll down
          setShowMenu(false);
        }
      }
      refPrevOffset.current = currentOffset;
    };
    const throttledHandleScroll = throttle(handleScroll, 200);

    window.addEventListener("scroll", throttledHandleScroll);
    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
    };
  }, [totalTopMenuHeight]);

  // Find the home link if provided
  const homeLink = links.find((link) => link.label === "Home");

  const subLinksWithoutMobile = subLinks?.filter((subLink) => !subLink.isMobileOnly);
  const subLinksMobileOnly = subLinks?.filter((subLink) => subLink.isMobileOnly);

  return (
    <MenuContext.Provider value={{ linkComponent }}>
      <Wrapper>
        <FixedContainer id="_nav_top_dom" showMenu={showMenu} height={totalTopMenuHeight}>
          {banner && <TopBannerContainer height={topBannerHeight}>{banner}</TopBannerContainer>}
          <StyledNav>
            <Flex>
              <Logo isDark={isDark} href={homeLink?.href ?? "/"} />
              {!isMobile && <MenuItems items={links} activeItem={activeItem} activeSubItem={activeSubItem} ml="24px" />}
            </Flex>
            <Flex alignItems="center" height="100%">
              {!isMobile && !isMd && (
                <Box mr="12px">
                  <CakePrice showSkeleton={false} cakePriceUsd={cakePriceUsd} />
                </Box>
              )}
              <Box mt="4px">
                <LangSelector
                  currentLang={currentLang}
                  langs={langs}
                  isHeader={isHeader}
                  setLang={setLang}
                  buttonScale="xs"
                  color="textSubtle"
                  hideLanguage
                />
              </Box>
              {rightSide}
            </Flex>
          </StyledNav>
        </FixedContainer>
        {subLinks && (
          <Flex justifyContent="space-around">
            {/* <SubMenuItems items={subLinksWithoutMobile} mt={`${totalTopMenuHeight + 1}px`} activeItem={activeSubItem} /> */}
            {subLinksWithoutMobile.length > 0 && (
              <TabView>
                <div>
                  {subLinksWithoutMobile.map((item) => (
                    <TabLibs
                      key={item.href}
                      className={activeSubItem === item.href && "active"}
                      onClick={() => router.push(item.href)}
                    >
                      {item.label}
                    </TabLibs>
                  ))}
                </div>
              </TabView>
            )}

            {subLinksMobileOnly?.length > 0 && (
              <SubMenuItems
                items={subLinksMobileOnly}
                mt={`${totalTopMenuHeight + 1}px`}
                activeItem={activeSubItem}
                isMobileOnly
              />
            )}
          </Flex>
        )}
        <BodyWrapper mt={!subLinks ? `${totalTopMenuHeight + 1}px` : "0"}>
          <Inner isPushed={false} showMenu={showMenu}>
            {children}
            <Footer
              items={footerLinks}
              isDark={isDark}
              toggleTheme={toggleTheme}
              langs={langs}
              setLang={setLang}
              currentLang={currentLang}
              cakePriceUsd={cakePriceUsd}
              buyCakeLabel={buyCakeLabel}
              mb={[`${MOBILE_MENU_HEIGHT}px`, null, "0px"]}
            />
          </Inner>
        </BodyWrapper>
        {isMobile && <BottomNav items={links} activeItem={activeItem} activeSubItem={activeSubItem} />}
      </Wrapper>
    </MenuContext.Provider>
  );
};

const TabView = styled.div`
  width: 100%;
  margin-top: 56px;
  height: 44px;
  display: flex;
  justify-content: center;
  overflow: hidden;
  padding: 14px 0 14px;
  box-sizing: content-box;
  background: ${({ theme }) => {
    return theme.isDark ? "rgba(39,38,44,0.7);" :  "#f5f5f5"
  }};
  /* background: var(--colors-gradientInverseBubblegum); */
  /* background-color: #f5f5f5; */
  /* box-shadow: inset 0px -2px 0px -8px rgb(133 133 133 / 10%); */
  /* overflow-x: scroll; */
  & > div {
    display: inline-block;
    margin: 0 auto;
    height: 44px;
    line-height: 44px;
    background: #ffb44c;
    border-radius: 28.5px;
  }
`;
const TabLibs = styled.div`
  display: inline-block;
  width: 120px;
  height: 100%;
  font-weight: 600;
  font-size: 18px;
  text-align: center;
  color: #ffffff;
  transition: all 0.2s;
  cursor: pointer;
  border-radius: 28.5px;
  &.active {
    background: linear-gradient(285.68deg, #ff6744 6.56%, #ffae32 98.03%);
  }
`;
export default Menu;
