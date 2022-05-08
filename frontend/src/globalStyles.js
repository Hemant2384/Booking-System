import styled,{createGlobalStyle} from 'styled-components'

const GlobalStyle = createGlobalStyle`
*{
    box-sizing:borde-box;
    margin:0;
    padding:0;
}
`
export const Container = styled.div`
z-index:1;
width:100%;
max-width:1300px;
margin-left:auto;
margin-right:auto;
padding-right:50px;
padding-left:50px;

@media  screen and (max_width:991px){
    padding-right:30px;
padding-left:30px;
}
`
export const Button = styled.button`
  border-radius: 4px;
  background: ${({ primary }) => (primary ? '#9F9FED' : '#9F9FED')};
  white-space: nowrap;
  padding: ${({ big }) => (big ? '12px 64px' : '10px 20px')};
  color: #fff;
  font-size: ${({ fontBig }) => (fontBig ? '20px' : '16px')};
  outline: none;
  border: none;
  cursor: pointer;
  &:hover {
    transition: all 0.3s ease-out;
    background: #fff;
    background-color: ${({ primary }) => (primary ? '#0467FB' : '#4B59F7')};
  }
  @media screen and (max-width: 960px) {
    width: 43%;
  }
`;


export default GlobalStyle;
