import { ChainId ,Token,WFON} from '@pancakeswap/sdk'
<<<<<<< HEAD
import { USDT_FON , ORG_MAINNET} from './common'
=======
import { USDT_FON, ORG_MAINNET } from './common'

>>>>>>> 2cf3f3cae476bd9ca0fd1aca68edeb4fc897e99a
export const fonTokens = {
    wfon: WFON[ChainId.FON],
    // bnb here points to the wbnb contract. Wherever the currency BNB is required, conditional checks for the symbol 'BNB' can be used
    fon: ORG_MAINNET,
    usdt:USDT_FON,
<<<<<<< HEAD
    org:ORG_MAINNET,
    
=======
>>>>>>> 2cf3f3cae476bd9ca0fd1aca68edeb4fc897e99a
  }