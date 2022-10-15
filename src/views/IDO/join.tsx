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
            <Tip className='tip_frist'>准备好200-1000枚USDT在你的钱包里。</Tip>
          </Left>
          <Icon src="/images/ido/join_pc.png" />
          <Right>
            <Tip className='tip_second'>关注社交媒体并链接到您的FSC公链钱包。</Tip>
            <Tip className='tip_third'>1%改为可获得额外的ORG代币奖励</Tip>
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
`
const Content = styled.div`
  width: 1440px;
  margin: 0 auto;
  position: relative;
`
const Imgs = styled.img`
  position: absolute;
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
`
const Cont = styled.div`
  display: flex;
  font-family: 'PingFang SC';
  font-size: 28px;
  line-height: 39px;
  height: 360px;
  width: 100%;
  color: #000000;
`
const Left = styled.div`
  flex: 1;
  height: 100%;
  text-align: right;
  position: relative;
`
const Tip = styled.div`
  position: absolute;
  width: 352px;
  &.tip_frist{
    top: 160px;
    right: 28px;
  }
  &.tip_second{
    top: -5px;
    left: 28px;
  }
  &.tip_third{
    bottom: -30px;
    left: 28px;
  }
`
const Icon = styled.img`
  width: 176px;
  height: 360px;
`
const Right = styled.div`
  flex: 1;
  text-align: left;
  width: 336px;
  position: relative;
`
export default Join
