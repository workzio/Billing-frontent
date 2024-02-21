import styled from "styled-components";
import { THEME } from "../../../../../theme";
import { Row } from "../../../../../Components/Row";
import Button from "../../../../../Components/Form/Button";


export const Maindesign = styled.div`
background-color: var(--light-color);
width: 100%;
margin: 0 auto !important;
padding: 0 30px;
& h4 {
    margin: 5px 0;
}
& h3 {
    margin: 5px 0;
    color: ${THEME.primary_color};
    font-size: 26px;
    font-weight: 600;
}

.page-header,
.page-header-space {
  height: 100px;
}

.page-footer-space {
  height: 50px;
}

.footer_sign{
    border:1px solid black;
    padding:2px 5px;
    height:70px;    
}



@media print {
    .page-footer {
font-family:'Times New Roman', Times, serif !important;

  position: fixed;
  bottom: 0;
  left:0;
  width: 100%;
  padding: 20px 10px;
}
}

.page-header {
  position: fixed;
  top: 0mm;
  width: 100%;
}
.page {
  page-break-after: always !important;
  height: 20vh;
  margin-top: 52%;
}

@media print {
  thead {
    display: table-header-group;
  }
  tfoot {
    display: table-footer-group;
  }
}
`;


export const Box = styled.div`
background-color: ${THEME.secondary_color};
margin: 5px 0;
padding: 20px 10px;
`;
export const Reverse = styled(Row)`
  @media (maxWidth: '500px') {
    display: flex;
     flex-direction: column-reverse;
   }
`;


export const Buttondesn = styled(Button)`
border: 1px solid #8056F7;
padding: 10px 10px;
line-height: 5px;
&:hover{
  background-color: var(--light-color);
  color: #8056F7;
}
`;

export const Cardsin = styled.div`
width: 100%;
/* padding: 10px; */
`;


export const BillTable = styled.div`
& table thead tr th{
    font-size:14px !important;
}

& table tbody tr td{
    font-size:14px !important;
}

@media print {
    width:96%;
    margin:auto;
}
table {
  width: 100%;
  height: 200px;
  border-collapse: collapse;
  padding: 2px;
  margin-bottom:20px !important;
  border:1px solid black;

}

th {
  border-bottom: 1px solid black;
  border: 1px solid black;
}

td {
  text-align: center;
  border-right:1px solid;
}
`;

export const PrintTitle = styled.h5`
font-size:${props=> props.Size || '12px'};
text-transform:${props=>props.UPPER ? 'uppercase' :'none'};
font-weight:${props=>props.Weight || '500' };
text-align:${props=>props.TextAlign};
`;

export const PrintSubTitle = styled.span`
font-size:${props=> props.Size || '12px'};
text-transform:${props=>props.UPPER ? 'uppercase' :'none'};
font-weight:${props=>props.Weight || '500' };
text-align:${props=>props.TextAlign};
letter-spacing:.5px;
`;