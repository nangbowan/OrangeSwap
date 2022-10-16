import { FC, ReactElement } from 'react'
import styled from 'styled-components'

const Join: FC = (): ReactElement => {
  return (
    <Main>
      <Content>
        <Imgs className="frist" src="/images/ido/yezi.png" />
        <Imgs className="second" src="/images/ido/yezi.png" />
        <Imgs className="third" src="/images/ido/yezi.png" />
        <Imgs className="four" src="/images/ido/yezi.png" />
        <Title>如何参与IDO</Title>
        <Cont>
          <Left>
            <Tip className="tip_frist">准备好200-1000枚USDT在你的钱包里。</Tip>
          </Left>
          <Icon className="pc" src="/images/ido/join_pc.png" />
          <Icon className="mobile" src="/images/ido/join_mobile.png" />
          <Right>
            <Tip className="tip_second">关注社交媒体并链接到您的FSC公链钱包。</Tip>
            <Tip className="tip_frist">准备好200-1000枚USDT在你的钱包里。</Tip>
            <Tip className="tip_third">1%改为可获得额外的ORG代币奖励</Tip>
          </Right>
        </Cont>
      </Content>
    </Main>
  )
}

const Main = styled.div`
  width: 100%;
  padding: 124px 0 198px;
  background: #ffffff;
  box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.05);
  @media (max-width: 768px) {
    padding: 0 20px;
    margin: 80px 0;
    box-shadow: none;
    background: none;
  }
`
const Content = styled.div`
  width: 1440px;
  margin: 0 auto;
  position: relative;
  @media (max-width: 768px) {
    width: 100%;
  }
`
const Imgs = styled.img`
  position: absolute;
  @media (max-width: 768px) {
    display: none;
  }
  &.frist {
    width: 69px;
    height: 69px;
    left: 120px;
    top: 225px;
  }
  &.second {
    width: 121px;
    height: 121px;
    right: 230px;
    transform: rotate(-10deg);
    top: 20px;
    filter: blur(5px);
  }
  &.third {
    width: 195.47px;
    height: 195.47px;
    left: 450px;
    bottom: -90px;
    transform: rotate(-20.87deg);
    filter: blur(3px);
  }
  &.four {
    bottom: 30px;
    right: 0;
    width: 121px;
    height: 121px;
    transform: rotate(-34.89deg);
  }
`
const Title = styled.div`
  text-align: center;
  font-family: 'PingFang SC';
  font-weight: 600;
  font-size: 46px;
  line-height: 64px;
  color: #000000;
  margin-bottom: 80px;
  @media (max-width: 768px) {
    font-size: 18px;
    line-height: 25px;
    margin-bottom: 18px;
    text-align: left;
  }
`
const Cont = styled.div`
  display: flex;
  font-family: 'PingFang SC';
  font-size: 28px;
  line-height: 39px;
  height: 360px;
  width: 100%;
  color: #000000;
  @media (max-width: 768px) {
    font-size: 14px;
    line-height: 20px;
    height: 180px;
  }
`
const Left = styled.div`
  flex: 1;
  height: 100%;
  text-align: right;
  position: relative;
  @media (max-width: 768px) {
    display: none;
  }
`
const Tip = styled.div`
  position: absolute;
  width: 352px;
  &.tip_frist {
    top: 160px;
    right: 28px;
    @media (max-width: 768px) {
      top: 80px;
      left: 0;
    }
  }
  &.tip_second {
    top: -5px;
    left: 28px;
    @media (max-width: 768px) {
      top: 0px;
      left: 0;
    }
  }
  &.tip_third {
    bottom: -30px;
    left: 28px;
    @media (max-width: 768px) {
      bottom: 0px;
      left: 0;
    }
  }
`
const Icon = styled.img`
  width: 176px;
  height: 360px;
  &.mobile {
    display: none;
  }
  @media (max-width: 768px) {
    width: 54px;
    height: 180px;
    margin-right: 15px;
    &.pc {
      display: none;
    }
    &.mobile {
      display: block;
    }
  }
`
const Right = styled.div`
  flex: 1;
  text-align: left;
  width: 336px;
  position: relative;
  .tip_frist {
    display: none;
  }
  @media (max-width: 768px) {
    .tip_frist {
      display: block;
    }
  }
`
export default Join
