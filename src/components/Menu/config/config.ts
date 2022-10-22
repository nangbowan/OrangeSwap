import {
  MenuItemsType,
  DropdownMenuItemType,
  SwapIcon,
  SwapFillIcon,
  EarnFillIcon,
  EarnIcon,
  TrophyIcon,
  TrophyFillIcon,
  NftIcon,
  NftFillIcon,
  MoreIcon,
  LaunchIcon,
  NftbarIcon,
  MetaverseIcon,
  InfoIcon,
  MediaIcon,
} from '@pancakeswap/uikit'
import { ContextApi } from '@pancakeswap/localization'
import { nftsBaseUrl } from 'views/Nft/market/constants'
import { perpLangMap } from 'utils/getPerpetualLanguageCode'
import { perpTheme } from 'utils/getPerpetualTheme'
import { DropdownMenuItems } from '@pancakeswap/uikit/src/components/DropdownMenu/types'
import { SUPPORT_ONLY_BSC, SUPPORT_FON } from 'config/constants/supportChains'

export type ConfigMenuDropDownItemsType = DropdownMenuItems & { hideSubNav?: boolean }
export type ConfigMenuItemsType = Omit<MenuItemsType, 'items'> & { hideSubNav?: boolean; image?: string } & {
  items?: ConfigMenuDropDownItemsType[]
}

const addMenuItemSupported = (item, chainId) => {
  if (!chainId || !item.supportChainIds) {
    return item
  }
  if (item.supportChainIds?.includes(chainId)) {
    return item
  }
  return {
    ...item,
    disabled: true,
  }
}

const config: (
  t: ContextApi['t'],
  isDark: boolean,
  languageCode?: string,
  chainId?: number,
) => ConfigMenuItemsType[] = (t, isDark, languageCode, chainId) =>
  [
    {
      label: t('Trade'),
      icon: SwapIcon,
      fillIcon: SwapFillIcon,
      href: '/swap',
      showItemsOnMobile: false,
      items: [
        {
          label: t('Swap'),
          href: '/swap',
        },
        // {
        //   label: t('Limit'),
        //   href: '/limit-orders',
        //   supportChainIds: SUPPORT_FON,
        //   image: '/images/decorations/3d-coin.png',
        // },
        {
          label: t('Liquidity'),
          href: '/liquidity',
        },
        // {
        //   label: t('Perpetual'),
        //   href: `https://perp.pancakeswap.finance/${perpLangMap(languageCode)}/futures/BTCUSDT?theme=${perpTheme(
        //     isDark,
        //   )}`,
        //   type: DropdownMenuItemType.EXTERNAL_LINK,
        // },
        // {
        //   label: t('Bridge'),
        //   href: 'https://bridge.pancakeswap.finance/',
        //   type: DropdownMenuItemType.EXTERNAL_LINK,
        // },
      ].map((item) => addMenuItemSupported(item, chainId)),
    },
    {
      label: t('Earn'),
      href: '/farms',
      icon: EarnIcon,
      fillIcon: EarnFillIcon,
      supportChainIds: SUPPORT_FON,
      items: [
        {
          label: t('Farms'),
          href: '/farms',
        },
        {
          label: t('Pools'),
          href: '/pools',
          supportChainIds: SUPPORT_FON,
        },
      ].map((item) => addMenuItemSupported(item, chainId)),
    },
    {
      label: t('rebate'),
      href: '/rebate',
      icon: TrophyIcon,
      fillIcon: TrophyFillIcon,
      showItemsOnMobile: false,
      supportChainIds: SUPPORT_FON,
      items: [
      ].map((item) => addMenuItemSupported(item, chainId)),
    },
    {
      label: t('launch'),
      href: '/launch',
      icon: LaunchIcon,
      fillIcon: LaunchIcon,
      showItemsOnMobile: false,
      // image: '/images/decorations/pe2.png',
      supportChainIds: SUPPORT_FON,
      items: [
      ].map((item) => addMenuItemSupported(item, chainId)),
    },
    {
      label: t('NFT'),
      href: '/NFT',
      icon: NftbarIcon,
      fillIcon: NftbarIcon,
      showItemsOnMobile: false,
      // image: '/images/decorations/pe2.png',
      supportChainIds: SUPPORT_FON,
      items: [
      ].map((item) => addMenuItemSupported(item, chainId)),
    },
    {
      label: t('Meta'),
      href: '/Meta',
      icon: MetaverseIcon,
      fillIcon: MetaverseIcon,
      showItemsOnMobile: false,
      // image: '/images/decorations/pe2.png',
      supportChainIds: SUPPORT_FON,
      items: [
      ].map((item) => addMenuItemSupported(item, chainId)),
    },
    {
      label: 'Info',
      href: '/Info',
      icon: InfoIcon,
      fillIcon: InfoIcon,
      hideSubNav: true,
      items: [
        {
          label: 'IDO',
          href: '/ido',
          supportChainIds: SUPPORT_FON,
        },
        {
          label: 'Data',
          href: '/Data',
          supportChainIds: SUPPORT_FON,
        },
        {
          label: t('Docs'),
          href: 'https://orange-swap.gitbook.io/orange-swap-1/',
          type: DropdownMenuItemType.EXTERNAL_LINK,
        },
      ].map((item) => addMenuItemSupported(item, chainId)),
    },
    {
      label: 'Media',
      href: '/Media',
      icon: MediaIcon,
      fillIcon: MediaIcon,
      hideSubNav: true,
      items: [
        {
          label: 'Twitter',
          href: '/Twitter',
          supportChainIds: SUPPORT_FON,
        },
        {
          label: 'Telegram-Chinese',
          href: '/Telegram-Chinese',
          supportChainIds: SUPPORT_FON,
        },
        {
          label: 'Telegram-English',
          href: '/Telegram-English',
          supportChainIds: SUPPORT_FON,
        },
      ].map((item) => addMenuItemSupported(item, chainId)),
    },
  ].map((item) => addMenuItemSupported(item, chainId))

export default config
