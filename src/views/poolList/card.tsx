import { FC, ReactElement, useEffect, useState, useMemo } from 'react'
import styled from 'styled-components'
import { useAccount } from 'wagmi'
import { useToast, Button } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import { $shiftedBy, $shiftedByFixed, $BigNumber, $toFixed } from 'utils/met'
import { ToastDescriptionWithTx } from 'components/Toast'
import useCatchTxError from 'hooks/useCatchTxError'
import { useERC20 } from 'hooks/useContract'
import ReactDOM from 'react-dom'

const clearNoNum = (val: string) => {
  let _val = val.replace(/[^\d.]/g, '')
  _val = _val.replace(/\.{2,}/g, '.')
  _val = _val.replace(/^\./g, '')
  _val = _val.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
  return _val
}
enum dialogType {
  'add',
  'reomve',
}
const CardContent: FC<any> = ({ info, Contract, contractAddress }): ReactElement => {
  const { address: account } = useAccount()
  const { fetchWithCatchTxError } = useCatchTxError()
  const { currentLanguage, t } = useTranslation()
  const { toastSuccess } = useToast()
  const [loadding, setLoadding] = useState<boolean>(false)
  const [claimLoadding, setClaimLoadding] = useState<boolean>(false)
  const [approveLoading, setApproveLoading] = useState<boolean>(false)
  const [allowance, setAllowance] = useState<number>(0)
  const [open, setOpen] = useState<boolean>(false)
  const [openType, setOpenType] = useState<dialogType>(dialogType.add)
  const [amount, setAmount] = useState<string | number>('')
  const [lpTotalAmount, setLpTotalAmount] = useState<string | number>('0')
  const [lpPrice, setLpPrice] = useState<string | number>('0')
  // const [apy, setApy] = useState<string | number>(0)
  const [rootNode, setRootNode] = useState(null)
  const [userLpInfo, setUserLpInfo] = useState({
    balance: 0,
    amount: 0,
    rewardDebt: 0,
    reward: 0,
  })

  const erc20Contract = useERC20(info.lpToken)
  const usdtErc20Contract = useERC20(info.symbolBddress)
  const tokenAErc20Contract = useERC20(info.symbolAddress)

  const listener = () => {
    try {
      if (open) {
        document.documentElement.style.overflow = 'hidden'
        document.getElementById('_nav_footer_dom').style.display = 'none'
        // document.getElementById('_nav_top_dom').style.display = 'none'
      } else {
        document.documentElement.style.overflow = 'scroll'
        document.getElementById('_nav_footer_dom').style.display = 'flex'
        // document.getElementById('_nav_top_dom').style.display = 'flex'
      }
    } catch (e) {
      console.log('')
    }
  }

  const openDialog = (type: dialogType) => {
    setOpen(true)
    setAmount('')
    setOpenType(type)
  }

  const calcTotalLpPrice = async () => {
    const usdt = await usdtErc20Contract.balanceOf(info.lpToken)
    const tokenA = await tokenAErc20Contract.balanceOf(info.lpToken)
    const _tokenA = $shiftedBy(tokenA.toString(), -18, 4)
    const _usdt = $shiftedBy(usdt.toString(), -18, 4)
    let _lpPrice: any = 0
    if ($BigNumber(_tokenA).lte(0) || $BigNumber(_usdt).lte(0)) {
      _lpPrice = 0
    } else {
      _lpPrice = $BigNumber(_usdt).dividedBy(_tokenA).toFixed(4, 1)
    }
    setLpPrice(_lpPrice)
  }

  const calcApy = (): string | number => {
    // 假设这个LP池子，总质押进来的数量为100，这个池子的每区块奖励是500个币，那么年化收益：500个币*一年的区块数*币的价格 / (101 * (1个LP的价值U))
    // orgPerBlock:  全网每区块奖励
    // 某个池子的占比就是：allocPoint / totalAllocPoint

    // 某个池子的占比 rate =   allocPoint / totalAllocPoint
    // 一年区块数 blockTotal =  365 * 24 * 60 * 60 / 3 = 10512000
    // APY =  orgPerBlock   *    rate            *      10512000     *    币的价格    /     该池子的总质押量
    //        全网每区块奖励  *    某个池子的占比     *      一年区块数    *     币的价格    /     该池子的总质押量

    if ($BigNumber(lpPrice).lte(0) || $BigNumber(lpTotalAmount).lte(0)) return '0'
    const rate = $BigNumber(info.allocPoint).dividedBy(info.totalAllocPoint).toFixed(2, 1)
    const _apy = $BigNumber(info.orgPerBlock)
      .multipliedBy(rate)
      .multipliedBy(10512000)
      .multipliedBy(lpPrice)
      .dividedBy(lpTotalAmount)
      .toFixed(2, 1)
    return _apy
  }

  const getUserInfo = async () => {
    if (!info.pid && !['0', 0].includes(info.pid)) return
    const result = await Contract.userInfo(info.pid, account)
    setUserLpInfo((_val: any) => {
      // eslint-disable-next-line no-param-reassign
      _val.amount = $shiftedBy(result.amount.toString(), -18, 4)
      // eslint-disable-next-line no-param-reassign
      _val.rewardDebt = $shiftedBy(result.rewardDebt.toString(), -18, 4)
      return { ..._val }
    })
  }
  const getBalance = async () => {
    const balance = await erc20Contract.balanceOf(account)
    setUserLpInfo((_val: any) => {
      // eslint-disable-next-line no-param-reassign
      _val.balance = $shiftedBy(balance.toString(), -18, 4)
      return { ..._val }
    })
  }
  const getPendingReward = async () => {
    const reward = await Contract.getPendingReward(info.lpToken, account)
    setUserLpInfo((_val: any) => {
      // eslint-disable-next-line no-param-reassign
      _val.reward = $shiftedBy(reward.toString(), -18, 4)
      return { ..._val }
    })
  }
  const getLpTotalAmount = async () => {
    const reward = await erc20Contract.balanceOf(contractAddress)
    setLpTotalAmount($shiftedBy(reward.toString(), -18, 4))
  }

  const deposit = async () => {
    try {
      setLoadding(true)
      const receipt = await fetchWithCatchTxError(() => {
        return Contract.deposit(info.lpToken, $shiftedByFixed(amount, 18))
      })
      if (receipt?.status) {
        setAmount('')
        setOpen(false)
        Promise.all([getUserInfo(), getBalance(), getLpTotalAmount()])
        toastSuccess(
          `Successed!`,
          <ToastDescriptionWithTx txHash={receipt.transactionHash}>{t('Stake in the success')}</ToastDescriptionWithTx>,
        )
      }
      setLoadding(false)
    } catch (e) {
      setLoadding(false)
    }
  }
  const withdraw = async () => {
    try {
      setLoadding(true)
      const receipt = await fetchWithCatchTxError(() => {
        return Contract.withdraw(info.lpToken, $shiftedByFixed(amount, 18))
      })
      if (receipt?.status) {
        setAmount('')
        setOpen(false)
        Promise.all([getUserInfo(), getBalance(), getLpTotalAmount()])
        toastSuccess(
          `Successed!`,
          <ToastDescriptionWithTx txHash={receipt.transactionHash}>
            {t('UnStake in the success')}
          </ToastDescriptionWithTx>,
        )
      }
      setLoadding(false)
    } catch (e) {
      setLoadding(false)
    }
  }
  const claim = async () => {
    try {
      setClaimLoadding(true)
      const receipt = await fetchWithCatchTxError(() => {
        return Contract.claim(info.lpToken)
      })
      if (receipt?.status) {
        getPendingReward()
        toastSuccess(
          `Successed!`,
          <ToastDescriptionWithTx txHash={receipt.transactionHash}>{t('Claim in the success')}</ToastDescriptionWithTx>,
        )
      }
      setClaimLoadding(false)
    } catch (e) {
      setClaimLoadding(false)
    }
  }
  const approve = async () => {
    try {
      setApproveLoading(true)
      const receipt = await fetchWithCatchTxError(() => {
        return erc20Contract.approve(contractAddress, $shiftedByFixed(10, 36))
      })
      if (receipt?.status) {
        setAllowance(200)
        toastSuccess(
          `Successed!`,
          <ToastDescriptionWithTx txHash={receipt.transactionHash}>
            {t('Approve in the success')}
          </ToastDescriptionWithTx>,
        )
      }
      setApproveLoading(false)
    } catch (e) {
      setApproveLoading(false)
    }
  }
  const getAllowance = async () => {
    const result = await erc20Contract.allowance(account, contractAddress)
    setAllowance($shiftedBy(result.toString(), -18, 6))
  }
  const changeInput = () => {
    const maxVal = openType === dialogType.add ? userLpInfo.balance : userLpInfo.amount
    setAmount(Math.min(maxVal, amount as any))

    // const values = value.split('.');
    // const maxVal = openType === dialogType.add ? userLpInfo.balance:  userLpInfo.amount;
    // console.log('changeInput',value, values, values.length, values.indexOf('.'), values.length >= 2 || values.indexOf('.') !== -1)
    // if(!values[1] || values.indexOf('.') === -1){
    //   setAmount(Math.min(maxVal, value))
    // }else{
    //   setAmount(value)
    // }
  }

  const DialogComponents = (): ReactElement => {
    return rootNode
      ? ReactDOM.createPortal(
          <Dialog>
            <Mask onClick={() => setOpen(false)}> </Mask>
            <Cont>
              <LabelText>{t('Stake LP token')}</LabelText>
              <DialogCont>
                <Top>
                  {openType === dialogType.add ? 'Stake' : 'UnStake'}{' '}
                  <RightCont>
                    {t('Balance')}：{openType === dialogType.add ? userLpInfo.balance : userLpInfo.amount}
                  </RightCont>
                </Top>
                <Bottom>
                  <Input
                    placeholder="0"
                    value={amount}
                    onChange={(e) => setAmount(clearNoNum(e.target.value))}
                    onBlur={() => changeInput()}
                  />
                  <RightCont className="_operation">
                    <Max
                      onClick={() => setAmount(openType === dialogType.add ? userLpInfo.balance : userLpInfo.amount)}
                    >
                      MAX
                    </Max>
                    {info.symbolA}-{info.symbolB} LP
                  </RightCont>
                </Bottom>
              </DialogCont>
              <Btns>
                <Button className="_dialog_btn" onClick={() => setOpen(false)}>
                  {t('Cancel')}
                </Button>
                <Button
                  className="_dialog_btn"
                  disabled={!amount}
                  isLoading={loadding}
                  onClick={() => (openType === dialogType.add ? deposit() : withdraw())}
                >
                  {t('Confirm')}
                </Button>
              </Btns>
              <See>
                <a href={`/add/${info.symbolAddress}/${info.symbolBddress}`}>
                  Get {info.symbolA}-{info.symbolB} LP
                  <Icon src="/images/farm/open.svg" />
                </a>
              </See>
            </Cont>
          </Dialog>,
          rootNode,
        )
      : null
  }

  const apy = useMemo(() => calcApy(), [lpPrice, lpTotalAmount])
  const liquidityValue = useMemo(
    () => $toFixed($BigNumber(lpPrice).multipliedBy(lpTotalAmount).toFixed(), 4),
    [lpPrice, lpTotalAmount],
  )

  useEffect(() => {
    listener()
    const getRootNode = document.querySelector('#modalWrap')
    if (open) {
      if (!getRootNode) {
        const modalWrap = document.createElement('div')
        modalWrap.setAttribute('id', 'modalWrap')
        document.body.appendChild(modalWrap)
        setRootNode(modalWrap)
      } else {
        setRootNode(getRootNode)
      }
    } else {
      // eslint-disable-next-line no-lonely-if
      if (rootNode) {
        const timer = setTimeout(() => {
          setRootNode(null)
          clearTimeout(timer)
        }, 400)
      } else {
        const getRootNodes = document.querySelector('#modalWrap')
        // eslint-disable-next-line no-unused-expressions
        getRootNodes && document.body.removeChild(getRootNodes)
      }
    }
  }, [rootNode, open])

  useEffect(() => {
    if (Contract && erc20Contract && Object.keys(info).length > 0) {
      Promise.all([
        getUserInfo(),
        getBalance(),
        getPendingReward(),
        getAllowance(),
        getLpTotalAmount(),
        calcTotalLpPrice(),
      ])
    }
  }, [info, Contract, erc20Contract])

  return (
    <Main>
      <Header>
        <HeaderCont>
          <SymbolName>灵活质押ORG</SymbolName>
          <SymbolInfo>质押，赚取-以及更多惊喜</SymbolInfo>
        </HeaderCont>
        <Symbol>
          <BaseSymbolImg src="/images/poolList/ORG.png" />
          <SymbolImg src="/images/poolList/relode.png" />
        </Symbol>
      </Header>
      <Content>
        <Line>
          <Label>{t('Annualized interest rate')}:</Label>
          <Right>
            {apy}% <CalculateIcon src="/images/farm/calculation.svg" />
          </Right>
        </Line>
        <LineTip>
          2%取消质押费用收取至
          <span>0d:0h:0m</span>
        </LineTip>
        <Section>
          <Lib>
            <Left>
              <Title>
                {info.rewardSymbol} {t('earned')}
              </Title>
              <Number>{userLpInfo.reward}</Number>
            </Left>
            <BtnBlock>
              <Nodes>
                <Button
                  className="_btns"
                  disabled={userLpInfo.reward <= 0}
                  isLoading={claimLoadding}
                  onClick={() => claim()}
                >
                  {t('claim')}
                </Button>
              </Nodes>
            </BtnBlock>
          </Lib>
          <Lib>
            <Left>
              <Title>
                ORG已灵活质押
              </Title>
              <Number>{userLpInfo.amount}</Number>
            </Left>
            <BtnBlock>
              <Nodes>
                {allowance > 0 ? (
                  <>
                    <Button className="_btns dos" onClick={() => openDialog(dialogType.reomve)}>
                      -
                    </Button>
                    <Button className="_btns dos" onClick={() => openDialog(dialogType.add)}>
                      +
                    </Button>
                  </>
                ) : (
                  <Button className="_btns" isLoading={approveLoading} onClick={() => approve()}>
                    {t('Approve')}
                  </Button>
                )}
              </Nodes>
            </BtnBlock>
          </Lib>
        </Section>
        <Line className='bottom'>
          <Label>{t('Total Stake')}:</Label>
          <Right className="bold luidity">
            {liquidityValue > 0 ? '$' : ''}
            {liquidityValue}
          </Right>
        </Line>
      </Content>
      <Footer>
        <Item>
          <a href={`/add/${info.symbolAddress}/${info.symbolBddress}`}>
            {t('Get')} {info.symbolA}-{info.symbolB} <Icon src="/images/farm/open.svg" />
          </a>
        </Item>
        <Item>
          <a href={`https://fonscan.io/address/${contractAddress}`} target="blank">
            {t('View contract')} <Icon src="/images/farm/open.svg" />
          </a>
        </Item>
      </Footer>
      {open && DialogComponents()}
    </Main>
  )
}

const Main = styled.div`
  background: #ffffff;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.02);
  border-radius: 20px;
  padding: 26px 20px 35px;
  /* height: 487px; */
  position: relative;
  z-index: 3;
  border: 1px solid #ff6f42;
  border-bottom-width: 3px;
  @media (max-width: 768px) {
    padding: 26px 18 35px;
    height: auto;
  }
`
const Header = styled.div`
  height: 81px;
  display: flex;
  justify-content: space-between;
`
const Symbol = styled.div`
  position: relative;
  width: 64px;
`

const BaseSymbolImg = styled.img`
  height: 53px;
  position: absolute;
  top: 12px;
  left: 0;
`
const SymbolImg = styled.img`
  height: 31px;
  position: absolute;
  top: 38px;
  left: 32px;
`

const HeaderCont = styled.div``
const SymbolName = styled.div`
  font-family: 'PingFang SC';
  font-weight: 600;
  color: #121211;
  margin-bottom: 8px;
  font-size: 32px;
  line-height: 45px;
`
const SymbolInfo = styled.div`
  font-weight: 500;
  font-size: 20px;
  line-height: 28px;
  color: #9e9fa4;
`

const Content = styled.div`
  margin-top: 35px;
  width: 100%;
`
const Line = styled.div`
  margin-bottom: 4px;
  height: 28px;
  font-family: 'PingFang SC';
  font-weight: 500;
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  line-height: 28px;
  color: #9e9fa4;
  &.bottom{
    font-size: 16px;
    line-height: 22px;
    height: 22px;
  }
`
const Label = styled.div``
const Right = styled.div`
  font-weight: 400;
  font-size: 14px;
  color: #121211;
  text-align: right;
  position: relative;
  &.bold {
    font-weight: 600;
  }
  &.luidity {
    margin-right: 19px;
  }
`

const LineTip = styled.div`
  margin-top: 9px;
  font-weight: 400;
  font-size: 12px;
  line-height: 17px;
  color: #000000;
  span {
    float: right;
    margin-right: 27px;
  }
`

const CalculateIcon = styled.img`
  height: 15px;
  margin-left: 8px;
  position: relative;
  top: 2px;
`

const Section = styled.div`
  margin-top: 6px;
  width: 100%;
  margin-top: 36px;
  margin-bottom: 44px;
  /* @media (max-width: 768px) {
    margin-bottom: 24px;
  } */
`
const Lib = styled.div`
  height: 57px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 21px;
  &:last-child {
    margin-bottom: 0;
  }
`
const Left = styled.div`
  flex: 1;
`
const Title = styled.div`
  font-family: 'PingFang SC';
  font-weight: 600;
  font-size: 12px;
  line-height: 17px;
  color: #ffae32;
  margin-bottom: 9px;
`
const Number = styled.div`
  font-family: 'Arimo Hebrew Subset';
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 28px;
  /* color: #DCDCDC; */
  color: #000000;
`
const BtnBlock = styled.div`
  display: flex;
  width: 125px;
  height: 100%;
  position: relative;
`
const Nodes = styled.div`
  height: 40px;
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  ._btns {
    flex: 1;
    height: 100%;
    font-weight: bold;
    font-family: 'PingFang SC';
    font-weight: 600;
    font-size: 16px;
    line-height: 40px;
    text-align: center;
    background: linear-gradient(120.51deg, #ff6a43 1.69%, #ffad34 100%);
    border-radius: 16px;
    color: #ffffff;
    box-shadow: none;
    &:disabled,
    &.pancake-button--disabled,
    .pancake-button--loading {
      opacity: 1;
      background: #e9eaec;
      color: #bdc2c5;
    }
  }
  .dos {
    width: 45px;
    height: 45px;
    line-height: 45px;
    background: #fff3ea;
    border-radius: 16px;
    position: relative;
    top: -5px;
    margin-right: 12px;
    color: #ff5d32;
    &:last-child {
      margin-right: 0;
    }
  }
`

const Footer = styled.div`
  margin-top: 18px;
  @media (max-width: 768px) {
    margin-top: 0px;
  }
`
const Item = styled.div`
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  height: 20px;
  line-height: 20px;
  color: #ffad34;
  margin-bottom: 10px;
  span {
    cursor: pointer;
  }
  &:last-child {
    margin-bottom: 0;
  }
`
const Icon = styled.img`
  width: 16px;
  margin-left: 8px;
  cursor: pointer;
  position: relative;
  top: 3px;
`

const Dialog = styled.div`
  position: fixed;
  top: 0;
  /* transform: translateY(-50%); */
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 100;
`
const Mask = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
`
const Cont = styled.div`
  position: absolute;
  width: 500px;
  background: #ffffff;
  border-radius: 20px;
  padding: 36px 25px 30px;
  @media (min-width: 769px) {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  @media (max-width: 768px) {
    bottom: 0px;
    left: 0;
    width: 100%;
    padding: 36px 22px 30px 18px;
    border-radius: 20px 20px 0 0;
  }
`
const LabelText = styled.div`
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
  color: #ff8c14;
  padding-bottom: 23px;
  border-bottom: 1px solid #f3f3f3;
  @media (max-width: 768px) {
    font-size: 20px;
    line-height: 28px;
    padding-bottom: 23px;
  }
`
const DialogCont = styled.div`
  margin: 23px 0;
  padding: 14px 19px 10px 25px;
  background: #f3eee7;
  border-radius: 12px;
  width: 100%;
  @media (max-width: 768px) {
    padding: 12px 15px 13px 29px;
  }
`
const Top = styled.div`
  font-family: 'PingFang SC';
  font-weight: 500;
  font-size: 15px;
  line-height: 21px;
  display: flex;
  justify-content: space-between;
  color: #000000;
  margin-bottom: 18px;
  @media (max-width: 768px) {
    font-size: 12px;
    line-height: 17px;
  }
`
const RightCont = styled.div`
  display: flex;
  align-items: center;
  color: #000000;
  white-space: nowrap;
  &._operation {
    position: relative;
    left: -17px;
  }
`
const Bottom = styled.div`
  height: 27px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  @media (max-width: 768px) {
    height: 25px;
    font-size: 12px;
  }
`
const Input = styled.input`
  flex: 1;
  font-family: 'PingFang SC';
  font-weight: 600;
  font-size: 18px;
  color: #000;
  background: none;
  border: none;
  padding-right: 20px;
  &:focus-visible {
    outline: none;
  }
  @media (max-width: 768px) {
    font-size: 14px;
    padding-right: 15px;
  }
`
const Max = styled.div`
  height: 27px;
  line-height: 27px;
  text-align: center;
  background: linear-gradient(120.51deg, #ff6a43 1.69%, #ffad34 100%);
  border-radius: 14px;
  font-weight: 600;
  font-size: 15px;
  letter-spacing: 0.1em;
  padding: 0 18px;
  margin-right: 17px;
  color: #ffffff;
  cursor: pointer;
  @media (max-width: 768px) {
    padding: 0 15px;
    height: 25px;
    line-height: 25px;
    font-size: 12px;
    margin-right: 10px;
  }
`
const Btns = styled.div`
  height: 41px;
  padding: 0 23px;
  display: flex;
  justify-content: space-between;
  ._dialog_btn {
    width: 179px;
    height: 41px;
    border: 1px solid #ff8c14;
    border-radius: 18px;
    color: #ff8c14;
    font-weight: 600;
    font-size: 16px;
    background: #fff;
    box-shadow: none;
    &:disabled,
    &.pancake-button--disabled,
    .pancake-button--loading {
      opacity: 1;
      background: #ececec;
      color: #89847d;
      border-color: #ececec;
    }
  }
  @media (max-width: 768px) {
    height: 36px;
    padding: 0 17px;
    ._dialog_btn {
      width: 130px;
      font-size: 14px;
    }
  }
`
const See = styled.div`
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 21px;
  color: #ff8c14;
  text-align: center;
  margin-top: 14px;
  span {
    cursor: pointer;
  }
  img {
    position: relative;
    top: 3px;
  }
  @media (max-width: 768px) {
    font-size: 12px;
    line-height: 17px;
  }
`
export default CardContent
