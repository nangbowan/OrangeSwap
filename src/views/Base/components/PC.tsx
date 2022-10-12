import { FC, ReactElement } from 'react'
import styled from 'styled-components'

const PC: FC = (): ReactElement => {
  return (
    <Main>
      <Top>
        <Start>即将开始</Start>
        <OrgImg src="/images/base/pc/orgido.png" />
        <TopCont>
          <Btn>GO</Btn>
          <Arrow />
          <Join>立即参与</Join>
        </TopCont>
        <TopImg src="/images/base/pc/banner.png" />
      </Top>
      {/* <Notice></Notice> 
           <Content></Content>  */}
    </Main>
  )
}

const Main = styled.div`
  width: 1440px;
  padding-top: 45px;
`
const Top = styled.div`
  width: 100%;
  position: relative;
  height: 904px;
`
const Start = styled.div`
    padding-top: 210px;
    font-family: 'FZLanTingHeiS-B-GB';
    font-style: normal;
    font-weight: 400;
    font-size: 72px;
    line-height: 82px;
    display: flex;
    align-items: flex-end;
    background: -webkit-linear-gradient(left, #929292, #373737 23.22%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

`
const OrgImg = styled.img`

`
const TopCont = styled.div``
const Btn = styled.div``
const Arrow = styled.img``
const Join = styled.div``
const TopImg = styled.img`
  width: 904px;
  height: 904px;
  position: absolute;
  right: -80px;
  top: 0;
`
const Notice = styled.div``
const Content = styled.div``

export default PC
