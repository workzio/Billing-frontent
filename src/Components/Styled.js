import styled from "styled-components";
import { THEME } from "../theme";

export const WelcomeWrapper = styled.div`
    background:${THEME.white};
    height:600px;
    width:100%;
    display:flex;
    align-items:center;
    justify-content:center;
    border-radius:6px;
    box-shadow:${THEME.form_box_shadow};
    flex-direction:column;
    gap:30px;
    color:${THEME.grey};
    & h2{
        font-size:1rem;
    }
`

export const SvgWrapper = styled.div`
    width:220px;
    height:168px;
    position:relative;
    & img{
        position: absolute;
        inset: 0;
        width: 100%;
        margin: auto;
    }
`

export const ReportTitle = styled.h1`
    font-size:1.3rem;
    color:${THEME.primary_color};
    text-transform:capitalize;
    letter-spacing:1px;
    padding:15px;
    text-align:center;
`

export const LoadingHolder = styled.div`
    width:100%;
    height:100vh;
    display:flex;
    align-items:center;
    justify-content:center;
    background:#fff;
`

// ============  RECEIPT AND VOUCHER ==============


export const CommonHolder = styled.div`
    border:5px solid ${THEME.primary_color};
    box-shadow:inset 0 0 0 3px #fff,inset 0 0 0 5px ${THEME.primary_color};
    padding:10px;
    margin:10px;
    border-radius:10px;
`

export const CommonTitleHolder = styled.div`
    width:100%;
    color:${THEME.primary_color};
    text-align:center;
    margin-bottom:20px;
`

export const CommonTitleH1 = styled.h1`
    font-size:20px;
    letter-spacing:1px;
`

export const CommonTitleH3 = styled.h2`
    font-size:16px;
    text-transform:capitalize;
    letter-spacing:1px;
    font-weight:500;
`

export const CommonTitleH2 = styled.span`
    margin-top:5px;
    font-size:14px;
    text-transform:uppercase;
    color: #fff;
    background:${THEME.primary_color};
    padding:2px 10px;
    font-weight:700;
    letter-spacing:1px;
`

export const ContentHolder = styled.div`
    padding:5px 10px;
    margin-bottom:10px;
`
export const CommonSubTitleMenu = styled.span`
    font-size:12px;
    text-transform:capitalize;
    padding:2px 10px;
    letter-spacing:1px;
    font-weight:600;
`

export const CommonSubTitleMenuValue = styled.div`
    font-size:12px;
    padding:2px 10px;
    letter-spacing:1px;
    font-weight:500;
    width:100%;
    border-bottom:1px solid;
`