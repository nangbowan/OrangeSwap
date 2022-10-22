import { ChainId ,Token,WFON} from '@pancakeswap/sdk'
import { USDT_FON , ORG_MAINNET} from './common'
export const fonTokens = {
    wfon: WFON[ChainId.FON],
    // bnb here points to the wbnb contract. Wherever the currency BNB is required, conditional checks for the symbol 'BNB' can be used
    fon: new Token(
      ChainId.FON,
      '0xb582fD9d0D5C3515EEB6b02fF2d6eE0b6E45E7A7',
      18,
      'FON',
      'FON',
      '',
    ),
    usdt:USDT_FON,
    org:ORG_MAINNET,
    
  }