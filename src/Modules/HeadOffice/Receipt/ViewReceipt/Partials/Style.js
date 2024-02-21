import styled from "styled-components";
import { THEME } from "../../../../../theme";


// export const CommonSubTitleMenuMultiValue = styled.div`
//     font-size:1.2rem;
//     padding:2px 10px;
//     letter-spacing:1px;
//     font-weight:500;
//     width:100%;
//     line-height:40px;
//     /* border-bottom:1px solid; */

//     text-decoration-line: underline;
//     text-underline-offset: 0.5em
// `

export const AmountWrapper = styled.div`
    width:100%;
    border:1px solid ${THEME.primary_color};
    display:flex;
    margin-top:20px;
    align-items:center;

    & h4{
    padding-left: 10px;
    }
`

export const Symbol = styled.span`
    background:${THEME.primary_color};
    padding:5px 15px;
    color:#fff;
    font-family: none;
`


export const SignatureWrapper = styled.div`
    text-align:center;
`


export const ShopName = styled.h4`
        font-size:12px;
        letter-spacing:1px;
        text-transform:capitalize;
`


export const Sign = styled.h4`
        font-size:12px;
        letter-spacing:1px;
        margin-top:35px;
`