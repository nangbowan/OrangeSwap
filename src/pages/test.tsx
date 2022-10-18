import { FC, ReactElement, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useAccount } from 'wagmi'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useERC20, useTokenContract } from 'hooks/useContract'

const TestPage:FC = ():ReactElement => {
    const { address: account } = useAccount()
    const { chainId } = useActiveWeb3React()
    const tokenContract = useERC20('0xAe9269f27437f0fcBC232d39Ec814844a51d6b8f')
    const getToken = async () => {
        // const decimals = useSingleCallResult(token ? undefined : tokenContract, 'decimals', undefined, NEVER_RELOAD)
        const balance = await tokenContract.balanceOf('0x0B8996cA85955f6545bFAa63c931b7328886Db69');
        console.log('balance ====', balance)
        const _decimals = await tokenContract.decimals();
        console.log('_decimals ====', _decimals)
      }
      
    useEffect(()=> {
        if(tokenContract && chainId){
            getToken()
        }
      }, [tokenContract, chainId])
  return <Main>
    <h1>{account}----{chainId}</h1>
  </Main>
}

const Main = styled.div``
export default TestPage
