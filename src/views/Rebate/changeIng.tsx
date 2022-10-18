import { FC, ReactElement } from 'react'
import styled from 'styled-components'

const ChangeIng: FC = (): ReactElement => {
  return (
    <Main>
      <Section>
        <Img src="/images/rebate/coin.png" />
        <Cont>
          <Header>
            交易挖矿
            <br />
            正在进行中！！！
          </Header>
          <Content>
            <Card>
              <Libs>
                <Title>我的交易金额</Title>
                <Count>XXXXORG</Count>
              </Libs>
              <Libs>
                <Title>我的交易金额</Title>
                <Count>XXXXORG</Count>
              </Libs>
            </Card>
            <Btn>提取奖励</Btn>
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
  @media (max-width: 768px) {
    width: 100%;
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
