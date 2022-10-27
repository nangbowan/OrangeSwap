import { FC, ReactElement, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useAccount } from 'wagmi'
import { useToast, Button } from '@pancakeswap/uikit'
import { useGasPrice } from 'state/user/hooks'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useTranslation } from '@pancakeswap/localization'
import { $shiftedBy } from 'utils/met'
import { BOOSTED_FARM_GAS_LIMIT } from 'config'
import { ToastDescriptionWithTx } from 'components/Toast'
import useCatchTxError from 'hooks/useCatchTxError'

import { useOrgbundrebate } from 'hooks/useContract'

const options = {
  gasLimit: BOOSTED_FARM_GAS_LIMIT,
}

const CardContent: FC = (): ReactElement => {
  const { address: account } = useAccount()
  const { chainId } = useActiveWeb3React()

  return <Main>121</Main>
}
const Main = styled.div`
  width: 335px;
  height: 503px;

  background: #ffffff;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.02);
  border-radius: 20px;
  padding: 26px 20px 35px;

  position: relative;
  z-index: 3;
  margin-bottom: 50px;
  @media (max-width: 768px) {
    padding: 40px 0 72px;
  }
`
export default CardContent
