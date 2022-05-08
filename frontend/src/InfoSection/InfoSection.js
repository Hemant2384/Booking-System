import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Button } from '../globalStyles';
import Fade from 'react-reveal/Fade';
import {
  InfoSec,
  InfoRow,
  InfoColumn,
  TextWrapper,
  TopLine,
  Heading,
  Subtitle,
  ImgWrapper,
  Img,
} from './InfoSection.elements';

function InfoSection({
  primary,
  lightBg,
  topLine,
  lightTopLine,
  lightText,
  lightTextDesc,
  headline,
  description,
  buttonLabel,
  img,
  alt,
  imgStart,
  start,
  Clickpath,
  text
}) {
  return (
    <>
      <InfoSec lightBg={lightBg}>
        <Container>
          <InfoRow imgStart={imgStart}>
            <InfoColumn>
            <Fade left>
              <TextWrapper text={text}>
                <TopLine lightTopLine={lightTopLine}>{topLine}</TopLine>
                <Heading lightText={lightText}>{headline}</Heading>
                <Subtitle lightTextDesc={lightTextDesc}>{description}</Subtitle>
                <Link to={Clickpath}>
                  <Button big fontBig primary={primary}>
                    {buttonLabel}
                  </Button>
                </Link>
              </TextWrapper>
            </Fade>
            </InfoColumn>
            <Fade right>
              <ImgWrapper start={start}>
                <Img src={img} alt={alt} />
              </ImgWrapper>
              </Fade>
          </InfoRow>
        </Container>
      </InfoSec>
    </>
  );
}

export default InfoSection;