import { FC, ReactElement } from 'react'
import styled from 'styled-components'
import IdoCard from './idoCard'
import Join from './join'
import Market from './market'

const Ido: FC = (): ReactElement => {
  return (
    <Main>
      <IdoCard />
      <Join />
      <Market />
    </Main>
  )
}
const Main = styled.div`
  width: 100%;
  background: #f8f8f8;
`

export default Ido
