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

const clearNoNum = (val: string) => {
  let _val = val.replace(/[^\d.]/g, '')
  _val = _val.replace(/\.{2,}/g, '.')
  _val = _val.replace(/^\./g, '')
  _val = _val.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
  return _val
}

const CardContent: FC = (): ReactElement => {
  const { address: account } = useAccount()
  const { chainId } = useActiveWeb3React()
  const [loadding, setLoadding] = useState<boolean>(true)
  const [open, setOpen] = useState<boolean>(false)
  const [amount, setAmount] = useState('')
  
  const listener = () => {
    try{
      if (open) {
        document.documentElement.style.overflow = 'hidden';
        document.getElementById('_nav_footer_dom').style.display = 'none';
        // document.getElementById('_nav_top_dom').style.display = 'none'
      } else {
        document.documentElement.style.overflow = 'scroll';
        document.getElementById('_nav_footer_dom').style.display = 'flex';
        // document.getElementById('_nav_top_dom').style.display = 'flex'
      }
    }catch(e){
      console.log('')
    }
  }

  const openDialog = (data?) => {
    setOpen(true);
    setAmount('');
  }

  useEffect(() => {
    listener();
  }, [open])

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
          <Right>
            95.64% <CalculateIcon src="/images/token_symbol/ORG.png" />
          </Right>
        </Line>
        <Line>
          <Label>赚取:</Label>

          <Right className="bold">95.64% </Right>
        </Line>
        <Section>
          <Lib>
            <Left>
              <Title>ORG已赚取</Title>
              <Number>0.00001</Number>
            </Left>
            <BtnBlock>
              <Nodes>
                <Button className="_btns" isLoading={!loadding}>
                  收割
                </Button>
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
                <Button className="_btns dos" onClick={()=> openDialog()}>-</Button>
                <Button className="_btns dos" onClick={()=> openDialog()}>+</Button>
              </Nodes>
            </BtnBlock>
          </Lib>
        </Section>
        <Line>
          <Label>总流动性:</Label>
          <Right className="bold luidity">95.64% </Right>
        </Line>
      </Content>
      <Footer>
        <Item>
          获取ORG-XXX <Icon src="/images/farm/open.svg" />
        </Item>
        <Item>
          查看合约 <Icon src="/images/farm/open.svg" />
        </Item>
      </Footer>
      {open && (
        <Dialog>
          <Mask onClick={()=> setOpen(false)}> </Mask>
          <Cont>
            <LabelText>Stake LP tokens</LabelText>
            <DialogCont>
              <Top>
                Stake <RightCont>Balance：0</RightCont>
              </Top>
              <Bottom>
                <Input placeholder="0" value={amount} onChange={(e) => setAmount(clearNoNum(e.target.value))} />
                <RightCont className="_operation">
                  <Max>MAX</Max>
                  ORG-BNB LP
                </RightCont>
              </Bottom>
            </DialogCont>
            <Btns>
              <Button className="_dialog_btn">Cancel</Button>
              <Button className="_dialog_btn" disabled={loadding}>
                Confirm
              </Button>
            </Btns>
            <See>
              <span>
                Get ORG-BNB LP
                <Icon src="/images/farm/open.svg" />
              </span>
            </See>
          </Cont>
        </Dialog>
      )}
    </Main>
  )
}

const Dialog = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
`
const Mask = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
`
const Cont = styled.div`
  position: absolute;
  width: 500px;
  background: #ffffff;
  border-radius: 20px;
  padding: 41px 25px 19px;
  @media (min-width: 769px) {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  @media (max-width: 768px) {
    bottom: 60px;
    left: 0;
    width: 100%;
    padding: 36px 22px 30px 18px;
    border-radius: 20px 20px 0 0;
  }
`
const LabelText = styled.div`
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 34px;
  color: #ff8c14;
  padding-bottom: 26px;
  border-bottom: 1px solid #f3f3f3;
  @media (max-width: 768px) {
    font-size: 20px;
    line-height: 28px;
    padding-bottom: 23px;
  }
`
const DialogCont = styled.div`
  margin: 26px 0 28px;
  padding: 14px 19px 10px 25px;
  background: #f3eee7;
  border-radius: 12px;
  width: 100%;
  @media (max-width: 768px) {
    margin: 23px 0;
    padding: 12px 15px 13px 29px;
  }
`
const Top = styled.div`
  font-family: 'PingFang SC';
  font-weight: 500;
  font-size: 15px;
  line-height: 21px;
  display: flex;
  justify-content: space-between;
  color: #000000;
  margin-bottom: 18px;
  @media (max-width: 768px) {
    font-size: 12px;
    line-height: 17px;
  }
`
const RightCont = styled.div`
  display: flex;
  align-items: center;
  color: #000000;
  white-space: nowrap;
  &._operation {
    position: relative;
    left: -17px;
  }
`
const Bottom = styled.div`
  height: 27px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  @media (max-width: 768px) {
    height: 25px;
    font-size: 12px;
  }
`
const Input = styled.input`
  flex: 1;
  font-family: 'PingFang SC';
  font-weight: 600;
  font-size: 18px;
  color: #000;
  background: none;
  border: none;
  padding-right: 20px;
  &:focus-visible {
    outline: none;
  }
  @media (max-width: 768px) {
    font-size: 14px;
    padding-right: 15px;
  }
`
const Max = styled.div`
  height: 27px;
  line-height: 27px;
  text-align: center;
  background: linear-gradient(120.51deg, #ff6a43 1.69%, #ffad34 100%);
  border-radius: 14px;
  font-weight: 600;
  font-size: 15px;
  letter-spacing: 0.1em;
  padding: 0 18px;
  margin-right: 17px;
  color: #ffffff;
  @media (max-width: 768px) {
    padding: 0 15px;
    height: 25px;
    line-height: 25px;
    font-size: 12px;
    margin-right: 10px;
  }
`
const Btns = styled.div`
  height: 41px;
  padding: 0 23px;
  display: flex;
  justify-content: space-between;
  ._dialog_btn {
    width: 179px;
    height: 41px;
    border: 1px solid #ff8c14;
    border-radius: 18px;
    color: #ff8c14;
    font-weight: 600;
    font-size: 16px;
    background: #fff;
    box-shadow: none;
    &:disabled,
    &.pancake-button--disabled,
    .pancake-button--loading {
      opacity: 1;
      background: #ececec;
      color: #89847d;
      border-color: #ececec;
    }
  }
  @media (max-width: 768px) {
    height: 36px;
    padding: 0 17px;
    ._dialog_btn {
      width: 130px;
      font-size: 14px;
    }
  }
`
const See = styled.div`
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 21px;
  color: #ff8c14;
  text-align: center;
  margin-top: 32px;
  span {
    cursor: pointer;
  }
  img {
    position: relative;
    top: 3px;
  }
  @media (max-width: 768px) {
    font-size: 12px;
    line-height: 17px;
  }
`

const Main = styled.div`
  background: #ffffff;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.02);
  border-radius: 20px;
  padding: 26px 20px 35px;

  position: relative;
  z-index: 3;
  /* margin-bottom: 50px; */
  @media (max-width: 768px) {
    padding: 26px 18 35px;
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
  color: #9e9fa4;
  display: flex;
  justify-content: space-between;
`
const Label = styled.div``
const Right = styled.div`
  font-weight: 400;
  font-size: 14px;
  color: #121211;
  text-align: right;
  position: relative;
  &.bold {
    font-weight: 600;
  }
  &.luidity {
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
  /* @media (max-width: 768px) {
    margin-bottom: 24px;
  } */
`
const Lib = styled.div`
  height: 57px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 21px;
  &:last-child {
    margin-bottom: 0;
  }
`
const Left = styled.div`
  flex: 1;
`
const Title = styled.div`
  font-family: 'PingFang SC';
  font-weight: 600;
  font-size: 12px;
  line-height: 17px;
  color: #ffae32;
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
  ._btns {
    flex: 1;
    height: 100%;
    font-weight: bold;
    font-family: 'PingFang SC';
    font-weight: 600;
    font-size: 16px;
    line-height: 40px;
    text-align: center;
    background: linear-gradient(120.51deg, #ff6a43 1.69%, #ffad34 100%);
    border-radius: 16px;
    color: #ffffff;
    box-shadow: none;
    &:disabled,
    &.pancake-button--disabled,
    .pancake-button--loading {
      opacity: 1;
      background: #e9eaec;
      color: #bdc2c5;
    }
  }
  .dos {
    width: 45px;
    height: 45px;
    line-height: 45px;
    background: #fff3ea;
    border-radius: 16px;
    position: relative;
    top: -5px;
    margin-right: 12px;
    color: #ff5d32;
    &:last-child {
      margin-right: 0;
    }
  }
`

const Footer = styled.div`
  margin-top: 18px;
  @media (max-width: 768px) {
    margin-top: 0px;
  }
`
const Item = styled.div`
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  height: 20px;
  line-height: 20px;
  color: #ffad34;
  margin-bottom: 10px;
  &:last-child {
    margin-bottom: 0;
  }
`
const Icon = styled.img`
  width: 16px;
  margin-left: 14px;
  cursor: pointer;
`
export default CardContent
