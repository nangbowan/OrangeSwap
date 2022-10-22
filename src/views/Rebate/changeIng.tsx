import { FC, ReactElement, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useAccount } from 'wagmi'
import { useToast, Button } from '@pancakeswap/uikit'
import { useGasPrice } from 'state/user/hooks'
import useActiveWeb3React from 'hooks/useActiveWeb3React'

import { $shiftedBy } from 'utils/met'
import { BOOSTED_FARM_GAS_LIMIT } from 'config'
import { ToastDescriptionWithTx } from 'components/Toast'
import useCatchTxError from 'hooks/useCatchTxError'

import { useOrgbundrebate } from 'hooks/useContract'

const options = {
  gasLimit: BOOSTED_FARM_GAS_LIMIT,
}

const ChangeIng: FC = (): ReactElement => {
  const { address: account } = useAccount()
  const { chainId } = useActiveWeb3React()
  const gasPrice = useGasPrice()
  const { toastSuccess } = useToast()
  const { fetchWithCatchTxError, loading: pendingTx } = useCatchTxError()

  const [money, setMoney] = useState<number>(0)


  const orgbundrebate = {
    56: '',
    97: '0xb0410bfdC49e4c101A5C82dEAB6187db76E40eC3',
  }

  const rebateContract = useOrgbundrebate(orgbundrebate[chainId])

  const getReward = async () => {
    const result = await rebateContract.swapreward(account)
    setMoney($shiftedBy(result.toString(), -18, 6))
  }

  const claim = async () => {
    const receipt = await fetchWithCatchTxError(() => {
      return rebateContract.claimswaprebate({ ...options, gasPrice })
    })
    if (receipt?.status) {
      toastSuccess(
        `Harvested!`,
        <ToastDescriptionWithTx txHash={receipt.transactionHash}>
          提取奖励成功
        </ToastDescriptionWithTx>,
      )
      getReward()
    }
  }

  useEffect(() => {
    if (rebateContract && chainId && account) {
      getReward()
    }
  }, [rebateContract, chainId, account])
  return (
    <Main>
      <Section>
        <Img src="/images/rebate/coin.png" />
        <Cont>
          <Header>
            交易挖矿
            <br />
            正在进行中
          </Header>
          <Content>
            <Card>
              <Libs>
                <Title>我的交易金额</Title>
                <Count>{money * 1000} ORG</Count>
              </Libs>
              <Libs>
                <Title>我的交易奖励</Title>
                <Count>{money} ORG</Count>
              </Libs>
            </Card>
            <Button className='_claimBtn' isLoading={pendingTx} disabled={money <= 0} onClick={() => claim()}>提取奖励</Button>
          </Content>
        </Cont>
      </Section>
    </Main>
  )
}
const Main = styled.div`
  width: 100%;
  padding: 24px 0 79px;
  @media (max-width: 768px) {
    padding: 40px 0 72px;
  }
`
const Section = styled.div`
  width: 1440px;
  height: 560px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
  @media (max-width: 768px) {
    width: 100%;
    padding: 0 20px;
    height: auto;
  }
`
const Img = styled.img`
  width: 560px;
  height: 560px;
  margin-right: 40px;
  position: absolute;
  top: 0;
  @media (min-width: 769px) {
    left: -40px;
  }
  @media (max-width: 768px) {
    width: 132px;
    height: 132px;
    right: 0;
    top: -40px;
    margin-right: 10px;
    z-index: 3;
  }
`
const Cont = styled.div`
  width: 100%;
  padding: 136px 0 0 560px;
  position: relative;
  z-index: 2;
  @media (max-width: 768px) {
    padding: 0;
  }
`
const Header = styled.div`
  font-family: 'FZLanTingHeiS-B-GB';
  font-style: normal;
  font-weight: 400;
  font-size: 72px;
  line-height: 82px;

  margin-bottom: 53px;
  @media (min-width: 769px) {
    display: flex;
    align-items: flex-end;
    background: linear-gradient(180deg, #e466ef 0%, #9b84ff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    br {
      display: none;
    }
  }
  @media (max-width: 768px) {
    background: linear-gradient(180deg, #E466EF 0%, #9B84FF 100%);
    border-radius: 16px;
    padding: 20px 0 20px 20px;
    margin-bottom: 20px;
    font-size: 20px;
    line-height: 23px;
    color: #ffffff;
    br {
      display: block;
    }
  }
`
const Content = styled.div`
  width: 578px;
  ._claimBtn{
    width: 100%;
    height: 60px;
    line-height: 60px;
    background: linear-gradient(180deg, #e466ef 0%, #9b84ff 100%);
    border-radius: 20px;
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    margin-top: 20px;
    text-align: center;
    color: #ffffff;
    padding: 0;
    letter-spacing: 0;
  }
  @media (max-width: 768px) {
    width: 100%;
    ._claimBtn{
      font-size: 16px;
    }
  }
`
const Card = styled.div`
  width: 100%;
  display: flex;
`
const Libs = styled.div`
  flex: 1;
  background: #ffffff;
  border-radius: 16px;
  padding: 24px 0;
  &:first-child {
    margin-right: 20px;
  }
  @media (max-width: 768px) {
    padding: 12px 0;
    &:first-child {
      margin-right: 15px;
    }
  }
`
const Title = styled.div`
  font-family: 'PingFang SC';
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  color: #c5c5c5;
  text-align: center;
  margin-bottom: 24px;
  @media (max-width: 768px) {
    text-indent: 12px;
    font-size: 14px;
    line-height: 20px;
    color: #151515;
    margin-bottom: 19px;
  }
`
const Count = styled.div`
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 34px;
  align-items: flex-end;
  background: linear-gradient(91.87deg, #e466ef 0.55%, #9b84ff 99.21%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
  @media (max-width: 768px) {
    font-size: 20px;
    line-height: 28px;
  }
`
const Btn = styled.div`
  width: 100%;
  height: 60px;
  line-height: 60px;
  background: linear-gradient(180deg, #e466ef 0%, #9b84ff 100%);
  border-radius: 20px;
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  margin-top: 20px;
  text-align: center;
  color: #ffffff;
  cursor: pointer;
  @media (max-width: 768px) {
    height: 40px;
    line-height: 40px;
    font-size: 16px;
  }
`
export default ChangeIng
