import { FC, ReactElement, useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import styled from 'styled-components'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useAccount } from 'wagmi'
import { $toFixed } from 'utils/met'
import { useOrgbundrebate } from 'hooks/useContract'
import { useTranslation } from '@pancakeswap/localization'


const BaseMain: FC = (): ReactElement => {
  const { address: account } = useAccount()
  const { chainId } = useActiveWeb3React()
  const router = useRouter();
  const { t } = useTranslation()
  const [info, setInfo] = useState({
    usernum: 0,
    tradenum: 0,
    impawnnum: 0,
  })

  const orgbundrebate = {
    56: '',
    97: '0xb0410bfdC49e4c101A5C82dEAB6187db76E40eC3',
    201022:'0x6C078d5B60674f071f158A09818a461778D538E6',
  }
  const rebateContract = useOrgbundrebate(orgbundrebate[chainId])
  const calc = (value: number): any => {
    let _val:any = '0';
    if(value < 1000){
        _val = $toFixed(value, 2)
    }else if(value > 1000 && value < 1000 * 1000){
        _val = `${$toFixed(value / 1000,2)}K`
    }else{
        _val = `${$toFixed(value / 1000 / 1000, 2)}M`
    }
    return _val
}

  const getData = async () => {
    const _usernum = await rebateContract.usernum();
    const _tradenum = await rebateContract.tradenum();
    const _impawnnum = await rebateContract.impawnnum();
    setInfo({
      usernum: _usernum.toString(),
      tradenum: calc(_tradenum.toString()),
      impawnnum: calc(_impawnnum.toString()),
    })
  }
  useEffect(() => {
    if (rebateContract && chainId && account) {
      getData()
    }
  }, [rebateContract, chainId, account])
  return (
    <Main>
      <Top>
        <Start>{t('Coming soon')}</Start>
        <OrgImg src="/images/base/orgidos.png" />
        <TopImg src="/images/base/banner2.png" />
        <TopCont>
          <Btn onClick={()=> router.push('/ido')}>GO</Btn>
          <Arrow src="/images/base/arrow.svg" />
          <Join>{t('Get involved now')}</Join>
        </TopCont>
      </Top>
      <Notice>
        <NoticeContent>
          <NoticeTitle>{t('Trade, earn and win cryptocurrencies on the most popular decentralized platform in the FSC public chain.')}</NoticeTitle>
          <Right>
            <ConnectWallet>
              <Icon src="/images/base/wallet.svg" />
              {t('Connect')}
            </ConnectWallet>
            <ConnectWallet onClick={()=> router.push('/swap')}>
              <Icon src="/images/base/change.svg" />
              {t('Trade now')}
            </ConnectWallet>
          </Right>
        </NoticeContent>
      </Notice>
      <Content>
        <FoliageIcon className="frist" src="/images/base/showFoliage.png" />
        <FoliageIcon className="two" src="/images/base/foliage.png" />
        <FoliageIcon className="thri" src="/images/base/showFoliage.png" />
        <FoliageIcon className="four" src="/images/base/foliage.png" />
        <Title className="pc">{t('millions of users')}{t('billions of transactions')}</Title>
        <Title className="mobile">
        {t('millions of users')}
          <br />
        {t('billions of transactions')}
        </Title>

        <Tip>{t('Of all the decentralized platforms, Orange Swap has the most users. These users are now entrusting more than hundreds of millions of dollars to the platform')}</Tip>
        <Lib>{t('Will you join them?')}</Lib>

        <CartContent>
          <User>
            <CartIcon src="/images/base/users.png" />
            <CartTitle>{info.usernum}{t('user')}</CartTitle>
            <CartTip>{t('Within the last 30 days')}</CartTip>
          </User>
          <Change>
            <CartIcon src="/images/base/change.png" />
            <CartTitle>{info.tradenum}{t('transaction')}</CartTitle>
            <CartTip>{t('Within the last 30 days')}</CartTip>
          </Change>
          <Amount>
            <CartIcon src="/images/base/amount.png" />
            <CartTitle>{t('Staked')}{info.impawnnum}{t('Dollar')}</CartTitle>
            <CartTip>{t('The total locked')}</CartTip>
          </Amount>
        </CartContent>

        <Introduce>
          <Libs>
            <FontCont>
              <Illustrate>
              {t('Trade any token')}
                <br />
              {t('No register, no hassle')}
              </Illustrate>
              <IntroduceTip>{t('Connect your wallet and trade any token on the FSC chain.')}</IntroduceTip>
              <Btns>
                <LibsBtn onClick={()=> router.push('/swap')}>{t('Trade now')}</LibsBtn>
                <LibsBtn><a href="https://orange-swap.gitbook.io/orange-swap-1/" target='_blank' rel="noreferrer">{t('understand')}</a></LibsBtn>
              </Btns>
            </FontCont>
            <Imgs src="/images/base/exchange.png" />
          </Libs>
          <Libs>
            <FontCont>
              <Illustrate>
              {t('With cryptocurrency Passive')}
                <br />
              {t('Earn income')}
              </Illustrate>
              <IntroduceTip>Orange Swap{t('It allows you enjoying the benefits that cryptocurrencies bring.')}</IntroduceTip>
              <Btns>
                <LibsBtn>{t('explore')}</LibsBtn>
                <LibsBtn><a href="https://orange-swap.gitbook.io/orange-swap-1/" target='_blank' rel="noreferrer">{t('understand')}</a></LibsBtn>
              </Btns>
            </FontCont>
            <Imgs className='search' src="/images/base/search.png" />
          </Libs>
          <Libs>
            <FontCont>
              <Illustrate>
                {t('ORG makes our world')}
                <br />
                {t('Get moving')}
              </Illustrate>
              <IntroduceTip>{t('Connect your wallet and trade any token on the FSC chain.')}</IntroduceTip>
              <Btns>
                <LibsBtn onClick={()=> router.push('/swap')}>{t('Buy ORG')}</LibsBtn>
                <LibsBtn><a href="https://orange-swap.gitbook.io/orange-swap-1/" target='_blank' rel="noreferrer">{t('understand')}</a></LibsBtn>
              </Btns>
            </FontCont>
            <Imgs className='grod' src="/images/base/grod.png" />
          </Libs>
        </Introduce>
      </Content>
    </Main>
  )
}

const Main = styled.div`
  width: 1440px;
  overflow-x: hidden;
  padding-top: 45px;
  position: relative;
  @media (max-width: 768px) {
    width: 100%;
    padding-top: 62px;
  }
`
const Top = styled.div`
  width: 100%;
  position: relative;
  height: 904px;
  @media (max-width: 768px) {
    height: auto;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 96px;
  }
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
  @media (max-width: 768px) {
    font-size: 36px;
    line-height: 41px;
    padding-top: 0px;
    text-align: center;
  }
`
const OrgImg = styled.img`
  width: 664px;
  margin: 64px 0 102px;
  position: relative;
  left: -40px;
  @media (max-width: 768px) {
    width: 243px;
    height: 101px;
    margin: 0;
    left: 0px;
  }
`
const TopCont = styled.div`
  height: 90px;
  display: flex;
  align-items: center;
  @media (max-width: 768px) {
    display: inline-block;
    height: 40px;
    margin-top: 20px;
  }
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
  transition: all 0.2s;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
  @media (max-width: 768px) {
    width: 160px;
    height: 40px;
    line-height: 40px;
    font-size: 18px;
    display: inline-block;
  }
`
const Arrow = styled.img`
  width: 44px;
  height: 32px;
  margin: 0 32px;
  @media (max-width: 768px) {
    width: 22px;
    height: 14px;
    margin: 0 4px;
    display: inline-block;
  }
`
const Join = styled.div`
  font-family: 'PingFang SC';
  font-size: 22px;
  line-height: 31px;
  color: #151515;
  @media (max-width: 768px) {
    display: none;
  }
`
const TopImg = styled.img`
  width: 529px;
  height: 635px;
  position: absolute;
  right: 80px;
  top: 50%;
  transform: translateY(-50%);
  @media (max-width: 768px) {
    width: 220px;
    height: 250px;
    position: relative;
    right: 0;
    top: 120px;
    margin: 12px 0 10px;
  }
`

const Notice = styled.div`
  position: fixed;
  left: 0;
  top: 1063px;
  width: 100%;
  height: 160px;
  background: linear-gradient(285.68deg, #ff5b36 6.56%, #ffb74a 98.03%);
  z-index: 3;
  min-width: 1440px;
  @media (max-width: 768px) {
    position: relative;
    left: 0;
    top: 0px;
    min-width: 100%;
    width: 100%;
    height: auto;
    padding: 20px;
    box-sizing: border-box;
  }
`
const NoticeContent = styled.div`
  width: 1430px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    display: block;
  }
`
const NoticeTitle = styled.div`
  font-family: 'PingFang SC';
  font-size: 32px;
  line-height: 45px;
  letter-spacing: 0.1em;
  color: #ffffff;
  width: 808px;
  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    display: block;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0em;
  }
`
const Right = styled.div`
  width: 484px;
  height: 61px;
  display: flex;
  @media (max-width: 768px) {
    width: 100%;
    margin-top: 12px;
    text-align: right;
    display: block;
    height: auto;
  }
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
  transition: all 0.2s;
  cursor: pointer;
  &:hover {
    opacity: 0.6;
  }
  &:first-child {
    margin-right: 36px;
  }
  @media (max-width: 768px) {
    padding: 6px 12px;
    font-size: 12px;
    line-height: 17px;
    height: auto;
    box-sizing: border-box;
    display: inline-block;
    &:first-child {
      display: none;
    }
  }
`
const Icon = styled.img`
  width: 32px;
  height: 32px;
  margin-right: 19px;
  position: relative;
  top: 5px;
  @media (max-width: 768px) {
    width: 14px;
    height: 14px;
    margin-right: 8px;
    top: 2px;
  }
`

const Content = styled.div`
  width: 100%;
  min-height: 1000px;
  padding-top: 493px;
  position: relative;
  @media (max-width: 768px) {
    padding-top: 96px;
    min-height: auto;
  }
`
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
    @media (max-width: 768px) {
      width: 292px;
      height: 292px;
      top: 131px;
      right: -130px;
      opacity: 0.5;
      filter: blur(10px);
    }
  }
  &.two {
    top: 595px;
    left: 9px;
    width: 69px;
    height: 69px;
    box-shadow: 4px 4px 20px rgba(0, 0, 0, 0.1);
    @media (max-width: 768px) {
      width: 61.18px;
      height: 61.18px;
      top: 133px;
      left: -20px;
    }
  }
  &.thri {
    top: 775px;
    left: 317px;
    width: 195.47px;
    height: 195.47px;
    box-shadow: 4px 4px 20px rgba(0, 0, 0, 0.1);
    transform: rotate(-20.87deg);
    opacity: 0.5;
    @media (max-width: 768px) {
      display: none;
    }
  }
  &.four {
    top: 769px;
    right: 26px;
    width: 121px;
    height: 121px;
    box-shadow: 4px 4px 20px rgba(0, 0, 0, 0.1);
    transform: rotate(-34.89deg);
    @media (max-width: 768px) {
      display: none;
    }
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
  &.mobile {
    display: none;
  }
  @media (max-width: 768px) {
    /* padding-top: 96px; */
    min-height: auto;
    text-align: center;
    font-size: 32px;
    line-height: 37px;
    &.mobile {
      display: block;
    }
    &.pc {
      display: none;
    }
  }
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
  @media (max-width: 768px) {
    width: 68%;
    text-align: center;
    display: block;
    margin-top: 42px;
    font-size: 14px;
    line-height: 20px;
    margin: 32px 0 16px;
  }
`
const Lib = styled.p`
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 600;
  font-size: 22px;
  line-height: 31px;
  text-align: center;
  color: #151515;
  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
    display: block;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
  }
`

const CartContent = styled.div`
  margin-top: 108px;
  width: 100%;
  height: 596px;
  overflow: hidden;
  display: flex;
  text-align: center;

  @media (max-width: 768px) {
    margin-top: 49px;
    height: auto;
    display: block;
    position: relative;
  }
`
const User = styled.div`
  flex: 1;
  padding-top: 145px;
  position: relative;
  img {
    margin-top: 108px !important;
  }
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 594px;
    top: 145px;
    left: 0;
    background: url('/images/base/user_bg.png') no-repeat;
    background-size: 100% 100%;
  }
  @media (max-width: 768px) {
    padding-top: 0px;
    height: auto;
    display: block;
    width: 168px;
    height: 220px;
    img {
      margin-top: 28px !important;
      position: relative;
      z-index: 3;
    }
    &::before {
      top: 0;
      left: -14px;
      width: 206px;
      height: 220px;
      border: solid 12px transparent;
      border-radius: 0 36px 36px 0;

      background-image: linear-gradient(#fff, #fff),
        linear-gradient(to right, rgba(255, 238, 199, 1), rgba(255, 165, 143, 1), rgba(255, 187, 149, 1));

      background-origin: border-box;

      background-clip: content-box, border-box;
    }
  }
`
const Change = styled.div`
  flex: 1;
  background: #ffffff;
  position: relative;
  z-index: 2;
  padding-top: 59px;
  @media (max-width: 768px) {
    width: 182px;
    top: 150px;
    right: 0;
    height: 182px;
    padding-top: 28px;
    position: absolute;
    border-radius: 26px;
  }
`
const Amount = styled.div`
  flex: 1;
  padding-top: 145px;
  position: relative;
  img {
    margin-top: 108px !important;
  }
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 594px;
    top: 145px;
    left: 0;
    background: url('/images/base/zhiya.png') no-repeat;
    background-size: 100% 100%;
  }

  @media (max-width: 768px) {
    padding-top: 0px;
    height: auto;
    display: block;
    width: 168px;
    height: 220px;
    margin-top: 48px;
    img {
      margin-top: 28px !important;
      position: relative;
      z-index: 3;
    }
    &::before {
      top: 0;
      left: -14px;
      width: 206px;
      height: 220px;
      border: solid 12px transparent;
      border-radius: 0 36px 36px 0;

      background-image: linear-gradient(#fff, #fff),
        linear-gradient(to right, rgba(228, 102, 239, 1), rgba(249, 114, 212, 1), rgba(155, 132, 255, 1));

      background-origin: border-box;

      background-clip: content-box, border-box;
    }
  }
`
const CartIcon = styled.img`
  height: 148px;
  @media (max-width: 768px) {
    height: 60px;
  }
`
const CartTitle = styled.h5`
  font-family: 'FZLanTingHeiS-B-GB';
  font-style: normal;
  font-weight: 400;
  width: 100%;
  font-size: 36px;
  line-height: 41px;
  /* display: flex; */
  align-items: flex-end;
  background: linear-gradient(92.51deg, #2c2c2c 0.37%, #6b6b6b 99.14%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 56px 0 28px;
  text-align: center;
  @media (max-width: 768px) {
    width: 130px;
    font-size: 16px;
    line-height: 18px;
    margin: 20px auto 8px;
    text-align: center;
    position: relative;
    z-index: 3;
  }
`
const CartTip = styled.p`
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 400;
  width: 100%;
  font-size: 22px;
  line-height: 31px;
  color: #151515;
  text-align: center;
  @media (max-width: 768px) {
    font-size: 12px;
    line-height: 17px;
    position: relative;
    z-index: 3;
  }
`

const Introduce = styled.div`
  padding: 118px 0 149px;
  width: 100%;
  @media (max-width: 768px) {
    padding: 96px 75px 260px 20px;
  }
`
const Libs = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  &:first-child {
    position: relative;
    left: 100px;
  }
  &:nth-of-type(2) {
    flex-direction: row-reverse;
    margin: 60px 0 68px;
    text-align: right;
  }
  /* img {
    width: 743px;
    height: 743px;
  } */
  @media (max-width: 768px) {
    display: block;
    margin-bottom: 96px;
    &:first-child {
      position: relative;
      left: 0;
      img {
        position: absolute;
        right: -100px;
        top: -145px;
        width: 200px;
        height: auto;
      }
    }
    &:nth-of-type(2) {
      position: relative;
      left: 0;
      text-align: left;
      img {
        position: absolute;
        width: 292px;
        height: auto;
        left: 60%;
        top: 517px;
        transform: translateX(-50%);
      }
    }
    &:last-child {
      position: relative;
      left: 0;
      img {
        position: absolute;
        right: -130px;
        top: -162px;
        width: 150px;
        height: auto;
      }
    }
  }
`
const FontCont = styled.div`
  flex: 1;
`
const Illustrate = styled.div`
  font-family: 'FZLanTingHeiS-B-GB';
  font-style: normal;
  font-weight: 400;
  font-size: 72px;
  line-height: 82px;
  background: linear-gradient(92.51deg, #151515 0.37%, #818181 50.27%, #151515 99.14%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  @media (max-width: 768px) {
    font-size: 32px;
    line-height: 37px;
  }
`
const IntroduceTip = styled.div`
  margin: 24px 0 48px;
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 400;
  font-size: 22px;
  line-height: 31px;
  color: #151515;
  @media (max-width: 768px) {
    margin: 32px 0 20px;
    font-size: 14px;
    line-height: 20px;
  }
`
const Btns = styled.div``
const LibsBtn = styled.div`
  width: 220px;
  height: 64px;
  line-height: 64px;
  left: 240px;
  top: 3157px;
  display: inline-block;
  text-align: center;
  background: linear-gradient(285.68deg, #ff5b36 6.56%, #ffb74a 98.03%);
  font-family: 'PingFang SC';
  font-style: normal;
  font-size: 20px;
  color: #ffffff;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    opacity: 0.8;
  }
  &:last-child {
    margin-left: 32px;
    color: #151515;
    background: #ffffff;
    &:hover {
      opacity: 0.6;
    }
  }
  @media (max-width: 768px) {
    height: 36px;
    line-height: 36px;
    width: 96px;
    font-size: 14px;
    &:last-child {
      margin-left: 0;
      background: rgba(255, 255, 255, 0);
    }
  }
`
const Imgs = styled.img`
  width: 743px;
  height: 743px;
  &.search{
    width: 603px;
    height: 569px;
  }
  &.grod{
    width: 534px;
    height: 534px;
  }
  /* @media (max-width: 768px) {
    width: 112px;
    height: 134px;
    &.search{
      width: 603px;
      height: 569px;
    }
    &.grod{
      width: 534px;
      height: 534px;
    }
  } */
`

export default BaseMain
