import { FC, ReactElement, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useAccount } from 'wagmi'
import { useTranslation } from '@pancakeswap/localization'
import { useToast, Button } from '@pancakeswap/uikit'
import { useGasPrice } from 'state/user/hooks'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { $shiftedBy } from 'utils/met'
import { copyText } from '@pancakeswap/utils/copyText'
import { BOOSTED_FARM_GAS_LIMIT } from 'config'
import { BIG_ZERO } from 'utils/bigNumber'
import { ToastDescriptionWithTx } from 'components/Toast'
import useCatchTxError from 'hooks/useCatchTxError'
import { useERC20, useTokenContract, useOrgbundrebate } from 'hooks/useContract'

import CardContent from './card'

const options = {
  gasLimit: BOOSTED_FARM_GAS_LIMIT,
}

const Farm: FC = (): ReactElement => {
  const { t } = useTranslation()
  const { address: account } = useAccount()
  const { chainId } = useActiveWeb3React()

  return (
    <Main>
      <Header>
        <HeaderCont>
          <Left>
            <Title>农场</Title>
            <Tip>质押LP代币以赚钱</Tip>
          </Left>
          <Img src="/images/farm/people.png" />
        </HeaderCont>
      </Header>
      <Cont>
        <OrangeImg className="_top_icon" src="/images/farm/orange.png" />
        <OrangeImg className="_bottom_icon" src="/images/farm/orange.png" />
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => (
          <CardContent />
        ))}
      </Cont>
    </Main>
  )
}
const Main = styled.div`
  width: 100%;
  background: #f8f8f8;
  position: relative;
  min-width: 1218px;
  @media (max-width: 768px) {
    min-width: 100%;
  }
`

const Header = styled.div`
  height: 272px;
  width: 100%;
  margin-bottom: 72px;
  background: linear-gradient(285.68deg, #fff7eb 6.56%, #fff7eb 6.57%, #fff1ed 98.03%);
  @media (max-width: 768px) {
    margin-bottom: 0px;
    height: 171px;
    padding-top: 31px;
    background: none;
  }
`
const HeaderCont = styled.div`
  width: 1218px;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  position: relative;
  @media (max-width: 768px) {
    width: 100%;
    display: block;
    padding: 0 18px;
  }
`
const Left = styled.div``
const Title = styled.div`
  font-family: 'FZLanTingHeiS-B-GB';
  font-style: normal;
  font-size: 72px;
  line-height: 82px;
  background: linear-gradient(120.51deg, #ff6a43 1.69%, #ffad34 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  @media (max-width: 768px) {
    width: 100%;
    padding-top: 10px;
    font-size: 32px;
    line-height: 45px;
  }
`
const Tip = styled.div`
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 400;
  font-size: 22px;
  line-height: 31px;
  background: linear-gradient(120.51deg, #ff6a43 1.69%, #ffad34 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-top: 24px;
  @media (max-width: 768px) {
    font-size: 14px;
    line-height: 20px;
    margin-top: 8px;
  }
`
const Img = styled.img`
  height: 264px;
  @media (max-width: 768px) {
    position: absolute;
    height: 185px;
    right: 0;
    top: 0;
  }
`

const Cont = styled.div`
  width: 1218px;
  height: auto;
  min-height: 600px;
  margin: 0 auto;
  position: relative;
  display: grid;
  /* grid-template-rows: repeat(3, 150px); // 行决定高
  grid-template-columns: repeat(auto-fill, 300px); //列决定宽 */

  /* grid-template-rows: repeat(3, 1fr); // 行决定高 */
  grid-template-columns: repeat(3, 1fr); //列决定宽

  /* column-gap: 50px; //列间距
  row-gap: 100px; // 行间距 */
  gap: 40px 106px; //简写 row column
  @media (max-width: 768px) {
    width: 100%;
    grid-template-columns: repeat(1, 1fr);
    gap: 25px 0;
    padding: 0 20px;
  }
`
const OrangeImg = styled.img`
  width: 231px;
  position: absolute;
  &._top_icon {
    top: 334px;
    left: -220px;
  }
  &._bottom_icon {
    bottom: 50px;
    right: -100px;
  }
  @media (max-width: 768px) {
    display: none;
  }
`
export default Farm
