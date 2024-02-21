import styled from "styled-components";
import { THEME } from "../../../theme";


export const ContainerWrapper = styled.div`
background:#ffffff00;
height:100%;
display:flex;
flex-direction:column;
width:100%;
gap:10px;
`

export const TopLIst = styled.div`
background:#fff;
width:100%;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
border-radius: 20px;
`;

export const BottomLIst = styled.div`
background:#fff;
width:100%;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
border-radius: 20px;
`;

// ===============

export const DisabledLink = styled.span`
    text-decoration:none;
    color:${THEME.grey};
    font-size:16px;
    font-weight:bold;
    text-align:center;
    display:block;
    cursor: pointer;
    &:hover{
        color: ${THEME.PRIMARY}
    }
    &.active{
        color: ${THEME.PRIMARY}
    }
`;
