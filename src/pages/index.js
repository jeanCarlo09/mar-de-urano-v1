import React, { useState, useEffect, useMemo, useRef } from 'react';
import { graphql, Link } from 'gatsby';
import get from "lodash/get";

import Diamond from '../components/landing/Diamond';
import ModalDiamond from '../components/landing/ModalDiamond';
import Splash from '../components/landing/Splash';

import "../assets/scss/mardeurano.scss";

export default function Index({ data }) {

  const imagesDiamonds = useMemo(() => get(data, 'allContentfulImagesLanding.nodes')[0].images);

  const countImages = useRef(0);


  const [show, setShow] = useState(false); //hook state to show modal with images art
  const [loading, setLoading] = useState(false); //state while image is charging in modal
  const [loadingImages, setloadingImages] = useState(true); //state while images in landing is charging
  const [promotion, setPromotion] = useState(true); // state for instructions click on diamonds and shop
  const handleClose = () => setShow(false); // set sate to close modal
  const [currentImage, setCurrentImage] = useState("");

  const handleOnClick = () => {  // set sate to open modal and load image to show in modal
    // const randomNumber = Math.ceil(1 + Math.random() * (63 - 1));
    // const image = require(`../assets/images/landingimages/image-${randomNumber}.png`);

    setCurrentImage(imagesDiamonds[countImages.current].image.fixed.src);
    setLoading(true);
    setShow(true);

    (countImages.current + 1 === imagesDiamonds.length) ? countImages.current = 0 : countImages.current++;
  };

  const loadingImg = () => { // set te state to landing when image in modal is charge
    setLoading(false);
  }

  const images = {
    cristaleslluvia01: require('../assets/images/cristaleslluvia01.png'),
    cristaleslluvia02: require('../assets/images/cristaleslluvia02.png'),
    cristaleslluvia03: require('../assets/images/cristaleslluvia03.png'),
    cristaleslluvia04: require('../assets/images/cristaleslluvia04.png'),
    cristaleslluvia05: require('../assets/images/cristaleslluvia05.png'),
    landingLogo: require('../assets/images/Urano600.png'),
    shopImg: require('../assets/images/Shop.png'),
    olasImg: require('../assets/images/olas.gif'),
    splash: require('../assets/images/Splash_GIFF.gif'),
    forest: require('../assets/images/bosque.png'),
    macaw: require('../assets/images/Guacamaya.gif'),
    shark: require('../assets/images/tiburcio.png'),
    promotion: require('../assets/images/Instrucciones.png')
  }

  const imagesLength = useRef(0); // count of images in landing (+1 is because splash is two)

  const onLoadImgages = () => { // when images in landing is charged, set state to stop charging in landing
    console.log(imagesLength.current);
    (imagesLength.current + 1 >= (Object.keys(images).length + 1)) ? setTimeout(() => { setloadingImages(false); }, 2000) : imagesLength.current++;
  }

  const changeStatePromotion = () => { // set the state to hide the instructions of diamonds and bottom shop
    setPromotion(true);
  }

  useEffect(() => { // hook to show the instructions of diamonds and bottom shop
    (promotion) && setTimeout(() => { setPromotion(false) }, 45000);

  }, [promotion]);

  return (
    <div className="index">
      <Diamond img={images.cristaleslluvia01} selectDiamond={handleOnClick} onLoadImgages={onLoadImgages} />
      <Diamond img={images.cristaleslluvia01} selectDiamond={handleOnClick} onLoadImgages={onLoadImgages} />
      <Diamond img={images.cristaleslluvia02} selectDiamond={handleOnClick} onLoadImgages={onLoadImgages} />
      <Diamond img={images.cristaleslluvia03} selectDiamond={handleOnClick} onLoadImgages={onLoadImgages} />
      <Diamond img={images.cristaleslluvia04} selectDiamond={handleOnClick} onLoadImgages={onLoadImgages} />
      <Diamond img={images.cristaleslluvia05} selectDiamond={handleOnClick} onLoadImgages={onLoadImgages} />


      <Splash img={images.splash} onLoadImgages={onLoadImgages} />
      <Splash img={images.splash} onLoadImgages={onLoadImgages} />

      <div className="landing-logo">
        <img src={images.landingLogo} alt="logo mar de urano" className="landing-logo-img" onLoad={onLoadImgages}></img>
      </div>


      <div className="link">
        {(promotion) &&
          <div className="promotion">
            <img src={images.promotion} alt="instructions" className="promotion-img" onLoad={onLoadImgages} />
            <div className="arrow bounce">
              <i className="fa fa-arrow-down fa-2x"></i>
            </div>
          </div>
        }

        <Link to="/home">
          <img src={images.shopImg} alt="img" className="link-img" onLoad={onLoadImgages} />
        </Link>
      </div>

      <div className="contentOlas">
        <img
          className="olas"
          src={images.olasImg}
          alt="waves"
          onLoad={onLoadImgages}
        />
      </div>


      <div className="contentBosque">
        <img
          className="bosque"
          src={images.forest}
          alt="bosque"
          onLoad={onLoadImgages}
        />
      </div>

      <div className="DIVGuacamaya">
        <img
          className="Guacamaya"
          src={images.macaw}
          alt="Guacamaya"
          onLoad={onLoadImgages}
        />
      </div>

      <div className="contentTiburcio">
        <img
          className="tiburcio"
          src={images.shark}
          alt="shark"
          onLoad={onLoadImgages}
        />
      </div>


      {(!promotion) && <button className="helper-landing" onClick={changeStatePromotion}><i className="fa fa-question"></i></button>}
      {(loading) &&
        <div className={`loader ${loadingImages ? 'loader-content-images' : 'loader-content-diamonds'}`}>
          <div className="loader-box"></div>
          <div className="loader-shadow"></div>
          {(loadingImages) ? <img className="loader-logo" src={require('../assets/images/Urano600.png')} alt='MarDeUrano' /> : <div className="loader-text"></div>}
        </div>
      }

      <ModalDiamond handleClose={handleClose} show={show} loadingImg={loadingImg} loading={loading} currentImage={currentImage} />
    </div >

  )
}

export const query = graphql`
query ImagesLanding {
  allContentfulImagesLanding {
    nodes {
      id
      images {
        image {
          fixed(width: 700, height: 700) {
           src
          }
        }
      }
    }
  }
}
`;