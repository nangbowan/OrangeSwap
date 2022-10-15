import { FC, ReactElement } from 'react'
import styled from 'styled-components'

const idoCard: FC = (): ReactElement => {
  const isStart = false
  return (
    <Main>
      <Imgs className="frist" src="/images/ido/frist_bg.png" />
      <Imgs className="second" src="/images/ido/second_bg.png" />
      <Imgs className="third" src="/images/ido/third_bg.png" />

      <Title>IDO:Initial Digital Assects Offering</Title>
      <MarketBtn>运作方式</MarketBtn>
      <IdoCont>
        <Card>
          <Top>
            {!isStart ? (
              <>
                <Icon src="/images/ido/click.png" />
                <IdoTitle>IDO未开始！</IdoTitle>
              </>
            ) : (
              <IdoTitles>IDO未开始！</IdoTitles>
            )}
          </Top>
          <Content>
            <Line>
              <Label>最大代币输入(USDT)</Label>
              <ContFont>
                35214525 USDT
                <br />
                (261.23%)
              </ContFont>
            </Line>
            <Line>
              <Label>总提交金额</Label>
              <ContFont>
                35214525 USDT
                <br />
                (261.23%)
              </ContFont>
            </Line>
            <Line>
              <Label>要筹集的资金</Label>
              <ContFont>832.125 USDT</ContFont>
            </Line>
            <Line>
              <Label>每个ORG的价格</Label>
              <ContFont>$0.90</ContFont>
            </Line>
          </Content>
          <Btn>确认参与</Btn>
        </Card>
        <Card>
          <Top>
            {isStart ? (
              <>
                <Icon src="/images/ido/click.png" />
                <IdoTitle>IDO未开始！</IdoTitle>
              </>
            ) : (
              <IdoTitles>白名单发售</IdoTitles>
            )}
          </Top>
          <Content>
            <Line>
              <Label>最大代币输入(USDT)</Label>
              <ContFont>
                35214525 USDT
                <br />
                (261.23%)
              </ContFont>
            </Line>
            <Line>
              <Label>总提交金额</Label>
              <ContFont>
                35214525 USDT
                <br />
                (261.23%)
              </ContFont>
            </Line>
            <Line>
              <Label>要筹集的资金</Label>
              <ContFont>832.125 USDT</ContFont>
            </Line>
            <Line>
              <Label>每个ORG的价格</Label>
              <ContFont>$0.90</ContFont>
            </Line>
          </Content>
          <Btn> {isStart ? '确认参与' : '确认授权'}</Btn>
        </Card>
        <Imgs className="four" src="/images/ido/four_bg.png" />
        <Imgs className="five" src="/images/ido/five_bg.png" />
      </IdoCont>
      <Invite>
        <InviteCont>
          <Left>
            我的邀请链接
            <MyLink>0000000000000000000...</MyLink>
            <CopyIcon src="/images/ido/copy.svg" />
          </Left>
          <Right>
            <PeopleNum>已邀请人数 : 50</PeopleNum>
            <RewardCount>我的奖励 : 50 XCC</RewardCount>
          </Right>
        </InviteCont>
      </Invite>
    </Main>
  )
}

const Main = styled.div`
  width: 100%;
  padding-top: 157px;
  position: relative;
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1080px;
    background: linear-gradient(180deg, rgba(255, 248, 237, 0) 0%, #fff5e6 100%);
  }
`

const Imgs = styled.img`
  position: absolute;
  &.frist {
    top: 0;
    left: 0;
    width: 290px;
    height: 290px;
    left: -69px;
    top: 130px;
    opacity: 0.6;
    filter: blur(10px);
  }
  &.second {
    width: 814px;
    height: 814px;
    left: 50%;
    transform: translateX(-50%);
    top: 230px;
  }
  &.third {
    width: 500px;
    height: 500px;
    right: -150px;
    top: 663px;
    opacity: 0.6;
    filter: blur(30px);
  }
  &.four {
    top: -205px;
    left: 0;
    width: 520px;
    height: 398px;
  }
  &.five {
    bottom: -100px;
    right: -164px;
    width: 520px;
    height: 398px;
  }
`
const Title = styled.div`
  width: 100%;
  height: 82px;
  text-align: center;
  font-family: 'FZLanTingHeiS-B-GB';
  font-style: normal;
  font-size: 72px;
  line-height: 82px;
  align-items: flex-end;
  text-align: center;
  background: linear-gradient(92.51deg, #808080 0.37%, #151515 51.61%, #7c7c7c 99.14%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`
const MarketBtn = styled.div`
  width: 240px;
  height: 72px;
  line-height: 72px;
  margin: 60px auto 895px;
  padding: 0 56px;
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 600;
  font-size: 32px;
  color: #ffffff;
  background: linear-gradient(285.68deg, #ff5b36 6.56%, #ffb74a 98.03%);
  position: relative;
  cursor: pointer;
  z-index: 2;
`
const IdoCont = styled.div`
  width: 1400px;
  height: auto;
  margin: 0 auto;
  margin-bottom: 120px;
  position: relative;
`
const Card = styled.div`
  width: 640px;
  height: 702px;
  /* padding-bottom: 56px; */
  background: rgba(255, 255, 255, 0.7);
  padding: 0 60px;
  display: inline-block;
  position: relative;
  z-index: 2;
  &:first-child {
    margin-right: 120px;
  }
`
const Top = styled.div`
  height: 250px;
  line-height: 250px;
  width: 100%;
  border-bottom: 1px dashed #ffb233;
`
const Icon = styled.img`
  width: 179px;
  height: 183px;
`
const IdoTitle = styled.div`
  font-family: 'PingFang SC';
  font-weight: 600;
  font-size: 36px;
  display: flex;
  align-items: flex-end;
  text-align: center;
  color: #ff8c14;
  float: right;
`
const IdoTitles = styled.div`
  width: 100%;
  text-align: center;
  font-family: 'PingFang SC';
  font-weight: 600;
  font-size: 36px;
  color: #ff8c14;
`
const Content = styled.div`
  padding-top: 33px;
`
const Line = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`
const Label = styled.div`
  font-family: 'PingFang SC';
  font-size: 22px;
  line-height: 31px;
  color: #000000;
`
const ContFont = styled.div`
  font-family: 'PingFang SC';
  font-weight: 600;
  font-size: 22px;
  line-height: 31px;
  text-align: right;
  color: #000000;
`
const Btn = styled.div`
  height: 64px;
  padding: 0 70px;
  line-height: 64px;
  display: inline-block;
  margin: 32px auto 0;
  background: linear-gradient(285.68deg, #ff5b36 6.56%, #ffb74a 98.03%);
  font-family: 'PingFang SC';
  font-size: 20px;
  color: #ffffff;
  position: relative;
  cursor: pointer;
  left: 50%;
  transform: translateX(-50%);
`

const Invite = styled.div`
  width: 100%;
  height: 144px;
  line-height: 144px;
  background: linear-gradient(285.68deg, #ff5b36 6.56%, #ffb74a 98.03%);
  position: relative;
  z-index: 3;
`
const InviteCont = styled.div`
  width: 1440px;
  height: 100%;
  margin: 0 auto;
  color: #ffffff;
  font-family: 'PingFang SC';
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Left = styled.div`
  font-weight: 600;
  font-size: 32px;
  display: flex;
  align-items: center;
`
const MyLink = styled.div`
  font-size: 32px;
  line-height: 45px;
  letter-spacing: 0.1em;
  padding: 10px 24px;
  border: 1px solid #ffffff;
  margin: 0 32px;
`
const CopyIcon = styled.img`
  width: 44px;
  height: 44px;
  cursor: pointer;
`
const Right = styled.div`
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 34px;
`
const PeopleNum = styled.div`
    display: inline-block;
    margin-right: 64px;
`
const RewardCount = styled.div`
    display: inline-block;
`
export default idoCard
