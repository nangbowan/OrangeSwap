import { FC, ReactElement, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useAccount } from 'wagmi'
import { useToast, Button } from '@pancakeswap/uikit'
import { useGasPrice } from 'state/user/hooks'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useTranslation } from '@pancakeswap/localization'
import { $shiftedBy } from 'utils/met'
import { BOOSTED_FARM_GAS_LIMIT } from 'config'
import { ToastDescriptionWithTx } from 'components/Toast'
import useCatchTxError from 'hooks/useCatchTxError'

import { useOrgbundrebate } from 'hooks/useContract'

const options = {
  gasLimit: BOOSTED_FARM_GAS_LIMIT,
}

const CardContent: FC = (): ReactElement => {
  const { address: account } = useAccount()
  const { chainId } = useActiveWeb3React()
  const [loadding, setLoadding] = useState<boolean>(true)

  return (
    <Main>
      <Header>
        <Symbol>
          <BaseSymbolImg src="/images/token_symbol/WFON.png" />
          <SymbolImg src="/images/token_symbol/ORG.png" />
        </Symbol>
        <HeaderCont>
          <SymbolName>ORG-USDT</SymbolName>
          <SymbolInfo>
            <Audit>
              <Star src="/images/farm/star.svg" /> 核心
            </Audit>
            <Multiple>40X</Multiple>
          </SymbolInfo>
        </HeaderCont>
      </Header>
      <Content>
        <Line>
          <Label>年化利率:</Label>
          <Right>95.64% <CalculateIcon src="/images/token_symbol/ORG.png" /></Right>
        </Line>
        <Line>
          <Label>赚取:</Label>
          
          <Right className='bold'>95.64% </Right>
        </Line>
        <Section>
          <Lib>
            <Left>
              <Title>ORG已赚取</Title>
              <Number>0.00001</Number>
            </Left>
            <BtnBlock>
              <Nodes>
                <Button className='_btns' isLoading={!loadding}>收割</Button>
              </Nodes>
            </BtnBlock>
          </Lib>
          <Lib>
            <Left>
              <Title>ORG已赚取</Title>
              <Number>0.00001</Number>
            </Left>
            <BtnBlock>
              <Nodes>
                {/* <Button className='_btns' disabled={loadding}>批准合约</Button> */}
                <Button  className='_btns dos'>-</Button>
                <Button  className='_btns dos'>+</Button>
              </Nodes>
            </BtnBlock>
          </Lib>
        </Section>
        <Line>
          <Label>总流动性:</Label>
          <Right className='bold luidity'>95.64% </Right>
        </Line>
      </Content>
      <Footer>
        <Item>获取ORG-XXX <Icon src="/images/farm/open.svg" /></Item>
        <Item>查看合约 <Icon src="/images/farm/open.svg" /></Item>
      </Footer>
    </Main>
  )
}

const Main = styled.div`
  background: #ffffff;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.02);
  border-radius: 20px;
  padding: 26px 20px 35px;

  position: relative;
  z-index: 3;
  margin-bottom: 50px;
  @media (max-width: 768px) {
    padding: 40px 0 72px;
  }
`
const Header = styled.div`
  height: 64px;
  display: flex;
  justify-content: space-between;
`
const Symbol = styled.div`
  position: relative;
  width: 40%;
`
const BaseSymbolImg = styled.img`
  height: 32px;
  position: absolute;
  top: 0;
  left: 0;
`
const SymbolImg = styled.img`
  height: 48px;
  position: absolute;
  top: 12px;
  left: 16px;
`
const HeaderCont = styled.div``
const SymbolName = styled.div`
  font-family: 'PingFang SC';
  font-weight: 600;
  font-size: 18px;
  line-height: 25px;
  text-align: right;
  color: #121211;
  margin-bottom: 12px;
`
const SymbolInfo = styled.div`
  display: flex;
  height: 24px;
`
const Audit = styled.div`
  height: 100%;
  line-height: 24px;
  padding: 0 6px;
  border: 2px solid #ffae32;
  border-radius: 50px;
  display: flex;
  align-items: center;
  font-family: 'PingFang SC';
  font-weight: 600;
  font-size: 12px;
  background: linear-gradient(120.51deg, #ff6a43 1.69%, #ffad34 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-right: 10px;
`
const Star = styled.img`
  height: 15px;
  margin-right: 2px;
`
const Multiple = styled.div`
  height: 100%;
  line-height: 24px;
  background: linear-gradient(90deg, #e466ef 0%, #f972d4 48.23%, #9b84ff 100%);
  border-radius: 50px;
  padding: 0 8px;
  font-family: 'PingFang SC';
  font-weight: 600;
  font-size: 12px;
  color: #ffffff;
`



const Content = styled.div`
  margin-top: 35px;
  width: 100%;
`
const Line = styled.div`
  margin-bottom: 10px;
  height: 20px;
  line-height: 20px;
  font-family: 'PingFang SC';
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #9E9FA4;
  display: flex;
  justify-content: space-between;
`
const Label = styled.div`
`
const Right = styled.div`
  font-weight: 400;
  font-size: 14px;
  color: #121211;
  text-align: right;
  position: relative;
  &.bold{
    font-weight: 600;
  }
  &.luidity{
    margin-right: 19px;
  }
`
const CalculateIcon = styled.img`
  height: 15px;
  margin-left: 8px;
`
const Section = styled.div`
  margin-top: 6px;
  width: 100%;
  margin-bottom: 44px;
`
const Lib = styled.div`
  height: 57px; // 33 - 16 + 40(btn:height)
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 21px;
`
const Left = styled.div`
  flex: 1;
`
const Title = styled.div`
  font-family: 'PingFang SC';
  font-weight: 600;
  font-size: 12px;
  line-height: 17px;
  color: #FFAE32;
  margin-bottom: 9px;
`
const Number = styled.div`
  font-family: 'Arimo Hebrew Subset';
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 28px;
  /* color: #DCDCDC; */
  color: #000000;
`
const BtnBlock = styled.div`
  display: flex;
  width: 125px;
  height: 100%;
  position: relative;
  
`
const Nodes = styled.div`
  height: 40px;
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  ._btns{
    flex: 1;
    height: 100%;
    font-weight: bold;
    font-family: 'PingFang SC';
    font-weight: 600;
    font-size: 16px;
    line-height: 40px;
    text-align: center;
    background: linear-gradient(120.51deg, #FF6A43 1.69%, #FFAD34 100%);
    border-radius: 16px;
    color: #FFFFFF;
    box-shadow: none;
    &:disabled, &.pancake-button--disabled, .pancake-button--loading{
      opacity: 1;
      background: #E9EAEC;
      color: #BDC2C5;
    }
  }
  .dos{
    width: 45px;
    height: 45px;
    line-height: 45px;
    background: #FFF3EA;
    border-radius: 16px;
    position: relative;
    top: -5px;
    margin-right: 12px;
    color: #FF5D32;
    &:last-child{
      margin-right: 0;
    }
  }
`



const Footer = styled.div`
  margin-top: 18px;
`
const Item = styled.div`
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  height: 20px;
  line-height: 20px;
  color: #FFAD34;
  margin-bottom: 10px;
  &:last-child{
    margin-bottom: 0;
  }
`
const Icon = styled.img`
  width: 16px;
  margin-left: 14px;
  cursor: pointer;
`
export default CardContent
