import replaceBrowserHistory from '@pancakeswap/utils/replaceBrowserHistory'
import { Box, connectorLocalStorageKey, LinkExternal, Text, useToast } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import { useCallback } from 'react'
import { useAppDispatch } from 'state'
import { ConnectorNames } from 'config/wallet'
import { useConnect, useDisconnect, useNetwork, ConnectorNotFoundError, UserRejectedRequestError } from 'wagmi'
import { clearUserStates } from '../utils/clearUserStates'
import { useActiveChainId } from './useActiveChainId'
import { useSessionChainId } from './useSessionChainId'

const useAuth = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { connectAsync, connectors } = useConnect()
  const { chain } = useNetwork()
  const { disconnectAsync } = useDisconnect()
  const { toastError } = useToast()
  const { chainId } = useActiveChainId()
  const [, setSessionChainId] = useSessionChainId()

  const login = useCallback(
    async (connectorID: ConnectorNames) => {
      const findConnector = connectors.find((c) => c.id === connectorID)
      try {
        const connected = await connectAsync({ connector: findConnector, chainId })
        if (!connected.chain.unsupported && connected.chain.id !== chainId) {
          replaceBrowserHistory('chainId', connected.chain.id)
          setSessionChainId(connected.chain.id)
        }
      } catch (error) {
        console.error(error)
        window?.localStorage?.removeItem(connectorLocalStorageKey)
        if (error instanceof ConnectorNotFoundError) {
          toastError(
            t('Provider Error'),
            <Box>
              <Text>{t('No provider was found')}</Text>
              <LinkExternal href="https://docs.pancakeswap.finance/get-started/connection-guide">
                {t('Need help ?')}
              </LinkExternal>
            </Box>,
          )
          return
        }
        if (error instanceof UserRejectedRequestError) {
          return
        }
        if (error instanceof Error) {
          toastError(error.message, t('Please authorize to access your account'))
        }
      }
    },
    [connectors, connectAsync, chainId, setSessionChainId, toastError, t],
  )

  const logout = useCallback(async () => {
    try {
      await disconnectAsync()
    } catch (error) {
      console.error(error)
    } finally {
      clearUserStates(dispatch, { chainId: chain?.id, isDeactive: true })
    }
  }, [disconnectAsync, dispatch, chain?.id])

  return { login, logout }
}

export default useAuth
