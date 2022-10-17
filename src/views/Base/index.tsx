import { FC, ReactElement, useEffect, useState } from 'react'
import styled from 'styled-components'
import BaseMain from './Main'

const Base: FC = (): ReactElement => {
  // const [isMobile, setIsMobile] = useState<boolean>((window as any).screen.clientWidth <= 768)
  // const listenerVw = () => {
  //     setIsMobile((window as any).screen.clientWidth <= 768)
  // }

  // useEffect(()=> {

  //     window.addEventListener('resize', listenerVw, false);
  //     return () => {
  //         window.removeEventListener('resize', listenerVw, false);
  //     }
  // },[])
  return (
    <Main>
      <BaseMain />
    </Main>
  )
}
const Main = styled.div`
  width: 100%;
  background: #f8f8f8;
  display: flex;
  justify-content: center;
  min-width: 1440px;
  @media (max-width: 768px) {
    min-width: 100%;
  }
`

export default Base
