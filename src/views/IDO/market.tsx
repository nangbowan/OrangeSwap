import { FC, ReactElement } from 'react'
import styled from 'styled-components'

const Market: FC = (): ReactElement => {
  const list = [
    {
      title: 'orange swap IDO邀请机制是如何运作的？',
      path: '/a',
    },
    {
      title: 'Orange Swap IDO的邀请奖励机制是什么？',
      path: '/b',
    },
    {
      title: 'IDO资金将用于何处？',
      path: '/c',
    },
  ]
  return (
    <Main>
      <Explain>
        <Header>运作方式</Header>
        <Content>
          {list.map((item) => (
            <Line key={item.path}>
              <Title>{item.title}</Title>
              <Detail>
                详情
                <UpIcon src="/images/ido/up.svg" />
              </Detail>
            </Line>
          ))}
        </Content>
      </Explain>
      <Icon src="/images/ido/explain.png" />
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
`
const Explain = styled.div`
  width: 808px;
  background: #ffffff;
  border-radius: 16px;
`
const Header = styled.div`
  width: 100%;
  height: 114px;
  line-height: 114px;
  
  border-radius: 16px 16px 0px 0px;
  font-family: 'PingFang SC';
  font-weight: 600;
  font-size: 40px;
  align-items: flex-end;
  background: linear-gradient(271.69deg, #e466ef 1.43%, #f972d4 41.32%, #9b84ff 97.64%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
  text-indent: 46px;
  &::before{
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
`
const Content = styled.div`
  padding: 0 34px;
  width: 100%;
`
const Line = styled.div`
  width: 100%;
  height: 151px;
  border-bottom: 1px dashed #9b84ff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &:last-child {
    border: none;
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
`
const UpIcon = styled.img`
  height: 14px;
  margin-left: 20px;
`
const Icon = styled.img`
  position: absolute;
  width: 677px;
  height: 677px;
  right: -117px;
  top: 0;
`
export default Market
