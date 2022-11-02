import { CHAIN_IDS } from 'utils/wagmi'
import PoolList from '../views/poolList'

const PoolListPage = () => <PoolList />
PoolListPage.chains = CHAIN_IDS
export default PoolListPage
