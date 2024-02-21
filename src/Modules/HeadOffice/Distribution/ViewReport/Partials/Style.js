import { Card } from "antd";
import styled from "styled-components";
import { THEME } from "../../../../../theme";

export const Pgragp = styled.div`
& p {
  font-size: 12px;
}
`;
export const Topdesgn = styled.div`
text-align: center;
justify-content: center;
padding: 10px 0;
margin-bottom: 12px;
& svg {
    font-size: 60px;
}
& p {
    font-weight: 600;
    color: #000;
    font-size: 20px;
}
`;
export const Cards = styled(Card)`
cursor: pointer;
margin: 15px 5px;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
border-radius: 15px;

&:nth-child(even){
    background-color: ${THEME.primary_color};
}
&:nth-child(odd){
    background-color: ${THEME.red_secondary};
}
.ant-image {
    margin-top: -13px;
    position: absolute;
    width: 25px;
}
& p {
    font-weight:500;
    font-size: 20px;
    width: 180px; 
    overflow: hidden;
    text-overflow: ellipsis; 
    line-height: 30px;
    /* display: flex; */
    white-space: nowrap; 
    margin: 0 auto;
    color: var(--light-color);
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
& svg {
    background: white;
    border-radius: 20px;
    padding: 3px;
    font-size: 33px;
}
.ant-card-body {
    padding: 12px !important;   
}
`;

export const OverScroller = styled.div`
height: 280px;
overflow: hidden auto;
margin: 10px 2px;
`;