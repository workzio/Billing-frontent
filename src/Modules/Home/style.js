import { Popover } from 'antd';
import styled from 'styled-components'
import Label from '../../Components/Form/Label';
import { THEME } from '../../theme';


// export const Box = styled.div`
//   background:${THEME.linear_gradiant2};
//   box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.25);
//   padding: 23px 9px;
//   border-radius: 10px;
//   margin-top: 2rem;
//   height: 180px;
//   & h1{
//     font-size: 17px;
//     font-weight: 500;
//     color:var(--light-color)
//   }

//   `;
//   export const Popovers = styled(Popover)`
//   .ant-popover-inner {
//       background-color:${THEME.linear_gradiant2} !important;
//   }
//   `;
//   export const Labels = styled(Label)`
//   font-size: 15px;
//   color: var(--light-color) !important;
//   `;
//   export const Card = styled.div`
//   background-color:var(--light-color);
//   padding: 20px;
//   height: 420px;
//   overflow: hidden auto;
//   margin: 10px 2px;
//   & h3{
//       color: var( --purple-secondary-color);
//       height: 20px;
//       padding: 0px 20px;
//       /* box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.25); */
  
//   }
//   & h1{
//       color:var(--dark-color);
//       padding: 10px 20px;
//       /* box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.25); */
//   }
  
//   `;
  export const Cards = styled.div`
  background-color: var(--purple); 
  box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.25);
  border-radius:5px;
  height: 150px;
  color:var(--light-color);
  padding: 30px 15px;
  cursor:pointer;
  transition: all 0.5s;
  
  & svg{
      font-size: 35px; 
  }
  & h1{
      font-size: 18px;
    padding: 0 10px;
    text-align: end;
  }
  & h2{
      font-size: 20px;
  }
  & p{
      font-size:13px;
  }
  & h4{
      font-size: 18px;
      padding:20px 0px;
  }
  &:hover {
    transform: translateY(-7px) scale(1.005) translateZ(0);
    /* box-shadow: 0 24px 36px rgba(0,0,0,0.11), */
      /* 0 24px 46px var(--box-shadow-color); */
      background-color:var(--light-color);
      & h4,h1,h2,p,svg{
          color: var(--purple);  
      }
  }
  
  &:hover .overlay {
    transform: scale(4) translateZ(0);
  }
  
  &:active {
    transform: scale(1) translateZ(0);
    box-shadow: 0 15px 24px rgba(0,0,0,0.11),
      0 15px 24px var(--box-shadow-color);
  }
  
  & h1 {
    z-index: 1;
    transition: color 0.3s ease-out;
  }
  .overlay {
    width: 118px;
    position: absolute; 
    height: 118px;
    border-radius: 50%;
    background: var(--bg-color);
    top: 70px;
    left: 50px;
    z-index: 0;
    transition: transform 4s ease-out;
  }
    
  `;
  export const Box = styled.div`
  /* background-color:var(--light-color); */
  border: solid 1.5px var(--purple);
  padding: 10px 0px;
  box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.25);
     
  
  `;
  

