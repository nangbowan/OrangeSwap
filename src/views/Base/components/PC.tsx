import { FC, ReactElement } from 'react'
import styled from 'styled-components'

const PC: FC = (): ReactElement => {
  return (
    <Main>
      <Top>
        <Start>即将开始</Start>
        <OrgImg src="/images/base/pc/orgido.png" />
        <TopCont>
          <Btn>GO</Btn>
          <Arrow src="/images/base/pc/arrow.svg" />
          <Join>立即参与</Join>
        </TopCont>
        <TopImg src="/images/base/pc/banner.png" />
      </Top>
      <Notice>
        <NoticeContent>
          <NoticeTitle>在FSC公链中最受欢迎的去中心化平台上交易、赚取 和赢得加密货币。</NoticeTitle>
          <Right>
            <ConnectWallet>
              <Icon src="/images/base/pc/wallet.svg" />
              连接钱包
            </ConnectWallet>
            <ConnectWallet>
              <Icon src="/images/base/pc/change.svg" />
              立即交易
            </ConnectWallet>
          </Right>
        </NoticeContent>
      </Notice>
      <Content>
        <FoliageIcon className="frist" src="/images/base/pc/showFoliage.png" />
        <FoliageIcon className="two" src="/images/base/pc/foliage.png" />
        <FoliageIcon className="thri" src="/images/base/pc/showFoliage.png" />
        <FoliageIcon className="four" src="/images/base/pc/foliage.png" />
        <Title>数百万用户使用，数十亿交易价值</Title>
        <Tip>在所有去中心化平台中，Orange Swap的用户最多。 这些用户现在正在将超过数以亿计的资金委托给平台。</Tip>
        <Lib>您会加入他们吗？</Lib>
      </Content>
    </Main>
  )
}
const FoliageIcon = styled.img`
  position: absolute;
  border-radius: 50%;
  &.frist {
    top: 349px;
    right: 330px;
    width: 95px;
    height: 95px;
    transform: rotate(-20.87deg);
    opacity: 0.1;
  }
  &.two {
    top: 595px;
    left: 9px;
    width: 69px;
    height: 69px;
    box-shadow: 4px 4px 20px rgba(0, 0, 0, 0.1);
  }
  &.thri {
    top: 775px;
    left: 317px;
    width: 195.47px;
    height: 195.47px;
    box-shadow: 4px 4px 20px rgba(0, 0, 0, 0.1);
    transform: rotate(-20.87deg);
    opacity: 0.5;
  }
  &.four {
    top: 769px;
    right: 26px;
    width: 121px;
    height: 121px;
    box-shadow: 4px 4px 20px rgba(0, 0, 0, 0.1);
    transform: rotate(-34.89deg);
  }
`
const Title = styled.h4`
  font-family: 'FZLanTingHeiS-B-GB';
  font-style: normal;
  font-weight: 400;
  font-size: 72px;
  line-height: 82px;
  display: flex;
  align-items: flex-end;

  background: linear-gradient(92.51deg, #afafaf 0.37%, #151515 51.61%, #afafaf 99.14%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`
const Tip = styled.p`
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 400;
  font-size: 22px;
  line-height: 31px;
  text-align: center;
  color: #151515;
  margin: 72px 0 24px;
  width: 540px;
  display: inline-block;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  
`
const Lib = styled.p`
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 600;
  font-size: 22px;
  line-height: 31px;
  text-align: center;
  color: #151515;
`

const Main = styled.div`
  width: 1440px;
  padding-top: 45px;
  position: relative;
`
const Top = styled.div`
  width: 100%;
  position: relative;
  height: 904px;
`
const Start = styled.div`
  padding-top: 210px;
  font-family: 'FZLanTingHeiS-B-GB';
  font-style: normal;
  font-weight: 400;
  font-size: 72px;
  line-height: 82px;
  display: flex;
  align-items: flex-end;
  background: -webkit-linear-gradient(left, #929292, #373737 23.22%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`
const OrgImg = styled.img`
  width: 566px;
  margin: 64px 0 127px;
`
const TopCont = styled.div`
  height: 90px;
  display: flex;
  align-items: center;
`
const Btn = styled.div`
  width: 280px;
  height: 90px;
  background: linear-gradient(285.68deg, #ff5b36 6.56%, #ffb74a 98.03%);
  font-family: 'FZLanTingHeiS-B-GB';
  font-size: 32px;
  line-height: 90px;
  letter-spacing: 0.2em;
  color: #ffffff;
  text-align: center;
`
const Arrow = styled.img`
  width: 44px;
  height: 32px;
  margin: 0 32px;
`
const Join = styled.div`
  font-family: 'PingFang SC';
  font-size: 22px;
  line-height: 31px;
  color: #151515;
`
const TopImg = styled.img`
  width: 904px;
  height: 904px;
  position: absolute;
  right: -80px;
  top: 0;
`

const Notice = styled.div`
  position: fixed;
  left: 0;
  top: 1063px;
  width: 100%;
  height: 160px;
  background: linear-gradient(285.68deg, #ff5b36 6.56%, #ffb74a 98.03%);
`
const NoticeContent = styled.div`
  width: 1440px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`
const NoticeTitle = styled.div`
  font-family: 'PingFang SC';
  font-size: 32px;
  line-height: 45px;
  letter-spacing: 0.1em;
  color: #ffffff;
  flex: 1;
  margin-right: 148px;
`
const Right = styled.div`
  width: 484px;
  height: 61px;
  display: flex;
`
const ConnectWallet = styled.div`
  flex: 1;
  height: 100%;
  text-align: center;
  border: 2px solid #ffffff;
  font-family: 'PingFang SC';
  font-size: 28px;
  line-height: 57px;
  color: #ffffff;
  &:first-child {
    margin-right: 36px;
  }
`
const Icon = styled.img`
  width: 32px;
  height: 32px;
  margin-right: 19px;
`

const Content = styled.div`
  width: 100%;
  min-height: 1000px;
  padding-top: 493px;
  position: relative;
`

export default PC
