import { FC, ReactElement, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useAccount } from 'wagmi'
import { useTranslation } from '@pancakeswap/localization'
import { useRouter } from 'next/router';
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useToast, Button } from '@pancakeswap/uikit'
import { useGasPrice } from 'state/user/hooks'
import { copyText } from '@pancakeswap/utils/copyText'
import { BOOSTED_FARM_GAS_LIMIT } from 'config'
import { ToastDescriptionWithTx } from 'components/Toast'
import useCatchTxError from 'hooks/useCatchTxError'
import { $shiftedBy, $toFixed } from 'utils/met'
import { useERC20, useTokenContract, useOrgbundrebate, useOrgIdo } from 'hooks/useContract'

const options = {
  gasLimit: BOOSTED_FARM_GAS_LIMIT,
}
const $hash = (txHash, length = 4, lastLength = 6) => {
  if (!txHash) {
    return '--'
  }
  // eslint-disable-next-line no-param-reassign
  if (!lastLength) lastLength = length
  return `${txHash.substring(0, length)}...${txHash.substring(txHash.length - lastLength, txHash.length)}`
}
const IdoCard: FC<any> = (): ReactElement => {
  const {currentLanguage, t } = useTranslation()
  const { address: account } = useAccount()
  const { chainId } = useActiveWeb3React()
  const gasPrice = useGasPrice()
  const router = useRouter();
  const { toastSuccess } = useToast()
  const { fetchWithCatchTxError } = useCatchTxError()

  const [loading, setLoading] = useState<boolean>(false)
  const [whiteLoading, setWhiteLoading] = useState<boolean>(false)

  const [retailidonum, setRetailidonum] = useState(0)
  const [maxretailidonum, setMaxretailidonum] = useState(0)
  const [orgprice, setOrgprice] = useState(0)
  const [whiteidonum, setWhiteidonum] = useState(0)
  const [maxwhiteidonum, setMaxwhiteidonum] = useState(0)
  const [money, setMoney] = useState<number>(0)
  const [inviterNum, setInviterNum] = useState<number>(0)
  const isStart = false

  const orgIdo = {
    56: '',
    97: '0x33d98E94e133BC82E52B430dEc41C660a9049D51',
    201022:'0x7F273BAb19c7735489dDA0898Cd5b46A9455fE1a',
  }
  const orgbundrebate = {
    56: '',
    97: '0xb0410bfdC49e4c101A5C82dEAB6187db76E40eC3',
    201022:'0x6C078d5B60674f071f158A09818a461778D538E6',
  }

  const rebateContract = useOrgbundrebate(orgbundrebate[chainId])
  const orgIdoContract = useOrgIdo(orgIdo[chainId])

  const goretailido = async () => {
    try {
      setLoading(true)
      const receipt = await fetchWithCatchTxError(() => {
        return orgIdoContract.goretailido({ ...options, gasPrice })
      })
      if (receipt?.status) {
        toastSuccess(
          `Successed!`,
          <ToastDescriptionWithTx txHash={receipt.transactionHash}>{t('Participate in the success')}</ToastDescriptionWithTx>,
        )
      }
      setLoading(false)
    } catch (e) {
      setLoading(false)
      console.error('goretailido Error', e)
    }
  }
  const gowhiteido = async () => {
    try {
      setWhiteLoading(true)
      const receipt = await fetchWithCatchTxError(() => {
        return orgIdoContract.gowhiteido({ ...options, gasPrice })
      })
      if (receipt?.status) {
        toastSuccess(
          `Successed!`,
          <ToastDescriptionWithTx txHash={receipt.transactionHash}>{t('Participate in the success')}</ToastDescriptionWithTx>,
        )
      }
      setWhiteLoading(false)
    } catch (e) {
      setWhiteLoading(false)
      console.error('gowhiteido Error', e)
    }
  }

  const getReward = async () => {
    const result = await rebateContract.reward(account)
    setMoney($shiftedBy(result.toString(), -18, 6))
  }
  const getInviterNum = async () => {
    const result = await rebateContract.getinvitelistlen(account)
    setInviterNum(result.toString())
  }

  const getRetailidonum = async () => {
    const result = await orgIdoContract.retailidonum()
    setRetailidonum(result.toString())
  }
  const getMaxretailidonum = async () => {
    const result = await orgIdoContract.maxretailidonum()
    setMaxretailidonum(result.toString())
  }
  const getWhiteidonum = async () => {
    const result = await orgIdoContract.whiteidonum()
    setWhiteidonum(result.toString())
  }
  const getMaxwhiteidonum = async () => {
    const result = await orgIdoContract.maxwhiteidonum()
    setMaxwhiteidonum(result.toString())
  }
  const getOrgprice = async () => {
    const result = await orgIdoContract.orgprice()
    setOrgprice(result.toString() * 0.01)
  }

  const copyEvent = () => {
    copyText(`https://orangeswap.org/swap?shareid=${account}`)
    toastSuccess(`success`, 'Copy Successfly')
  }

  useEffect(() => {
    if (orgIdoContract && chainId && account) {
      getRetailidonum()
      getMaxretailidonum()
      getWhiteidonum()
      getMaxwhiteidonum()
      getOrgprice()
      getReward()
      getInviterNum()
    }
  }, [orgIdoContract, chainId, account])

  return (
    <Main>
      <Imgs className="frist" src="/images/ido/first_bg.png" />
      <Imgs className="second" src="/images/ido/orgpeople1.png" />
      <Imgs className="third" src="/images/ido/third_bg.png" />

      <Title>IDO:Initial Digital Assects Offering</Title>
      <Tip>{t('Purchase a new token initiated on the FSC public chain')} </Tip>
      <MarketBtn onClick={()=> {
        if(document){
          const element = document.getElementById("market")
          element.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
        }
      }}>{t('mode of operation')}</MarketBtn>
      <IdoCont>
        <Card>
          <Top>
            {!isStart ? (
              <>
                <Icon src="/images/ido/orange.png" />
                <IdoTitle>{t('IDO has not started')}</IdoTitle>
              </>
            ) : (
              <IdoTitles>{t('IDO has not started')}</IdoTitles>
            )}
          </Top>
          <Content>
            <Line>
              <Label>{t('Maximum token input')}(USDT)</Label>
              <ContFont>
                <BtnUsdt>200U</BtnUsdt>
              </ContFont>
            </Line>
            <Line>
              <Label>{t('Total amount submitted')}</Label>
              <ContFont>
                {retailidonum} USDT
                <br />
                ({ Number(maxretailidonum) !== 0 ? $toFixed(retailidonum / maxretailidonum , 2) : 0 })%
              </ContFont>
            </Line>
            <Line>
              <Label>{t('Money to be raised')}</Label>
              <ContFont>{maxretailidonum} USDT</ContFont>
            </Line>
            <Line>
              <Label>{t('Price per ORG')}</Label>
              <ContFont>${orgprice}</ContFont>
            </Line>
          </Content>
          <Button className="_claimBtn" isLoading={loading} onClick={() => goretailido()}>
          {t('Confirm to participate in')}
          </Button>
        </Card>
        <Card>
          <Top>
            {isStart ? (
              <>
                <Icon src="/images/ido/click.png" />
                <IdoTitle>{t('IDO has not started')}</IdoTitle>
              </>
            ) : (
              <IdoTitles>{t('Whitelist Sale')}</IdoTitles>
            )}
          </Top>
          <Content>
            <Line>
              <Label>{t('Maximum token input')}(USDT)</Label>
              <ContFont>
                <BtnUsdt>200U</BtnUsdt>
              </ContFont>
            </Line>
            <Line>
              <Label>{t('Total amount submitted')}</Label>
              <ContFont>
                {whiteidonum} USDT
                <br />
                ({Number(maxwhiteidonum) !== 0 ? $toFixed(whiteidonum / maxwhiteidonum , 2) : 0}%)
              </ContFont>
            </Line>
            <Line>
              <Label>{t('Money to be raised')}</Label>
              <ContFont>{maxwhiteidonum} USDT</ContFont>
            </Line>
            <Line>
              <Label>{t('Price per ORG')}</Label>
              <ContFont>${orgprice}</ContFont>
            </Line>
          </Content>
          <Button className="_claimBtn" isLoading={whiteLoading} onClick={() => gowhiteido()}>
            {isStart ? t('Confirm to participate in') : t('Confirm authorization')}
          </Button>
        </Card>
        <Imgs className="four" src="/images/ido/four_bg.png" />
        <Imgs className="five" src="/images/ido/five_bg.png" />
      </IdoCont>
      <Invite>
        <InviteCont >
          <Left currentLanguage={currentLanguage.locale}>
          {t('My invitation link')}
            <MyLink>{$hash(`https://orangeswap.org/swap?shareid=${account}`, 15, 10)}</MyLink>
            <CopyIcon
              src="/images/ido/copy.svg"
              onClick={() => copyEvent()}
            />
          </Left>
          <Right>
            <PeopleNum>
            {t('Number of People invited')} <b>:</b> <span>{inviterNum}</span>
            </PeopleNum>
            <RewardCount>
            {t('My reward')} <b>:</b> <span>{money} ORG</span>
            </RewardCount>
          </Right>
          <InviteBtn onClick={()=>router.push('/rebate')}>{t('My invitation link')}</InviteBtn>
        </InviteCont>
      </Invite>
    </Main>
  )
}

const Main = styled.div`
  width: 100%;
  overflow-x: hidden;
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
  @media (max-width: 768px) {
    padding-top: 40px;
    &::after {
      display: none;
    }
  }
`

const Imgs = styled.img`
  position: absolute;
  @media (max-width: 768px) {
    position: relative;
  }
  &.frist {
    top: 0;
    left: 0;
    height: 290px;
    left: 0px;
    top: 130px;
    @media (max-width: 768px) {
      display: none;
    }
  }
  &.second {
    width: 314px;
    height: 514px;
    left: 50%;
    transform: translateX(-50%);
    top: 400px;
    @media (max-width: 768px) {
      width: 100px;
      height: 150px;
      top: 30px;
      bottom: 10px;
      margin-bottom: 12px;
    }
  }
  &.third {
    height: 500px;
    right: 0px;
    top: 663px;
    @media (max-width: 768px) {
      display: none;
    }
  }
  &.four {
    top: -205px;
    left: 0;
    width: 520px;
    height: 398px;
    @media (max-width: 768px) {
      display: none;
    }
  }
  &.five {
    bottom: -100px;
    right: -164px;
    width: 520px;
    height: 398px;
    @media (max-width: 768px) {
      display: none;
    }
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
  @media (max-width: 768px) {
    font-size: 24px;
    line-height: 34px;
    padding: 15px 28px;
    color: #121211;
  }
`
const Tip = styled.p`
  display: none;
  @media (max-width: 768px) {
    display: block;
    font-family: 'PingFang SC';
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    text-align: center;
    color: #121211;
    margin-top: 13px;
  }
`
const MarketBtn = styled.div`
  display: inline-block;
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
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
  z-index: 2;
  @media (max-width: 768px) {
    height: 40px;
    line-height: 40px;
    width: auto;
    padding: 0 49px;
    font-size: 16px;
    border-radius: 28.5px;
    display: inline-block;
    margin: 18px auto 40px;
    left: 50%;
    transform: translateX(-50%);
  }
`
const IdoCont = styled.div`
  width: 1400px;
  height: auto;
  margin: 0 auto;
  margin-bottom: 120px;
  position: relative;
  @media (max-width: 768px) {
    width: 100%;
    padding: 0 20px;
    margin-bottom: 32px;
  }
`
const Card = styled.div`
  width: 640px;
  height: 702px;
  background: rgba(255, 255, 255, 0.7);
  padding: 0 60px;
  display: inline-block;
  position: relative;
  z-index: 2;
  &:first-child {
    margin-right: 120px;
  }
  ._claimBtn {
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
    left: 50%;
    transform: translateX(-50%);
    letter-spacing: 0;
  }
  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    padding: 0 0 32px;
    border-radius: 16px;
    &:first-child {
      margin-right: 0;
      margin-bottom: 32px;
    }
    ._claimBtn {
      margin: 0 auto;
      height: 40px;
      line-height: 40px;
      padding: 0 46px;
      font-size: 16px;
      border-radius: 28.5px;
      min-width: 188px;
      text-align: center;
    }
  }
`
const Top = styled.div`
  height: 250px;
  line-height: 250px;
  width: 100%;
  border-bottom: 1px dashed #ffb233;
  position: relative;
  @media (max-width: 768px) {
    height: auto;
    display: flex;
    padding: 20px 0;
    flex-direction: column;
    align-items: center;
  }
`
const Icon = styled.img`
  width: 180px;
  height: 183px;
  /* margin: 30px 30px 20px 50px; */
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0px;
  @media (max-width: 768px) {
    width: 110px;
    height: 87px;
  }
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
  @media (max-width: 768px) {
    font-size: 20px;
    line-height: 28px;
  }
`
const IdoTitles = styled.div`
  width: 100%;
  text-align: center;
  font-family: 'PingFang SC';
  font-weight: 600;
  font-size: 36px;
  color: #ff8c14;
  @media (max-width: 768px) {
    font-size: 20px;
    line-height: 28px;
    padding: 4px 0;
  }
`
const Content = styled.div`
  padding-top: 33px;
  @media (max-width: 768px) {
    width: 100%;
    padding: 33px 20px;
  }
`
const Line = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  @media (max-width: 768px) {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0px;
    }
  }
`
const Label = styled.div`
  font-family: 'PingFang SC';
  font-size: 22px;
  line-height: 31px;
  color: #000000;
  @media (max-width: 768px) {
    font-size: 14px;
    line-height: 20px;
  }
`
const ContFont = styled.div`
  font-family: 'PingFang SC';
  font-weight: 600;
  font-size: 22px;
  line-height: 31px;
  text-align: right;
  color: #000000;
  @media (max-width: 768px) {
    font-size: 14px;
    line-height: 20px;
  }
`
const BtnUsdt = styled.div`
  width: 160px;
  height: 48px;
  line-height: 48px;
  background: linear-gradient(285.68deg, #ff5b36 6.56%, #ffb74a 98.03%);
  font-family: 'PingFang SC';
  font-weight: 600;
  font-size: 22px;
  text-align: center;
  color: #ffffff;
  @media (max-width: 768px) {
    width: 80px;
    height: 32px;
    line-height: 32px;
    background: #ffae32;
    border-radius: 16px;
    font-size: 14px;
  }
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
  @media (max-width: 768px) {
    margin: 0 auto;
    height: 40px;
    line-height: 40px;
    padding: 0 46px;
    font-size: 16px;
    border-radius: 28.5px;
    min-width: 188px;
    text-align: center;
  }
`

const Invite = styled.div`
  width: 100%;
  height: 144px;
  line-height: 144px;
  background: linear-gradient(285.68deg, #ff5b36 6.56%, #ffb74a 98.03%);
  position: relative;
  z-index: 3;
  @media (max-width: 768px) {
    height: auto;
    line-height: auto;
    background: none;
    padding: 0 20px;
  }
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
  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    padding: 34px 32px 32px;
    display: block;
    background: #ffffff;
    border-radius: 16px;
  }
`

const Left = styled.div.attrs((props:any)=>({currentLanguage: props.currentLanguage}))`
  font-weight: 600;
  font-size: ${(props:any)=> props.currentLanguage === 'en-US' ? '22px' : '32px'};
  display: flex;
  align-items: center;
  @media (max-width: 768px) {
    display: none;
  }
`
const MyLink = styled.div`
  font-size: 32px;
  line-height: 45px;
  letter-spacing: 0.1em;
  padding: 10px 24px;
  border: 1px solid #ffffff;
  margin: 0 32px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
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
  @media (max-width: 768px) {
    font-size: 14px;
    line-height: 25px;
    color: #000000;
    b {
      display: none;
    }
  }
`
const PeopleNum = styled.div`
  display: inline-block;
  margin-right: 64px;
  @media (max-width: 768px) {
    display: block;
    margin-right: 0px;
    span {
      float: right;
      display: flex;
      align-items: flex-end;
      text-align: center;
      font-size: 18px;

      background: linear-gradient(180deg, #ffaa33 0%, #ff6c43 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
`
const RewardCount = styled.div`
  display: inline-block;
  @media (max-width: 768px) {
    display: block;
    margin: 28px 0 32px;
    span {
      float: right;
      display: flex;
      align-items: flex-end;
      text-align: center;
      font-size: 18px;
      background: linear-gradient(180deg, #ffaa33 0%, #ff6c43 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
`
const InviteBtn = styled.div`
  display: none;
  @media (max-width: 768px) {
    height: 40px;
    line-height: 40px;
    padding: 0 46px;
    font-size: 16px;
    color: #ffffff;
    font-family: 'PingFang SC';
    display: block;
    background: linear-gradient(285.68deg, #ff5b36 6.56%, #ffb74a 98.03%);
    border-radius: 28.5px;
    position: relative;
    cursor: pointer;
    left: 50%;
    transform: translateX(-50%);
    width: 188px;
    text-align: center;
  }
`
export default IdoCard
