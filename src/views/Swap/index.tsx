import { useEffect, useMemo, useState } from 'react'
import { ChainId, Currency } from '@pancakeswap/sdk'
import { Box, Flex, BottomDrawer, useMatchBreakpoints } from '@pancakeswap/uikit'
import Footer from 'components/Menu/Footer'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { EXCHANGE_DOCS_URLS } from 'config/constants'
import { useDefaultsFromURLSearch } from 'state/limitOrders/hooks'
import { AppBody } from 'components/App'
import styled from 'styled-components'

import { useCurrency } from '../../hooks/Tokens'
import { Field } from '../../state/swap/actions'
import { useSwapState, useSingleTokenSwapInfo } from '../../state/swap/hooks'
import { useExchangeChartManager } from '../../state/user/hooks'
import Page from '../Page'
import PriceChartContainer from './components/Chart/PriceChartContainer'

import SwapForm from './components/SwapForm'
import ChangeIng from '../Rebate/changeIng'
import StableSwapFormContainer from './StableSwap'
import { StyledInputCurrencyWrapper, StyledSwapContainer } from './styles'
import SwapTab, { SwapType } from './components/SwapTab'

const CHART_SUPPORT_CHAIN_IDS = [ChainId.BSC]
export const ACCESS_TOKEN_SUPPORT_CHAIN_IDS = [ChainId.BSC]

const STABLE_SUPPORT_CHAIN_IDS = [ChainId.BSC_TESTNET]

const Icon = styled.img`
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 211px;
  height: 211px;
  display: ${() => ((window as any).screen.width <= 768 ? 'block' : 'none')};
`
const IconYz = styled.img`
  position: absolute;
  bottom: 400px;
  left: 0px;
  width: 573px;
  height: 573px;
  /* display: none; */
  z-index: 0;
  display: ${() => ((window as any).screen.width <= 768 ? 'none' : 'block')};
`
const Icons = styled.img`
  position: absolute;
  top: -50px;
  left: calc(50% + 160px);
  transform: translateX(-50%);
  width: 170px;
  height: 170px;
  display: ${() => ((window as any).screen.width <= 768 ? 'none' : 'block')};
`
export default function Swap() {
  const { isMobile } = useMatchBreakpoints()
  const [isChartExpanded, setIsChartExpanded] = useState(false)
  const [userChartPreference, setUserChartPreference] = useExchangeChartManager(isMobile)
  const [isChartDisplayed, setIsChartDisplayed] = useState(userChartPreference)

  useDefaultsFromURLSearch()

  useEffect(() => {
    setUserChartPreference(isChartDisplayed)
  }, [isChartDisplayed, setUserChartPreference])

  const { chainId } = useActiveWeb3React()

  // swap state & price data
  const {
    [Field.INPUT]: { currencyId: inputCurrencyId },
    [Field.OUTPUT]: { currencyId: outputCurrencyId },
  } = useSwapState()
  const inputCurrency = useCurrency(inputCurrencyId)
  const outputCurrency = useCurrency(outputCurrencyId)

  const currencies: { [field in Field]?: Currency } = {
    [Field.INPUT]: inputCurrency ?? undefined,
    [Field.OUTPUT]: outputCurrency ?? undefined,
  }

  const singleTokenPrice = useSingleTokenSwapInfo(inputCurrencyId, inputCurrency, outputCurrencyId, outputCurrency)

  const isChartSupported = useMemo(
    () =>
      // avoid layout shift, by default showing
      !chainId || CHART_SUPPORT_CHAIN_IDS.includes(chainId),
    [chainId],
  )

  const isStableSupported = useMemo(() => !chainId || STABLE_SUPPORT_CHAIN_IDS.includes(chainId), [chainId])

  const isAccessTokenSupported = useMemo(() => ACCESS_TOKEN_SUPPORT_CHAIN_IDS.includes(chainId), [chainId])

  return (
    <Page removePadding={isChartExpanded} hideFooterOnDesktop={isChartExpanded} style={{ position: 'relative' }}>
      <Flex width="100%" justifyContent="center" position="relative">
        {!isMobile && isChartSupported && (
          <PriceChartContainer
            inputCurrencyId={inputCurrencyId}
            inputCurrency={currencies[Field.INPUT]}
            outputCurrencyId={outputCurrencyId}
            outputCurrency={currencies[Field.OUTPUT]}
            isChartExpanded={isChartExpanded}
            setIsChartExpanded={setIsChartExpanded}
            isChartDisplayed={isChartDisplayed}
            currentSwapPrice={singleTokenPrice}
          />
        )}
        {isChartSupported && (
          <BottomDrawer
            content={
              <PriceChartContainer
                inputCurrencyId={inputCurrencyId}
                inputCurrency={currencies[Field.INPUT]}
                outputCurrencyId={outputCurrencyId}
                outputCurrency={currencies[Field.OUTPUT]}
                isChartExpanded={isChartExpanded}
                setIsChartExpanded={setIsChartExpanded}
                isChartDisplayed={isChartDisplayed}
                currentSwapPrice={singleTokenPrice}
                isMobile
              />
            }
            isOpen={isChartDisplayed}
            setIsOpen={setIsChartDisplayed}
          />
        )}
        <Flex flexDirection="column">
          <StyledSwapContainer $isChartExpanded={isChartExpanded}>
            <StyledInputCurrencyWrapper mt={isChartExpanded ? '24px' : '0'}>
              <AppBody>
                <SwapTab showStable={isStableSupported}>
                  {(swapTypeState) =>
                    swapTypeState === SwapType.STABLE_SWAP ? (
                      <StableSwapFormContainer
                        setIsChartDisplayed={setIsChartDisplayed}
                        isChartDisplayed={isChartDisplayed}
                      />
                    ) : (
                      <SwapForm
                        isAccessTokenSupported={isAccessTokenSupported}
                        setIsChartDisplayed={setIsChartDisplayed}
                        isChartDisplayed={isChartDisplayed}
                      />
                    )
                  }
                </SwapTab>
              </AppBody>
            </StyledInputCurrencyWrapper>
          </StyledSwapContainer>
          {isChartExpanded && (
            <Box display={['none', null, null, 'block']} width="100%" height="100%">
              <Footer variant="side" helpUrl={EXCHANGE_DOCS_URLS} />
            </Box>
          )}
        </Flex>
      </Flex>
      <ChangeIng />
      <Icon src="/images/pool/bottom.png" />
      <IconYz src="/images/pool/yz.png" />
      <Icons src="/images/pool/icon.png" />
      
    </Page>
  )
}
