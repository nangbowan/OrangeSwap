import { useMemo } from 'react'
import styled from 'styled-components'
import { Text, Flex, CardBody, CardFooter, Button, AddIcon } from '@pancakeswap/uikit'
import Link from 'next/link'
import { useWeb3React } from '@pancakeswap/wagmi'
import { useTranslation } from '@pancakeswap/localization'
import { useLPTokensWithBalanceByAccount } from 'views/Swap/StableSwap/hooks/useStableConfig'
import FullPositionCard, { StableFullPositionCard } from '../../components/PositionCard'
import { useTokenBalancesWithLoadingIndicator } from '../../state/wallet/hooks'
import { usePairs, PairState } from '../../hooks/usePairs'
import { toV2LiquidityToken, useTrackedTokenPairs } from '../../state/user/hooks'
import Dots from '../../components/Loader/Dots'
import { AppHeader, AppBody } from '../../components/App'
import Page from '../Page'

const Body = styled(CardBody)`
  background-color: ${({ theme }) => theme.colors.dropdownDeep};
`

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
  bottom: -100px;
  left: 0px;
  width: 573px;
  height: 573px;
  display: ${() => ((window as any).screen.width <= 768 ? 'none' : 'block')};
`
const Icons = styled.img`
  position: absolute;
  top: -50px;
  left: calc(50% + 220px);
  transform: translateX(-50%);
  width: 170px;
  height: 170px;
  display: ${() => ((window as any).screen.width <= 768 ? 'none' : 'block')};
`

export default function Pool() {
  const { account } = useWeb3React()
  const { t } = useTranslation()

  // fetch the user's balances of all tracked V2 LP tokens
  const trackedTokenPairs = useTrackedTokenPairs()
  const tokenPairsWithLiquidityTokens = useMemo(
    () => trackedTokenPairs.map((tokens) => ({ liquidityToken: toV2LiquidityToken(tokens), tokens })),
    [trackedTokenPairs],
  )
  const liquidityTokens = useMemo(
    () => tokenPairsWithLiquidityTokens.map((tpwlt) => tpwlt.liquidityToken),
    [tokenPairsWithLiquidityTokens],
  )
  const [v2PairsBalances, fetchingV2PairBalances] = useTokenBalancesWithLoadingIndicator(
    account ?? undefined,
    liquidityTokens,
  )

  const stablePairs = useLPTokensWithBalanceByAccount(account)

  // fetch the reserves for all V2 pools in which the user has a balance
  const liquidityTokensWithBalances = useMemo(
    () =>
      tokenPairsWithLiquidityTokens.filter(({ liquidityToken }) =>
        v2PairsBalances[liquidityToken.address]?.greaterThan('0'),
      ),
    [tokenPairsWithLiquidityTokens, v2PairsBalances],
  )

  const v2Pairs = usePairs(liquidityTokensWithBalances.map(({ tokens }) => tokens))
  const v2IsLoading =
    fetchingV2PairBalances ||
    v2Pairs?.length < liquidityTokensWithBalances.length ||
    (v2Pairs?.length && v2Pairs.every(([pairState]) => pairState === PairState.LOADING))
  const allV2PairsWithLiquidity = v2Pairs
    ?.filter(([pairState, pair]) => pairState === PairState.EXISTS && Boolean(pair))
    .map(([, pair]) => pair)

  const renderBody = () => {
    if (!account) {
      return (
        <Text color="textSubtle" textAlign="center">
          {t('Connect to a wallet to view your liquidity.')}
        </Text>
      )
    }
    if (v2IsLoading) {
      return (
        <Text color="textSubtle" textAlign="center">
          <Dots>{t('Loading')}</Dots>
        </Text>
      )
    }

    let positionCards = []

    if (allV2PairsWithLiquidity?.length > 0) {
      positionCards = allV2PairsWithLiquidity.map((v2Pair, index) => (
        <FullPositionCard
          key={v2Pair.liquidityToken.address}
          pair={v2Pair}
          mb={Boolean(stablePairs?.length) || index < allV2PairsWithLiquidity.length - 1 ? '16px' : 0}
        />
      ))
    }

    if (stablePairs?.length > 0) {
      positionCards = [
        ...positionCards,
        ...stablePairs?.map((stablePair, index) => (
          <StableFullPositionCard
            key={stablePair.liquidityToken.address}
            pair={stablePair}
            mb={index < stablePairs.length - 1 ? '16px' : 0}
          />
        )),
      ]
    }

    if (positionCards?.length > 0) {
      return positionCards
    }

    return (
      <Text color="textSubtle" textAlign="center">
        {t('No liquidity found.')}
      </Text>
    )
  }

  return (
    <Page style={{ position: 'relative' }}>
      <AppBody>
        <AppHeader title={t('LiquidityFund')} subtitle={t('Add liquidity to claim LP tokens')} />
        <CardFooter style={{ textAlign: 'center' }}>
          <Link href="/add" passHref>
            <Button id="join-pool-button" width="100%" startIcon={<AddIcon color="white" />}>
              {t('Add Liquidity')}
            </Button>
          </Link>
        </CardFooter>
      </AppBody>

      <AppBody>
        <h2 style={{ fontSize: '20px', margin: '20px' }}>{t('Your Liquidity')}</h2>
        <Body>
          {renderBody()}
          {account && !v2IsLoading}
        </Body>
        <CardFooter>
          <Flex alignItems="center" mt="20px">
            <Text color="textSubtle" mb="3px">
              {t("Don't see a pool you joined?")}
            </Text>
            <Link href="/find" passHref>
              <Button id="import-pool-link" scale="sm" as="a">
                {t('Import')}
              </Button>
            </Link>
          </Flex>

          <Text color="textSubtle" mt="20px" mb="8px">
            {t('Alternatively, if you pledged your LP token at the farm, redeem it to have the token displayed here')}
          </Text>
        </CardFooter>
      </AppBody>
      <Icon src="/images/pool/bottom.png" />
      <IconYz src="/images/pool/yz.png" />
      <Icons src="/images/pool/icon.png" />
    </Page>
  )
}
