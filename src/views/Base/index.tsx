import { FC, ReactElement, useEffect, useState } from 'react';
import styled from 'styled-components';
import PC from './components/PC'
import Mobile from './components/Mobile'

const Base:FC = ():ReactElement => {
    const [isMobile, setIsMobile] = useState<boolean>((window as any).screen.clientWidth <= 768)
    const listenerVw = () => {
        setIsMobile((window as any).screen.clientWidth <= 768)
    }

    useEffect(()=> {
        
        window.addEventListener('resize', listenerVw, false);
        return () => {
            window.removeEventListener('resize', listenerVw, false);
        }
    },[])
    return(
        <Main>
            {isMobile ? <Mobile /> : <PC />}
        </Main>
    )
}
const Main = styled.div`
    width: 100%;
    background: #F8F8F8;
    display: flex;
    justify-content: center;
`

export default Base