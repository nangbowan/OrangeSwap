import { ChainId ,Token,WFON} from '@pancakeswap/sdk'
import { USDT_FON, ORG_MAINNET } from './common'

export const fonTokens = {
    wfon: WFON[ChainId.FON],
    // bnb here points to the wbnb contract. Wherever the currency BNB is required, conditional checks for the symbol 'BNB' can be used
    fon: ORG_MAINNET,
    usdt:USDT_FON,
    org:ORG_MAINNET,
  }