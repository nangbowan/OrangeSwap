import { FC, ReactElement, useEffect, useState, useMemo } from 'react'
import styled from 'styled-components'
import { useAccount } from 'wagmi'
import { useToast, Button, Link } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import { $shiftedBy, $shiftedByFixed, $BigNumber, $toFixed } from 'utils/met'
import { ToastDescriptionWithTx } from 'components/Toast'
import useCatchTxError from 'hooks/useCatchTxError'
import useActiveWeb3React from 'hooks/useActiveWeb3React'

import { useERC20, useOrgMineFixedContract } from 'hooks/useContract'
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
  'addTime',
  'addStake',
}

const CardTimeContent: FC<any> = (): ReactElement => {
  const { address: account } = useAccount()
  const { chainId } = useActiveWeb3React()
  const { fetchWithCatchTxError } = useCatchTxError()
  const { t } = useTranslation()
  const { toastSuccess } = useToast()
  const [loadding, setLoadding] = useState<boolean>(false)
  const [claimLoadding, setClaimLoadding] = useState<boolean>(false)
  const [extendLoadding, setExtendLoadding] = useState<boolean>(false)
  const [approveLoading, setApproveLoading] = useState<boolean>(false)
  const [allowance, setAllowance] = useState<number>(1000)
  const [open, setOpen] = useState<boolean>(false)
  const [openType, setOpenType] = useState<dialogType>(dialogType.add)
  const [amount, setAmount] = useState<string | number>('')
  const [week, setWeek] = useState<number>(0)
  const [querWeek, setQuerWeek] = useState<number>(1)
  const [rewardPerBlock, setRewardPerBlock] = useState<string | number>('0')
  const [rootNode, setRootNode] = useState(null)
  const [userInfo, setUserLpInfo] = useState({
    balance: 0,
    amount: 0,
    totalSupply: 0,
    lastStackedTime: 0,
    stakeTerm: 0, // 周期 0-4  对应weekList key
    reward: 0,
    days: 0,
    canWithdraw: false,
  })

  const orgMineFixed = {
    97: '0x903762fE3A9cc9c629f8886Dce6adF2B80BCc4D9',
    201022: '0x3214d17bfEF6cEc0f675C6267C98bB46696A029E',
  }
  const orgAddress = {
    97: '0xFd8755535B187Da3c0653c450641180382C75521',
    201022: '0xFa61BD0B233A6E8112D8F8D06E88EA128B9E5D7b',
  }

  const contractAddress = orgMineFixed[chainId]

  const erc20Contract = useERC20(orgAddress[chainId])
  const orgMineFixedContract = useOrgMineFixedContract(orgMineFixed[chainId])

  const weekList: any[] = [
    { title: '1W', key: 0, value: 1, rate: 1 },
    { title: '5W', key: 1, value: 5, rate: 1.5 },
    { title: '10W', key: 2, value: 10, rate: 2.25 },
    { title: '25W', key: 3, value: 25, rate: 3 },
    { title: '52W', key: 4, value: 52, rate: 4.6 },
  ]

  const listener = () => {
    try {
      if (open) {
        document.documentElement.style.overflow = 'hidden'
        document.getElementById('_nav_footer_dom').style.display = 'none'
      } else {
        document.documentElement.style.overflow = 'scroll'
        document.getElementById('_nav_footer_dom').style.display = 'flex'
      }
    } catch (e) {
      // console.log('')
    }
  }

  const openDialog = (type: dialogType) => {
    setOpen(true)
    setAmount('')
    setOpenType(type)
  }

  const calcBaseUnitApy = () => {
    // apy:  1/totalSupply * 每区块的奖励数 (rewardTokenInfo.rewardPerBlock)* 一年有多少个区块 * 周期比例rate
    if ($BigNumber(rewardPerBlock).lte(0) || $BigNumber(userInfo.totalSupply).lte(0)) return '0'
    return $BigNumber(1)
      .dividedBy(userInfo.totalSupply)
      .multipliedBy(rewardPerBlock)
      .multipliedBy(10512000)
      .toFixed(2, 1)
  }

  const getUserInfo = async () => {
    const canWithdraw = await orgMineFixedContract.canWithdraw(account);
    const _totalSupply = await orgMineFixedContract.totalStakedAmount()
    const totalSupply = $shiftedBy(_totalSupply.toString(), -18, 4)
    const result = await orgMineFixedContract.userInfo(account)
    const _balance = $shiftedBy(result.stakedAmounts.toString(), -18, 4)
    const stakeTerm = $toFixed(result.stakeTerm.toString(), 0) as number
    const lastStakedTime = ($toFixed(result.lastStakedTime.toString(), 0) as number) * 1000
    if (_balance > 0) {
      setWeek(stakeTerm)
      setQuerWeek(weekList[stakeTerm].value)
    }
    const endTime = lastStakedTime + weekList[stakeTerm].value * 7 * 24 * 60 * 60 * 1000
    const days = Math.ceil((endTime - lastStakedTime) / (24 * 60 * 60 * 1000))
    setUserLpInfo((_val: any) => {
      // eslint-disable-next-line no-param-reassign
      _val.canWithdraw = canWithdraw;
      // eslint-disable-next-line no-param-reassign
      _val.stakeTerm = _balance > 0 ? stakeTerm : 0
      // eslint-disable-next-line no-param-reassign
      _val.totalSupply = totalSupply
      // eslint-disable-next-line no-param-reassign
      _val.amount = _balance
      // eslint-disable-next-line no-param-reassign
      _val.days = Math.max(days, 0)
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
    const reward = await orgMineFixedContract.getPendingReward(account)
    setUserLpInfo((_val: any) => {
      // eslint-disable-next-line no-param-reassign
      _val.reward = $shiftedBy(reward.toString(), -18, 4)
      return { ..._val }
    })
  }

  const getRewardTokenInfo = async () => {
    const rewardInfo = await orgMineFixedContract.rewardTokenInfo()
    setRewardPerBlock($shiftedBy(rewardInfo.rewardPerBlock.toString(), -18, 4))
  }

  const deposit = async () => {
    try {
      setLoadding(true)
      setOpen(false)
      const receipt = await fetchWithCatchTxError(() => {
        return orgMineFixedContract.deposit($shiftedByFixed(amount, 18), week)
      })
      if (receipt?.status) {
        setAmount('')
        Promise.all([getPendingReward(), getBalance(), getUserInfo()])
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

  const extend = async () => {
    try {
      setExtendLoadding(true)
      setOpen(false)
      const receipt = await fetchWithCatchTxError(() => {
        return orgMineFixedContract.extend(week)
      })
      if (receipt?.status) {
        getUserInfo()
        toastSuccess(
          `Successed!`,
          <ToastDescriptionWithTx txHash={receipt.transactionHash}>{t('Successful operation')}</ToastDescriptionWithTx>,
        )
      }
      setExtendLoadding(false)
    } catch (e) {
      setExtendLoadding(false)
    }
  }

  const withdraw = async () => {
    try {
      setLoadding(true)
      setOpen(false)
      const receipt = await fetchWithCatchTxError(() => {
        return orgMineFixedContract.withdraw()
      })
      if (receipt?.status) {
        setAmount('')
        Promise.all([getPendingReward(), getBalance(), getUserInfo()])
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
        return orgMineFixedContract.claimReward()
      })
      if (receipt?.status) {
        Promise.all([getPendingReward(), getBalance(), getUserInfo()])
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
    const maxVal = userInfo.balance
    setAmount(Math.min(maxVal, amount as any))

    // const values = value.split('.');
    // const maxVal = openType === dialogType.add ? userInfo.balance:  userInfo.amount;
    // console.log('changeInput',value, values, values.length, values.indexOf('.'), values.length >= 2 || values.indexOf('.') !== -1)
    // if(!values[1] || values.indexOf('.') === -1){
    //   setAmount(Math.min(maxVal, value))
    // }else{
    //   setAmount(value)
    // }
  }

  const submit = () => {
    if ([dialogType.addStake, dialogType.add].includes(openType)) {
      deposit()
    } else if (openType === dialogType.addTime) {
      extend()
    } else {
      withdraw()
    }
  }

  const baseUnitApy = useMemo(() => calcBaseUnitApy(), [userInfo, rewardPerBlock])
  const maxApy = useMemo(() => $BigNumber(baseUnitApy).multipliedBy(weekList[4].rate).toFixed(2, 1), [baseUnitApy, userInfo])
  const apy = useMemo(() => $BigNumber(baseUnitApy).multipliedBy(weekList[userInfo.stakeTerm].rate).toFixed(2, 1), [baseUnitApy, userInfo])
  const newApy = useMemo(() => $BigNumber(baseUnitApy).multipliedBy(weekList[week].rate).toFixed(2, 1), [baseUnitApy, week])

  const DialogComponents = (): ReactElement => {
    return rootNode
      ? ReactDOM.createPortal(
          <Dialog>
            <Mask onClick={() => setOpen(false)}> </Mask>
            <Cont>
              <LabelText>
                {[dialogType.add, dialogType.addStake].includes(openType) && 'Stake ORG'}
                {openType === dialogType.addTime && t('Select the latest fixed pledge duration')}
                <CloseIcon src="/images/poolList/cancel.svg" alt="" onClick={() => setOpen(false)} />
              </LabelText>
              {![dialogType.addTime].includes(openType) && (
                <DialogCont>
                  <Top>
                    {[dialogType.add, dialogType.addStake].includes(openType) ? t('Stake') : t('UnStake')}
                    <RightCont>
                      {t('Balance')}：{userInfo.balance}
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
                      <Max onClick={() => setAmount(userInfo.balance)}>MAX</Max>
                      ORG
                    </RightCont>
                  </Bottom>
                </DialogCont>
              )}
              {![dialogType.addStake].includes(openType) && (
                <Weeks>
                  <WeeksTop>
                    {weekList.map((item) => (
                      <WeeksItem
                        key={item.key}
                        className={[
                          week === item.key && 'active',
                          openType === dialogType.addTime &&
                            userInfo.balance > 0 &&
                            item.key < userInfo.stakeTerm &&
                            'disbable',
                        ].join(' ')}
                        onClick={() => {
                          if (
                            openType === dialogType.addTime &&
                            userInfo.balance > 0 &&
                            item.key < userInfo.stakeTerm
                          ) {
                            //
                          } else {
                            setWeek(item.key)
                            setQuerWeek(item.value)
                          }
                        }}
                      >
                        {item.title}
                      </WeeksItem>
                    ))}
                  </WeeksTop>
                  <WeekCont>
                    <Input
                      placeholder="0"
                      value={querWeek}
                      disabled
                      // onChange={(e) => setAmount(clearNoNum(e.target.value))}
                      // onBlur={() => changeInput()}
                    />
                    <Unit>{t('Week')}</Unit>
                  </WeekCont>
                </Weeks>
              )}
              {![dialogType.addStake].includes(openType) && (
                <ApyCont>
                  APY
                  <ApyValue>
                    <b className={openType === dialogType.addTime && '_tr'}>{openType === dialogType.add ? newApy : apy}%</b>
                    {openType === dialogType.addTime && (
                      <>
                        <img src="/images/poolList/jiantou.svg" alt="" />
                        <NewApy>{newApy}%</NewApy>
                      </>
                    )}
                  </ApyValue>
                </ApyCont>
              )}

              <Btns>
                <Button className="_dialog_btn" onClick={() => setOpen(false)}>
                  {t('Cancel')}
                </Button>
                <Button
                  className="_dialog_btn"
                  disabled={[dialogType.add, dialogType.addStake].includes(openType) && !amount}
                  isLoading={loadding}
                  onClick={() => submit()}
                >
                  {t('Confirm')}
                </Button>
              </Btns>
              <See>
                <Link href="/swap">
                  Get ORG
                  <Icon src="/images/farm/open.svg" />
                </Link>
              </See>
            </Cont>
          </Dialog>,
          rootNode,
        )
      : null
  }

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
    if (orgMineFixedContract && erc20Contract) {
      Promise.all([getUserInfo(), getBalance(), getPendingReward(), getAllowance(), getRewardTokenInfo()])
    }
  }, [orgMineFixedContract, erc20Contract])

  useEffect(() => {
    calcBaseUnitApy()
  }, [userInfo, rewardPerBlock])

  return (
    <Main>
      <Header>
        <HeaderCont>
          <SymbolName>{t('Fixed term pledge')} ORG</SymbolName>
          <SymbolInfo>{t('Stake Earn and More Surprises')}</SymbolInfo>
        </HeaderCont>
        <Symbol>
          <BaseSymbolImg src="/images/poolList/ORG.png" />
          <SymbolImg src="/images/poolList/relode.png" />
        </Symbol>
      </Header>
      <Content>
        <Line>
          <Label>{t('Max fixed term')}APY:</Label>
          <Right>
            {maxApy}% <CalculateIcon src="/images/farm/calculation.svg" />
          </Right>
        </Line>

        <Section>
          <Lib>
            <Left>
              <Title>ORG{t('is about to unlock')}：</Title>
              <Number className={userInfo.canWithdraw && 'final'}>{userInfo.days} days</Number>
            </Left>
            <BtnBlock>
              <Nodes>
                <Button
                  className="_btns"
                  disabled={userInfo.canWithdraw}
                  isLoading={extendLoadding}
                  onClick={() => openDialog(dialogType.addTime)}
                >
                  {t('Extend')}
                </Button>
              </Nodes>
            </BtnBlock>
          </Lib>
          <Lib>
            <Left>
              <Title>ORG{t('earned')}</Title>
              <Number>{userInfo.reward}</Number>
            </Left>
            <BtnBlock>
              <Nodes>
                <Button
                  className="_btns"
                  disabled={userInfo.reward <= 0}
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
              <Title>ORG{t('has fixed pledge')}</Title>
              <Number>{userInfo.amount}</Number>
            </Left>
            <BtnBlock>
              <Nodes>
                {allowance > 0 ? (
                  <>
                    {!userInfo.amount && (
                      <Button className="_btns dos" onClick={() => openDialog(dialogType.add)}>
                        {t('Stake')}
                      </Button>
                    )}
                    {userInfo.amount && !userInfo.canWithdraw && (
                      <Button className="_btns dos" onClick={() => openDialog(dialogType.addStake)}>
                        {t('Add Stake')}ORG
                      </Button>
                    )}
                    {userInfo.amount > 0 && userInfo.canWithdraw && (
                      <Button className="_btns dos" isLoading={loadding} onClick={() => withdraw()}>
                        {t('UnStake')}
                      </Button>
                    )}
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
        <Line className="bottom">
          <Label>{t('Total Stake')}:</Label>
          <Right className="bold luidity">{userInfo.totalSupply}</Right>
        </Line>
        <Line className="bottom">
          <Label>{t('My')}APY:</Label>
          <Right className="bold luidity">{apy}%</Right>
        </Line>
      </Content>
      <Footer>
        <Item>
          <a href={`https://fonscan.io/address/${orgAddress[chainId]}`}>
            {t('View token contracts')} <Icon src="/images/farm/open.svg" />
          </a>
        </Item>
        <Item>
          <a href="https://orange-swap.gitbook.io/orange-swap-1/zhuan-qu" target="blank">
            {t('View tutorial')} <Icon src="/images/farm/open.svg" />
          </a>
        </Item>
      </Footer>
      {open && DialogComponents()}
    </Main>
  )
}

const Weeks = styled.div`
  margin-bottom: 19px;
`
const WeeksTop = styled.div`
  display: flex;
  height: 40px;
  line-height: 40px;
  margin-bottom: 18px;
`
const WeeksItem = styled.div`
  flex: 1;
  height: 100%;
  margin-right: 7px;
  background: #f8f8f8;
  border-radius: 16px;
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  text-align: center;
  color: #ffad34;
  cursor: pointer;
  &:hover{
    background: linear-gradient(120.51deg, #FF6A43 1.69%, #FFAD34 100%);
    color: #FFFFFF;
  }
  &.active {
    background: linear-gradient(120.51deg, #ff6a43 1.69%, #ffad34 100%);
    border-radius: 14px;
    color: #ffffff;
  }
  &.disbable {
    cursor: not-allowed;
    color: #DFDFDF;
    &:hover{
      background: #f8f8f8;
      color: #DFDFDF;
    }
  }
  
  &:last-child {
    margin-right: 0;
  }
`
const WeekCont = styled.div`
  height: 38px;
  line-height: 38px;
  display: flex;
  & > input {
    height: 100%;
    background: #f3eee7;
    border-radius: 16px;
    flex: 1;
    font-size: 16px;
    text-align: right;
    color: #000000;
    padding-right: 19px;
  }
`
const Unit = styled.div`
  margin-left: 8px;
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  color: #000000;
`
const ApyCont = styled.div`
  height: 64px;
  width: 100%;
  background: #f3eee7;
  border-radius: 16px;
  padding: 0 15px 0 21px;
  font-family: 'Arimo Hebrew Subset';
  font-size: 16px;
  line-height: 64px;
  color: #000000;
`
const ApyValue = styled.div`
  float: right;
  ._tr {
    color: #717171;
    text-decoration: line-through;
  }
  img {
    height: 8px;
    margin: 0 8px;
  }
`
const NewApy = styled.span`
  color: #ff8c14;
`

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
  @media (max-width: 768px) {
    height: auto;
  }
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
  @media (max-width: 768px) {
    height: 48px;
    top: 4px;
  }
`
const SymbolImg = styled.img`
  height: 31px;
  position: absolute;
  top: 38px;
  left: 32px;
  @media (max-width: 768px) {
    height: 28px;
    top: 28px;
    left: 30px;
  }
`

const HeaderCont = styled.div``
const SymbolName = styled.div`
  font-family: 'PingFang SC';
  font-weight: 600;
  color: #121211;
  margin-bottom: 8px;
  font-size: 28px;
  line-height: 38px;
  @media (max-width: 768px) {
    font-size: 22px;
    line-height: 30px;
  }
`
const SymbolInfo = styled.div`
  font-weight: 500;
  font-size: 19px;
  line-height: 26px;
  color: #9e9fa4;
  @media (max-width: 768px) {
    font-size: 17px;
    line-height: 24px;
  }
`

const Content = styled.div`
  margin-top: 30px;
  width: 100%;
  @media (max-width: 768px) {
    margin-top: 28px;
  }
`
const Line = styled.div`
  margin-bottom: 4px;
  height: 28px;
  font-family: 'PingFang SC';
  font-weight: 500;
  display: flex;
  justify-content: space-between;
  font-size: 19px;
  line-height: 28px;
  color: #9e9fa4;
  @media (max-width: 768px) {
    font-size: 17px;
  }
  &.bottom {
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

const CalculateIcon = styled.img`
  height: 15px;
  margin-left: 8px;
  position: relative;
  top: 2px;
`

const Section = styled.div`
  margin-top: 6px;
  width: 100%;
  margin-top: 30px;
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
  &.final {
    color: #dcdcdc;
  }
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
    margin-top: 15px;
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
  padding: 36px 22px 19px;
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
  padding-bottom: 26px;
  border-bottom: 1px solid #f3f3f3;
  margin-bottom: 23px;
  position: relative;
  @media (max-width: 768px) {
    font-size: 20px;
    line-height: 28px;
    padding-bottom: 23px;
  }
`
const CloseIcon = styled.img`
  position: absolute;
  right: 8px;
  width: 16px;
  cursor: pointer;
  transition: all 0.3s;
  @media (max-width: 768px) {
    width: 15px;
  }
  /* &:hover{
    transform: rotate(180deg);
  } */
`
const DialogCont = styled.div`
  margin-bottom: 25px;
  padding: 14px 19px 10px 25px;
  background: #f3eee7;
  border-radius: 12px;
  width: 100%;
  @media (max-width: 768px) {
    margin-bottom: 23px;
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
  margin-top: 32px;
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
    &:hover{
      background: linear-gradient(120.51deg, #FF6A43 1.69%, #FFAD34 100%);
      color: #FFFFFF;
      opacity: 1 !important;
    }
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
  margin-top: 25px;
  a {
    display: inline;
  }
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
export default CardTimeContent
