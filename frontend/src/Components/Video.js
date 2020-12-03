import React from 'react';
import { Carousel } from 'react-bootstrap';
import crousel1 from '../Assets/carousel-1.png';
import crousel2 from '../Assets/carousel-2.png';
import crousel3 from '../Assets/carousel-3.jpg';
const Video = () => {
  return (
    <React.Fragment>
      <Carousel interval={2500} indicators={false}>
        <Carousel.Item>
          <img className=" w-100" src={crousel1} alt="First slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img className=" w-100" src={crousel3} alt="Third slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img className=" w-100" src={crousel2} alt="Third slide" />
        </Carousel.Item>
      </Carousel>
    </React.Fragment>
  );
};

export default Video;
