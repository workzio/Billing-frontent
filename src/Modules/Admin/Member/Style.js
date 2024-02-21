import styled from "styled-components";

export const Mainsection = styled.div`
  width: 100%;
  display: flex;
  /* align-items: center; */
  justify-content: center;
  border-top-right-radius: 100px;
    border-bottom-left-radius: 100px;
  & h2{
    color: #fff;
    padding-left: 4px;
    display: flex;
    justify-content: center;
  }
`;
export const Bgcard = styled.div`
background-color: var(--light-color);
padding: 20px 10px;
box-shadow: 0px 5px 5px 1px rgba(0, 0, 0, 0.25);
border-radius: 20px;
`;