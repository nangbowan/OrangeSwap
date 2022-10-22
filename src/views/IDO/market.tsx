import { FC, ReactElement, useState } from 'react'
import styled from 'styled-components'

const Market: FC = (): ReactElement => {
  const [index, setIndex] = useState<number>(-1)
  const list = [
    {
      title: 'orange swap IDO邀请机制是如何运作的？',
      content: '在IDO界面链接钱包，复制您专属的邀请链接发送给您的朋友，通过您的邀请链接进入IDO界面并链接钱包即为绑定成功。'
    },
    {
      title: 'Orange Swap IDO的邀请奖励机制是什么？',
      content: '您每邀请一个朋友成功认购IDO，您都可以获得她/他参与认购额度5%的ORG代币。'
    },
    {
      title: 'IDO资金将用于何处？',
      content: 'IDO所募集的资金将用于添加ORG初始流动池、项目营销及团队运营。'
    },
  ]
  return (
    <Main id="market">
      
      <Explain>
        <Header>运作方式</Header>
        <Content>
          {list.map((item, _index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Line key={_index}>
              <Top>
                <Title>{item.title}</Title>
                <Detail onClick={() => {setIndex(index === _index ? -1 : _index)}}>
                  {index === _index ? "隐藏" : "详情"}
                  <UpIcon className={["pc", index === _index && 'active'].join(' ')} src="/images/ido/up.svg" />
                  <UpIcon className={["mobile", index === _index && 'active'].join(' ')} src="/images/ido/up_mobile.svg" />
                </Detail>
              </Top>
              {index === _index && <Tip>{item.content}</Tip>}
            </Line>
          ))}
        </Content>
      </Explain>
      <Icon src="/images/base/banner2.png" />
    </Main>
  )
}

const Main = styled.div`
  width: 1440px;
  height: 667px;
  margin: 200px auto 132px;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  @media (max-width: 768px) {
    margin: 81px auto 32px;
    width: 100%;
    height: auto;
    display: block;
    padding: 0 20px;
  }
`
const Explain = styled.div`
  width: 808px;
  background: #ffffff;
  border-radius: 16px;
  @media (max-width: 768px) {
    width: 100%;
  }
`
const Header = styled.div`
  width: 100%;
  height: 114px;
  line-height: 114px;

  border-radius: 16px 16px 0px 0px;
  font-family: 'PingFang SC';
  font-weight: 600;
  font-size: 40px;
  position: relative;
  text-indent: 46px;
  @media (min-width: 769px) {
    align-items: flex-end;
    background: linear-gradient(271.69deg, #e466ef 1.43%, #f972d4 41.32%, #9b84ff 97.64%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(285.68deg, #e466ef 6.56%, #f972d4 52.11%, #9b84ff 98.03%);
      opacity: 0.2;
      border-radius: 16px 16px 0px 0px;
    }
  }
  @media (max-width: 768px) {
    height: 80px;
    line-height: 80px;
    font-size: 24px;
    text-indent: 20px;
    color: #fff;
    background: linear-gradient(285.68deg, #ff6744 6.56%, #ffae32 98.03%);
  }
`
const Content = styled.div`
  padding: 0 34px;
  width: 100%;
`
const Line = styled.div`
  width: 100%;
  
  padding: 56px 0 36px;
  border-bottom: 1px dashed #9b84ff;
  &:last-child {
    border: none;
  }
  @media (max-width: 768px) {
    padding: 20px 0;
    border-bottom: 1px dashed #ff8c14;
  }
`
const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 20px;
  @media (max-width: 768px) {
    padding-bottom: 10px;
  }
`
const Title = styled.div`
  text-indent: 14px;
  font-family: 'PingFang SC';
  font-weight: 500;
  font-size: 28px;
  line-height: 39px;
  letter-spacing: 0.025em;
  text-transform: capitalize;
  color: #000000;
  
  @media (max-width: 768px) {
    font-size: 16px;
    line-height: 22px;
    text-indent: 0;
  }
`
const Detail = styled.div`
  font-family: 'PingFang SC';
  font-weight: 600;
  font-size: 28px;
  line-height: 39px;
  letter-spacing: 0.025em;
  text-transform: uppercase;
  color: #e466ef;
  display: flex;
  align-items: center;
  cursor: pointer;
  float: right;
  @media (max-width: 768px) {
    width: 92px;
    text-align: right;
    font-size: 16px;
    line-height: 18px;
    color: #ff8c14;
    margin-left: 20px;
    display: block;
  }
`
const UpIcon = styled.img`
  height: 14px;
  margin-left: 20px;
  transform: rotate(0deg);
  transition: all .2s;
  &.mobile {
    display: none;
  }
  &.active{
    transform: rotate(-180deg);
    transform-origin: center center;
  }
  @media (max-width: 768px) {
    height: 5px;
    margin-left: 10px;
    &.mobile {
      display: inline-block;
      position: relative;
      top: -2px;
    }
    &.pc {
      display: none;
    }
  }
`
const Icon = styled.img`
  position: absolute;
  width: 450px;
  height: 450px;
  right: 80px;
  top: 50px;
  @media (max-width: 768px) {
    position: relative;
    width: 150px;
    height: auto;
    right: -120px;
    padding: 0 0 50px 0;
  }
`
const Tip = styled.div`
  font-family: 'PingFang SC';
  font-size: 24px;
  line-height: 34px;
  letter-spacing: 0.025em;
  text-transform: capitalize;
  color: #000000;
  @media (max-width: 768px) {
    font-size: 12px;
    line-height: 17px;
    
  }
`
export default Market
