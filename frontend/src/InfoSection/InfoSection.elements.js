import styled from 'styled-components';
// import styled from 'styled-components';

export const InfoSec = styled.div`
  color: #fff;
  padding: 160px 0;
  background: ${({ lightBg }) => (lightBg ? '#fff' : '#101522')};
`;

export const InfoRow = styled.div`
  display: flex;
  margin: 0 -15px -15px -15px;
  flex-wrap: wrap;
  align-items: center;
  flex-direction: ${({ imgStart }) => (imgStart ? 'row-reverse' : 'row')};
`;

export const InfoColumn = styled.div`
  margin-bottom: 15px;
  padding-right: 15px;
  padding-left: 15px;
  flex: 1;
  max-width: 50%;
  flex-basis: 50%;
  @media screen and (max-width: 768px) {
    max-width: 100%;
    flex-basis: 100%;
    display: flex;
    justify-content: center;
  }
  animation : fadein 1s;
  @keyframes fadein {
    from{
      padding-right: 50px;
      padding-left: 50px;
    }
    to{
      padding-right: 15px;
      padding-left: 15px;
    }
  }
`;

export const TextWrapper = styled.div`
  max-width: 540px;
  padding-top: 0;
  padding-bottom: 60px;
  text-align : ${({ text }) => (text ? '-webkit-right' : 'left')};
  @media screen and (max-width : 989px) {
    padding-bottom : 0px;
  }
  @media screen and ((min-width : 990px) and (max-width : 1056px)) {
    max-width : 449px;
  }
  @media screen and (max-width: 768px) {
    padding-bottom: 65px;
  }
`;

export const ImgWrapper = styled.div`
  max-width: 530px;
  display: flex;
  justify-content: ${({ start }) => (start ? 'flex-start' : 'flex-end')};
  padding-right:70px;
  @media screen and (max-width : 869px) {
    max-width : 300px;
  }
  @media screen and ((min-width : 870px) and (max-width : 989px)) {
    max-width : 350px;
  }
  @media screen and ((min-width : 990px) and (max-width : 1056px)) {
    max-width : 400px;
  }
  @media screen and ((min-width: 1057px) and (max-width : 1224px)) {
    max-width : 420px;
  }
`;

export const TopLine = styled.div`
  color: ${({ lightTopLine }) => (lightTopLine ? '#a9b3c1' : '#4B59F7')};
  font-size: 18px;
  line-height: 16px;
  font-weight: 700;
  letter-spacing: 1.4px;
  margin-bottom: 16px;
`;

export const Img = styled.img`
  padding-right: 0;
  border: 0;
  max-width: 100%;
  vertical-align: middle;
  display: inline-block;
  max-height: 500px;
`;

export const Heading = styled.h1`
  margin-bottom: 24px;
  font-size: 48px;
  line-height: 1.1;
  font-weight: 600;
  color: ${({ lightText }) => (lightText ? '#f7f8fa' : '#1c2237')};
  @media screen and (max-width : 869px) {
    font-size: 15px;
  }
  @media screen and ((max-width : 989px) and (min-width : 870px)) {
    font-size: 24px;
  }
  @media screen and ((min-width : 990px) and (max-width : 1056px)) {
    font-size: 35px;
  }
`;

export const Subtitle = styled.p`
  max-width: 440px;
  margin-bottom: 35px;
  font-size: 18px;
  line-height: 24px;
  color: ${({ lightTextDesc }) => (lightTextDesc ? '#a9b3c1' : '#1c2237')};
  @media screen and (max-width : 869px) {
    font-size: 12px;
  }
`;