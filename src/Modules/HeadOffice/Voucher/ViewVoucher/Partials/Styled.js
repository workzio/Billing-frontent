import styled from "styled-components"
import { THEME } from "../../../../../theme"

export const AmountWrapper = styled.div`
    width:100%;
    border:1px solid ${THEME.primary_color};
    display:flex;
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
