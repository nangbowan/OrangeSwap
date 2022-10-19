import { FC, ReactElement, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useAccount } from 'wagmi'
import { useToast } from '@pancakeswap/uikit'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { $shiftedBy } from 'utils/met'
import { copyText } from '@pancakeswap/utils/copyText'
import { ToastDescriptionWithTx } from 'components/Toast'
import { useERC20, useTokenContract, useOrgbundrebate } from 'hooks/useContract'
import { NEVER_RELOAD, useSingleCallResult, } from 'state/multicall/hooks'
import { useAllTokens, useIsUserAddedToken, useToken } from '../../hooks/Tokens'

import ChangeIng from './changeIng'

// orgido:0x33d98E94e133BC82E52B430dEc41C660a9049D51
// orgbundrebate:0xb0410bfdC49e4c101A5C82dEAB6187db76E40eC3
const Rebate: FC = (): ReactElement => {
  const { address: account } = useAccount()
  const { chainId } = useActiveWeb3React()
  const { toastError, toastSuccess } = useToast()
  const [money, setMoney] = useState<number>(0)
  const decimals = 18
  const orgbundrebate = {
    56: '0xAe9269f27437f0fcBC232d39Ec814844a51d6b8f',
    97: '0xb0410bfdC49e4c101A5C82dEAB6187db76E40eC3'
    // 97: '0x593f55EF95be8C327F5B3193Bce8086Da3518140'
    // 97: '0xA00530A1A375Fd414e418ed1688da989Cc0B493D'
  }

  // const tokenContract = useERC20(orgbundrebate[chainId])
  const rebateContract = useOrgbundrebate(orgbundrebate[chainId]);

  const rewardGulars = [
    { grade: 1, number: '0-99999', scal: '0.1%' },
    { grade: 2, number: '100000-199999', scal: '0.2%' },
    { grade: 3, number: '200000-299999', scal: '0.3%' },
    { grade: 4, number: '300000-399999', scal: '0.4%' },
    { grade: 5, number: '500000-999999', scal: '0.5%' },
    { grade: 6, number: '≥1000000', scal: '0.6%' },
  ]

  useEffect(()=> {
    if(rebateContract && chainId){
      // getToken();
      getReward()
    }
  }, [rebateContract, chainId])

  // const getToken = async () => {
  //   // const decimals = useSingleCallResult(token ? undefined : tokenContract, 'decimals', undefined, NEVER_RELOAD)
  //   const balance = await tokenContract.balanceOf('0x0B8996cA85955f6545bFAa63c931b7328886Db69');
  //   console.log('balance ====', balance.toString())
  //   const _decimals = await tokenContract.decimals();
  //   console.log('_decimals ====', _decimals)
  // }
  const getReward = async () => {
    const result = await rebateContract.reward(account);
    console.log('---------------', result.toString())
    setMoney($shiftedBy(result.toString(), -18, 4))
  }
  const dialog = () => {
    copyText(`https://orangeswap.org/swap?shareid=${account}`)
    toastSuccess(`success`, 'Copy Successfly')
  }

  return (
    <Main>
      <Icon className="top_bg" src="/images/rebate/top_yezi.png" />
      <Icon className="regular_bg" src="/images/rebate/yezi.png" />

      <Cont>
        <Invite>
          <InviteLink>
            <Title>
              <span>你的邀请链接</span>
            </Title>
            <LinkCont>
              <Btn>https://orangeswap.org/swap?shareid={account}</Btn>
              <Copy
                className="pc"
                src="/images/rebate/copy.svg"
                onClick={() => dialog()}
              />
              <Copy
                className="mobile"
                src="/images/rebate/copy_mobile.svg"
                onClick={() => dialog()}
              />
            </LinkCont>
          </InviteLink>
          <InviteLink>
            <Title>
              <span>已获得总返佣</span>
            </Title>
            <Count>
              <Text>{money} USDT</Text>
              <ClaimBtn>提取奖励</ClaimBtn>
            </Count>
          </InviteLink>
        </Invite>
        <RewardRegular>
          <Title>
            <span>邀请奖励机制</span>
          </Title>
          <Card>
            <Libs>
              <Header className="exchange">交易奖励</Header>
              <Block>
                <Content>
                  可获得被邀请人每次交易金额
                  <br />
                  0.1%的ORG代币
                </Content>
              </Block>
            </Libs>
            <Libs>
              <Header className="lp">LP挖矿</Header>
              <Block>
                <Content>每次提取收益的0.1%</Content>
              </Block>
            </Libs>
            <Libs>
              <Header className="stake">ORG质押</Header>
              <Block>
                <Content className="last">
                  每次提取收益的0.1%
                  <br />
                  您钱包持有或者农场质押的ORG
                  <br />
                  代币越多，则邀请奖励越多。
                </Content>
              </Block>
            </Libs>
          </Card>
          <Table>
            <Item>
              <Lib>等级</Lib>
              <Lib>持有/质押数量</Lib>
              <Lib>奖励比例</Lib>
            </Item>
            {rewardGulars.map((item) => (
              <Item key={item.grade}>
                <Lib>{item.grade}</Lib>
                <Lib>{item.number}</Lib>
                <Lib>{item.scal}</Lib>
              </Item>
            ))}
          </Table>
        </RewardRegular>
        <ChangeIng />
      </Cont>
    </Main>
  )
}
const Main = styled.div`
  width: 100%;
  background: #f8f8f8;
  position: relative;
  min-width: 1440px;
  @media (max-width: 768px) {
    min-width: 100%;
  }
`
const Cont = styled.div`
  width: 1440px;
  margin: 0 auto;
  position: relative;
  padding-top: 122px;
  @media (max-width: 768px) {
    width: 100%;
    padding: 55px 20px 0;
  }
`
const Icon = styled.img`
  position: absolute;
  &.top_bg {
    left: 0px;
    top: 667px;
    height: 521px;
  }
  &.regular_bg {
    height: 364px;
    right: 0px;
    top: 1532px;
  }
  @media (max-width: 768px) {
    display: none;
  }
`
const Invite = styled.div`
  width: 100%;
`
const InviteLink = styled.div`
  width: 100%;
  margin-bottom: 160px;
  @media (max-width: 768px) {
    margin-bottom: 36px;
  }
`
const Title = styled.div`
  font-family: 'FZLanTingHeiS-B-GB';
  font-style: normal;
  font-size: 64px;
  line-height: 73px;
  margin-bottom: 72px;
  display: inline-block;
  position: relative;
  span {
    position: relative;
    z-index: 2;
    display: inline-block;
    align-items: flex-end;
    background: linear-gradient(92.94deg, #797979 3.82%, #222222 103.22%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  &::before {
    content: '';
    position: absolute;
    top: 48px;
    right: -30px;
    width: 156px;
    height: 16px;
    background: linear-gradient(285.68deg, #ff5b36 6.56%, #ffb74a 98.03%);
    z-index: 1;
  }
  @media (max-width: 768px) {
    font-size: 24px;
    line-height: 34px;
    margin-bottom: 24px;
    &::before {
      width: 48px;
      height: 8px;
      top: 19px;
      right: -10px;
    }
  }
`
const LinkCont = styled.div`
  width: 100%;
  height: 78px;
  @media (max-width: 768px) {
    height: auto;
    position: relative;
    background: linear-gradient(285.68deg, #ff6744 6.56%, #ffae32 98.03%);
    border-radius: 16px;
  }
`
const Btn = styled.div`
  width: 1320px;
  height: 100%;
  line-height: 78px;
  background: linear-gradient(285.68deg, #ff6744 6.56%, #ffae32 98.03%);
  border-radius: 39px;
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 600;
  font-size: 24px;

  text-align: center;
  letter-spacing: 0.05em;

  color: #ffffff;
  display: inline-block;

  @media (max-width: 768px) {
    width: 87%;
    padding: 12px 24px;
    font-size: 16px;
    line-height: 22px;
    display: block;
    background: none;
    word-wrap: break-word;
    text-align: left;
  }
`
const Copy = styled.img`
  float: right;
  width: 50px;
  height: 50px;
  cursor: pointer;
  position: relative;
  top: 13px;
  &.mobile {
    display: none;
  }
  @media (max-width: 768px) {
    position: absolute;
    right: 22px;
    top: 50%;
    transform: translateY(-50%);
    width: 24px;
    height: 24px;
    z-index: 3;
    &.pc {
      display: none;
    }
    &.mobile {
      display: block;
    }
  }
`
const Count = styled.div`
  width: 1320px;
  height: 120px;
  line-height: 120px;
  border: solid 4px transparent;
  border-radius: 80px;
  background-image: linear-gradient(#ffffff, #ffffff),
    linear-gradient(to right, rgba(255, 106, 67, 1), rgba(255, 173, 52, 1));
  background-origin: border-box;
  background-clip: content-box, border-box;
  display: flex;
  @media (max-width: 768px) {
    width: 100%;
    height: 60px;
    line-height: 60px;
    border: none;
    border-radius: 0;
    background-image: none;
    background-origin: border-box;
    background-clip: content-box, border-box;
  }
`
const Text = styled.div`
  flex: 1;
  font-family: 'FZLanTingHeiS-B-GB';
  font-size: 36px;
  text-align: center;
  align-items: flex-end;
  text-align: center;
  background: linear-gradient(285.68deg, #ff6744 6.56%, #ffae32 98.03%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  @media (max-width: 768px) {
    height: 100%;
    background: #ffffff;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.05);
    border-radius: 16px;
    font-family: 'PingFang SC';
    font-weight: 600;
    font-size: 18px;
    -webkit-text-fill-color: #ffae32;
    color: #ffae32;
  }
`
const ClaimBtn = styled.div`
  width: 480px;
  height: 120px;
  position: relative;
  top: -4px;
  right: -4px;
  background: linear-gradient(285.68deg, #ff6744 6.56%, #ffae32 98.03%);
  border-radius: 80px;
  font-family: 'FZLanTingHeiS-B-GB';
  font-size: 36px;
  text-align: center;
  color: #ffffff;
  cursor: pointer;
  @media (max-width: 768px) {
    margin-left: 20px;
    width: 104px;
    height: 100%;
    font-family: 'PingFang SC';
    font-weight: 600;
    font-size: 16px;
    border-radius: 16px;
    top: 0;
    right: 0;
  }
`

const RewardRegular = styled.div`
  margin-top: 77px;
  @media (max-width: 768px) {
    margin-top: 40px;
  }
`
const Card = styled.div`
  width: 100%;
  height: 336px;
  display: flex;
  justify-content: space-between;
  @media (max-width: 768px) {
    height: auto;
    display: block;
  }
`
const Libs = styled.div`
  flex: 1;
  border-radius: 20px;
  overflow: hidden;
  background: #fff;
  &:nth-of-type(2) {
    margin: 0 90px;
  }
  @media (max-width: 768px) {
    border-radius: 0;
    background: none;
    &:nth-of-type(2) {
      margin: 16px 0px;
    }
  }
`
const Header = styled.div`
  height: 100px;
  line-height: 100px;

  position: relative;
  text-align: center;
  font-family: 'FZLanTingHeiS-B-GB';
  font-size: 40px;
  color: #ffffff;
  &.exchange {
    background: linear-gradient(285.68deg, #ffe3a2 6.56%, #ff896c 52.58%, #ffbe99 98.03%);
  }
  &.lp {
    background: linear-gradient(285.68deg, #ff5b36 6.56%, #ffb74a 98.03%);
  }
  &.stake {
    background: linear-gradient(285.68deg, #e466ef 6.56%, #f972d4 59.25%, #9b84ff 98.03%);
  }
  @media (min-width: 769px) {
    width: 100%;
  }
  @media (max-width: 768px) {
    height: 32px;
    line-height: 32px;
    border-radius: 0px 16px 16px 16px;
    font-size: 14px;
    color: #ffffff;
    display: inline-block;
    padding: 0 16px;
    &.exchange {
      background: #ffae32;
    }
    &.lp {
      background: #ffae32;
    }
    &.stake {
      background: #ffae32;
    }
  }
`
const Block = styled.div`
  display: flex;
  align-items: center;
  height: 236px;
  @media (max-width: 768px) {
    display: block;
    height: auto;
    margin: 8px 0 0px;
  }
`
const Content = styled.div`
  width: 100%;
  font-family: 'PingFang SC';
  font-size: 24px;
  line-height: 34px;
  color: #121211;
  text-align: center;
  @media (max-width: 768px) {
    font-size: 14px;
    line-height: 20px;
    text-align: left;
    br {
      display: none;
    }

    &.last {
      br:first-child {
        display: block;
      }
    }
  }
`
const Table = styled.div`
  margin-top: 84px;
  @media (max-width: 768px) {
    margin-top: 24px;
  }
`
const Item = styled.div`
  height: 39px;
  line-height: 39px;
  text-align: center;
  display: flex;
  font-family: 'PingFang SC';
  font-size: 28px;
  color: #121211;
  margin-bottom: 46px;
  &:first-child {
    color: #9e9fa4;
    font-size: 24px;
  }
  &:last-child {
    margin-bottom: 0px;
  }
  @media (max-width: 768px) {
    height: 20px;
    line-height: 20px;
    font-size: 14px;
    margin-bottom: 12px;
    &:first-child {
      font-size: 12px;
    }
  }
`
const Lib = styled.div`
  flex: 1;
  &:nth-of-type(2) {
    margin: 0 90px;
  }

  @media (max-width: 768px) {
    &:nth-of-type(1) {
      flex: 0.7;
    }
    &:nth-of-type(2) {
      margin: 0;
    }
  }
`
export default Rebate
