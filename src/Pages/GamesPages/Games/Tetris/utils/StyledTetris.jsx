import styled from "styled-components";
import bgImage from './stars.png'

export const StyledTetrisWrapper = styled.div`
width: 100vw;
height: 100vh;
background: url(${bgImage}), linear-gradient(#003153, #B666D2);
background-size: cover;
overflow: auto;    
`

export const StyledTetris = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  margin: 0 auto;
  max-width: 900px;
  aside {
    width: 100%;
    max-width: 230px;
    display: block;
    padding: 0 20px;
  }
`

//linear-gradient(#2b1055, #7597de);